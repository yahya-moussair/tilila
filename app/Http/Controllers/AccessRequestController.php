<?php

namespace App\Http\Controllers;

use App\Enums\AccessRequestStatus;
use App\Mail\NewAccessRequestSubmitted;
use App\Models\AccessRequest;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class AccessRequestController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        $accessRequest = $request->user()->accessRequest;

        if ($accessRequest?->isRejected()) {
            return Inertia::render('access-request/create', [
                'prefill' => [
                    'reason' => $accessRequest->reason,
                    'organization' => $accessRequest->organization ?? '',
                    'profession' => $accessRequest->profession,
                ],
                'isReapplication' => true,
            ]);
        }

        if ($accessRequest) {
            return $this->redirectForExistingRequest($accessRequest);
        }

        return Inertia::render('access-request/create', [
            'prefill' => null,
            'isReapplication' => false,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:5000'],
            'organization' => ['nullable', 'string', 'max:255'],
            'profession' => ['required', 'string', 'max:255'],
        ]);

        $userId = (int) $request->user()->id;

        try {
            $result = DB::transaction(function () use ($userId, $validated) {
                $existing = AccessRequest::query()
                    ->where('user_id', $userId)
                    ->lockForUpdate()
                    ->first();

                if ($existing) {
                    if ($existing->isRejected()) {
                        $existing->update([
                            'status' => AccessRequestStatus::Pending,
                            'reason' => $validated['reason'],
                            'organization' => $validated['organization'],
                            'profession' => $validated['profession'],
                            'reviewed_at' => null,
                            'reviewed_by' => null,
                            'resubmitted_at' => now(),
                        ]);

                        return [
                            'action' => 'resubmitted',
                            'record' => $existing->fresh(),
                        ];
                    }

                    return [
                        'action' => 'blocked',
                        'record' => $existing,
                    ];
                }

                $record = AccessRequest::query()->create([
                    'user_id' => $userId,
                    'status' => AccessRequestStatus::Pending,
                    ...$validated,
                ]);

                return [
                    'action' => 'created',
                    'record' => $record,
                ];
            });
        } catch (QueryException $e) {
            if ($this->isUniqueConstraintViolation($e)) {
                $existing = AccessRequest::query()->where('user_id', $userId)->first();

                if ($existing) {
                    return $this->redirectForBlockedStore($existing);
                }

                return redirect()
                    ->route('access-request.create')
                    ->with('warning', 'You have already submitted an access request.');
            }

            throw $e;
        }

        if ($result['action'] === 'blocked') {
            return $this->redirectForBlockedStore($result['record']);
        }

        return $this->redirectAfterSuccessfulStore($result['record']);
    }

    public function pending(Request $request): Response|RedirectResponse
    {
        $accessRequest = $request->user()->accessRequest;

        if (! $accessRequest) {
            return redirect()->route('access-request.create');
        }

        if (! $accessRequest->isPending()) {
            return $this->redirectForExistingRequest($accessRequest);
        }

        return Inertia::render('access-request/pending');
    }

    public function rejected(Request $request): Response|RedirectResponse
    {
        $accessRequest = $request->user()->accessRequest;

        if (! $accessRequest) {
            return redirect()->route('access-request.create');
        }

        if (! $accessRequest->isRejected()) {
            return $this->redirectForExistingRequest($accessRequest);
        }

        return Inertia::render('access-request/rejected');
    }

    private function redirectAfterSuccessfulStore(AccessRequest $accessRequest): RedirectResponse
    {
        $accessRequest->load('user');

        User::query()
            ->where('role', 'admin')
            ->pluck('email')
            ->each(fn (string $email) => Mail::to($email)->send(new NewAccessRequestSubmitted($accessRequest)));

        return redirect()
            ->route('access-request.pending')
            ->with('success', 'Your access request has been submitted.');
    }

    private function redirectForBlockedStore(AccessRequest $accessRequest): RedirectResponse
    {
        if ($accessRequest->isPending()) {
            return redirect()
                ->route('access-request.pending')
                ->with('warning', 'Your access request is already under review.');
        }

        if ($accessRequest->isApproved()) {
            return redirect()
                ->route('experts.index')
                ->with('warning', 'You already have access to expert profiles.');
        }

        if ($accessRequest->isRejected()) {
            return redirect()
                ->route('access-request.rejected')
                ->with('warning', 'Please use the re-apply form to submit a new request.');
        }

        return redirect()
            ->route('access-request.create')
            ->with('warning', 'You have already submitted an access request.');
    }

    private function redirectForExistingRequest(AccessRequest $accessRequest): RedirectResponse
    {
        if ($accessRequest->isApproved()) {
            return redirect()->route('experts.index');
        }

        if ($accessRequest->isPending()) {
            return redirect()->route('access-request.pending');
        }

        if ($accessRequest->isRejected()) {
            return redirect()->route('access-request.rejected');
        }

        return redirect()->route('access-request.create');
    }

    private function isUniqueConstraintViolation(QueryException $e): bool
    {
        $code = (string) $e->getCode();

        if (in_array($code, ['23000', '23505'], true)) {
            return true;
        }

        $sqlState = (string) ($e->errorInfo[0] ?? '');

        if (in_array($sqlState, ['23000', '23505'], true)) {
            return true;
        }

        return str_contains(strtolower($e->getMessage()), 'unique');
    }
}

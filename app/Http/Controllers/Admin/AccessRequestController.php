<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AccessRequestStatus;
use App\Http\Controllers\Controller;
use App\Mail\AccessRequestApproved;
use App\Mail\AccessRequestRejected;
use App\Models\AccessRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AccessRequestController extends Controller
{
    public function index(Request $request): Response
    {
        $statusParam = $request->query('status');
        $statusFilter = is_string($statusParam) && $statusParam !== ''
            ? AccessRequestStatus::tryFrom($statusParam)
            : null;

        $query = AccessRequest::query()
            ->with(['user:id,name,email', 'reviewer:id,name'])
            ->when(
                $statusFilter !== null,
                fn ($q) => $q->where('status', $statusFilter),
            )
            ->orderByRaw("CASE WHEN status = 'pending' THEN 0 ELSE 1 END")
            ->orderByDesc('created_at');

        return Inertia::render('admin/access-requests/index', [
            'requests' => $query->paginate(15)->withQueryString(),
            'filters' => [
                'status' => $statusFilter?->value ?? '',
            ],
            'pendingCount' => AccessRequest::query()
                ->where('status', AccessRequestStatus::Pending)
                ->count(),
        ]);
    }

    public function approve(Request $request, AccessRequest $accessRequest): RedirectResponse
    {
        if (! $accessRequest->isPending()) {
            return back()->with('warning', 'This request has already been reviewed.');
        }

        $this->grantApproval($request, $accessRequest);

        return back()->with('success', 'Access request approved.');
    }

    public function reject(Request $request, AccessRequest $accessRequest): RedirectResponse
    {
        if (! $accessRequest->isPending()) {
            return back()->with('warning', 'This request has already been reviewed.');
        }

        $accessRequest->update([
            'status' => AccessRequestStatus::Rejected,
            'reviewed_at' => now(),
            'reviewed_by' => $request->user()->id,
        ]);

        $accessRequest->load('user');

        Mail::to($accessRequest->user->email)->send(new AccessRequestRejected($accessRequest));

        return back()->with('success', 'Access request rejected.');
    }

    public function reaccept(Request $request, AccessRequest $accessRequest): RedirectResponse
    {
        if (! $accessRequest->isRejected()) {
            abort(403);
        }

        $this->grantApproval($request, $accessRequest);

        return back()->with('success', 'Request re-accepted — activation link sent to applicant');
    }

    private function grantApproval(Request $request, AccessRequest $accessRequest): void
    {
        $accessRequest->update([
            'status' => AccessRequestStatus::Approved,
            'reviewed_at' => now(),
            'reviewed_by' => $request->user()->id,
            'token' => Str::random(64),
            'expires_at' => now()->addDays(AccessRequest::ACTIVATION_EXPIRY_DAYS),
        ]);

        $accessRequest->load('user');

        Mail::to($accessRequest->user->email)->queue(new AccessRequestApproved($accessRequest));
    }
}

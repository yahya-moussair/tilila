<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TililaContestParticipant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TililaContestParticipantController extends Controller
{
    public function index(Request $request): Response
    {
        $query = TililaContestParticipant::query()->orderByDesc('created_at');

        if ($search = trim((string) $request->query('search', ''))) {
            $like = '%'.$search.'%';
            $query->where(function ($q) use ($like) {
                $q->where('first_name', 'like', $like)
                    ->orWhere('last_name', 'like', $like)
                    ->orWhere('email', 'like', $like)
                    ->orWhere('submission_title', 'like', $like)
                    ->orWhere('country', 'like', $like)
                    ->orWhere('city', 'like', $like);
            });
        }

        $total = TililaContestParticipant::query()->count();
        $last7Days = TililaContestParticipant::query()
            ->where('created_at', '>=', now()->subDays(7))
            ->count();

        return Inertia::render('admin/tilila/participants/index', [
            'participants' => $query->paginate(15)->withQueryString(),
            'kpis' => [
                'total' => $total,
                'last7Days' => $last7Days,
            ],
            'filters' => [
                'search' => $request->query('search', ''),
            ],
        ]);
    }

    public function show(TililaContestParticipant $participant): Response
    {
        return Inertia::render('admin/tilila/participants/show', [
            'participant' => $participant,
        ]);
    }

    public function destroy(TililaContestParticipant $participant): RedirectResponse
    {
        $participant->delete();

        return redirect()->route('admin.tilila.participants.index')
            ->with('success', 'Submission deleted.');
    }

    public function exportCsv(Request $request): StreamedResponse
    {
        $query = TililaContestParticipant::query()->orderByDesc('created_at');

        if ($search = trim((string) $request->query('search', ''))) {
            $like = '%'.$search.'%';
            $query->where(function ($q) use ($like) {
                $q->where('first_name', 'like', $like)
                    ->orWhere('last_name', 'like', $like)
                    ->orWhere('email', 'like', $like)
                    ->orWhere('submission_title', 'like', $like)
                    ->orWhere('country', 'like', $like)
                    ->orWhere('city', 'like', $like);
            });
        }

        $filename = 'tilila-submissions-'.now()->format('Ymd-His').'.csv';

        return response()->streamDownload(function () use ($query): void {
            $out = fopen('php://output', 'w');
            if ($out === false) {
                return;
            }

            fwrite($out, "\xEF\xBB\xBF");
            $delimiter = ';';

            fputcsv($out, [
                'id',
                'first_name',
                'last_name',
                'email',
                'phone',
                'city',
                'country',
                'submission_title',
                'submission_link',
                'submission_video_url',
                'accepted_rules',
                'created_at',
            ], $delimiter);

            $query->chunkById(200, function ($rows) use ($out, $delimiter): void {
                foreach ($rows as $p) {
                    /** @var TililaContestParticipant $p */
                    fputcsv($out, [
                        $p->id,
                        (string) ($p->first_name ?? ''),
                        (string) ($p->last_name ?? ''),
                        (string) ($p->email ?? ''),
                        (string) ($p->phone ?? ''),
                        (string) ($p->city ?? ''),
                        (string) ($p->country ?? ''),
                        (string) ($p->submission_title ?? ''),
                        (string) ($p->submission_link ?? ''),
                        (string) ($p->submission_video_url ?? ''),
                        $p->accepted_rules ? 'yes' : 'no',
                        optional($p->created_at)->toIso8601String(),
                    ], $delimiter);
                }
            });

            fclose($out);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }
}


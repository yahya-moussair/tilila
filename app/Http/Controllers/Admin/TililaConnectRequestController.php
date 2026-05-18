<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TililaConnectRequest;
use Inertia\Inertia;
use Inertia\Response;

class TililaConnectRequestController extends Controller
{
    public function index(): Response
    {
        $rows = TililaConnectRequest::query()
            ->orderByDesc('created_at')
            ->limit(500)
            ->get()
            ->map(fn (TililaConnectRequest $r) => [
                'id' => $r->id,
                'request_type' => $r->request_type,
                'full_name' => $r->full_name,
                'email' => $r->email,
                'phone' => $r->phone,
                'organization' => $r->organization,
                'message' => $r->message,
                'locale' => $r->locale,
                'created_at' => $r->created_at?->toIso8601String(),
            ]);

        return Inertia::render('admin/tilila-connect-requests/index', [
            'requests' => $rows,
        ]);
    }
}

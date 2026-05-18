<?php

namespace App\Http\Controllers;

use App\Models\TililaConnectRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TililaConnectController extends Controller
{
    /**
     * @return list<string>
     */
    public static function requestTypes(): array
    {
        return ['interview', 'speaker_panel', 'network'];
    }

    public function create(): Response
    {
        return Inertia::render('experts/connect', [
            'requestTypes' => self::requestTypes(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'request_type' => ['required', Rule::in(self::requestTypes())],
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:64',
            'organization' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
            'locale' => 'nullable|string|max:8',
        ]);

        TililaConnectRequest::query()->create([
            ...$data,
            'ip' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 1000),
        ]);

        return back()->with('success', 'Your request was submitted.');
    }
}

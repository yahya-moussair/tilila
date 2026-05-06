<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscription;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class NewsletterSubscriptionController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'email' => 'required|email|max:255',
            'locale' => 'nullable|string|max:8',
        ]);

        NewsletterSubscription::query()->updateOrCreate(
            ['email' => strtolower(trim($data['email']))],
            [
                'locale' => $data['locale'] ?? null,
                'subscribed_at' => now(),
            ]
        );

        return back()->with('success', 'Thank you — you are subscribed.');
    }
}

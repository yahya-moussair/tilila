<?php

namespace App\Http\Controllers;

use App\Models\Expert;
use Inertia\Inertia;
use Inertia\Response;

class ExpertController extends Controller
{
    public function index(): Response
    {
        $experts = Expert::query()
            ->where('status', 'published')
            ->orderBy('id')
            ->get()
            ->map(fn (Expert $e) => $e->toDirectoryArray());

        return Inertia::render('experts/index', [
            'experts' => $experts,
        ]);
    }

    public function show(Expert $expert): Response
    {
        abort_unless($expert->isPublished(), 404);

        $defaults = $this->emptyDetails();
        $incoming = is_array($expert->details) ? $expert->details : [];
        $details = array_merge($defaults, $incoming);
        if (is_array($incoming['quote'] ?? null)) {
            $details['quote'] = array_merge($defaults['quote'], $incoming['quote']);
        }
        if (is_array($incoming['socials'] ?? null)) {
            $details['socials'] = array_merge($defaults['socials'], $incoming['socials']);
        }
        if (
            (! is_array($details['city_i18n'] ?? null) || ($details['city_i18n']['en'] ?? '') === '')
            && is_array($expert->city_i18n)
        ) {
            $details['city_i18n'] = [
                'en' => trim((string) ($expert->city_i18n['en'] ?? $expert->location)),
                'fr' => trim((string) ($expert->city_i18n['fr'] ?? $expert->city_i18n['en'] ?? $expert->location)),
                'ar' => trim((string) ($expert->city_i18n['ar'] ?? $expert->city_i18n['en'] ?? $expert->location)),
            ];
        }

        return Inertia::render('experts/[id]', [
            'id' => $expert->id,
            'expert' => $expert->toDirectoryArray(),
            'details' => $details,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function emptyDetails(): array
    {
        return [
            'headlineTags' => [],
            'bio' => [],
            'quote' => ['en' => '', 'fr' => '', 'ar' => ''],
            'socials' => [
                'linkedin' => '',
                'twitter' => '',
                'instagram' => '',
            ],
            'city_i18n' => ['en' => '', 'fr' => '', 'ar' => ''],
            'expertise' => [],
            'journey' => [],
            'appearances' => [],
            'articles' => [],
        ];
    }
}

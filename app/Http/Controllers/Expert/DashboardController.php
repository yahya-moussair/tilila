<?php

namespace App\Http\Controllers\Expert;

use App\Http\Controllers\Controller;
use App\Models\Expert;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('expert/dashboard', [
            'expert' => $this->resolveExpert($request),
        ]);
    }

    public function network(Request $request): Response
    {
        $currentExpert = Expert::query()->where('user_id', $request->user()->id)->firstOrFail();

        $experts = Expert::query()
            ->where('status', 'published')
            ->orderBy('id')
            ->get()
            ->map(fn (Expert $expert) => $expert->toDirectoryArray())
            ->values();

        return Inertia::render('expert/network', [
            'expert' => $this->resolveExpert($request),
            'currentExpertId' => $currentExpert->id,
            'experts' => $experts,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function resolveExpert(Request $request): array
    {
        $expert = Expert::query()->where('user_id', $request->user()->id)->firstOrFail();
        $socials = is_array($expert->socials) ? $expert->socials : [];

        return [
            'id' => $expert->id,
            'name' => $expert->name,
            'title' => $expert->title,
            'bio_i18n' => $expert->bio_i18n,
            'expertise' => $expert->expertise ?? [],
            'email' => $expert->email,
            'phone' => $expert->phone,
            'status' => $expert->status,
            'country' => $expert->country,
            'region_scope' => $expert->region_scope,
            'city_i18n' => $expert->city_i18n,
            'languages' => $expert->languages ?? [],
            'socials' => $socials,
            'image_url' => $expert->image_url,
            'public_profile_url' => $expert->isPublished()
                ? route('experts.show', $expert)
                : null,
            'profile_completion' => $this->profileCompletionPercent($expert),
            'updated_at' => optional($expert->updated_at)?->toISOString(),
            'last_activity_at' => optional($expert->last_activity_at)?->toISOString(),
        ];
    }

    private function profileCompletionPercent(Expert $expert): int
    {
        $name = is_array($expert->name) ? $expert->name : [];
        $title = is_array($expert->title) ? $expert->title : [];
        $bio = is_array($expert->bio_i18n) ? $expert->bio_i18n : [];
        $city = is_array($expert->city_i18n) ? $expert->city_i18n : [];
        $expertise = is_array($expert->expertise) ? $expert->expertise : [];
        $languages = is_array($expert->languages) ? $expert->languages : [];
        $socials = is_array($expert->socials) ? $expert->socials : [];

        $hasText = static function (array $tri): bool {
            foreach (['en', 'fr', 'ar'] as $lang) {
                if (trim((string) ($tri[$lang] ?? '')) !== '') {
                    return true;
                }
            }

            return false;
        };

        $hasSocial = false;
        foreach (['linkedin', 'twitter', 'instagram', 'portfolio'] as $key) {
            if (trim((string) ($socials[$key] ?? '')) !== '') {
                $hasSocial = true;
                break;
            }
        }

        $checks = [
            $hasText($name),
            $hasText($title),
            $hasText($bio),
            $expertise !== [],
            is_string($expert->image) && trim($expert->image) !== '',
            trim((string) ($expert->email ?? '')) !== '',
            trim((string) ($expert->country ?? '')) !== '',
            $hasText($city),
            $languages !== [],
            $hasSocial,
        ];

        $filled = count(array_filter($checks));

        return (int) round(($filled / count($checks)) * 100);
    }
}

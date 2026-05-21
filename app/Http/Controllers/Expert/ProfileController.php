<?php

namespace App\Http\Controllers\Expert;

use App\Http\Controllers\Controller;
use App\Models\Expert;
use App\Support\ExpertDomains;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $expert = $this->resolveExpert($request);

        return Inertia::render('expert/profile-edit', [
            'expert' => $this->expertToForm($expert),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $expert = $this->resolveExpert($request);
        $data = $this->validated($request);
        $cvPath = $expert->cv_path;

        if ($request->hasFile('cv')) {
            $existingCvPath = trim((string) ($cvPath ?? ''));
            if ($existingCvPath !== '') {
                Storage::disk('public')->delete($existingCvPath);
            }
            $cvPath = $this->storeCvFromUpload($request->file('cv'));
        }

        if ($request->hasFile('profile_image')) {
            if ($expert->image) {
                Storage::disk('public')->delete($expert->image);
            }
            $data['image'] = $this->storeProfileImageFromUpload(
                $request->file('profile_image'),
            );
        }
        unset($data['profile_image']);

        $expert->update([
            ...$data,
            'cv_path' => $cvPath,
            'last_activity_at' => now(),
        ]);

        return back()->with('success', 'Your expert profile has been updated.');
    }

    private function resolveExpert(Request $request): Expert
    {
        return Expert::query()->where('user_id', $request->user()->id)->firstOrFail();
    }

    /**
     * @return array<string, mixed>
     */
    private function expertToForm(Expert $expert): array
    {
        $socials = is_array($expert->socials) ? $expert->socials : [];

        return [
            'id' => $expert->id,
            'name' => $this->triLangValue($expert->name),
            'title' => $this->triLangValue($expert->title),
            'expertise_domains' => $this->expertiseDomainsToForm($expert->expertise),
            'bio' => $this->triLangValue($expert->bio_i18n),
            'country' => (string) ($expert->country ?? ''),
            'city' => $this->resolveCityForForm($expert),
            'languages' => $expert->languages ?? [],
            'email' => (string) ($expert->email ?? ''),
            'phone' => trim((string) ($expert->phone ?? '')),
            'linkedin_url' => trim((string) ($socials['linkedin'] ?? '')),
            'twitter_url' => trim((string) ($socials['twitter'] ?? '')),
            'instagram_url' => trim((string) ($socials['instagram'] ?? '')),
            'portfolio_url' => trim((string) ($socials['portfolio'] ?? '')),
            'image_url' => $expert->image_url,
            'cv_url' => $this->cvUrl($expert->cv_path),
        ];
    }

    /**
     * @return array<string, string>
     */
    private function triLangValue(mixed $value): array
    {
        if (is_array($value)) {
            $en = trim((string) ($value['en'] ?? ''));
            $fr = trim((string) ($value['fr'] ?? ''));
            $ar = trim((string) ($value['ar'] ?? ''));

            if ($fr === '' && $en !== '') {
                $fr = $en;
            }
            if ($en === '') {
                $en = $fr;
            }
            if ($ar === '') {
                $ar = $fr;
            }

            return ['en' => $en, 'fr' => $fr, 'ar' => $ar];
        }

        $text = trim((string) ($value ?? ''));

        return ['en' => $text, 'fr' => $text, 'ar' => $text];
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'name' => ['required', 'array'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'name.fr' => ['required', 'string', 'max:255'],
            'name.ar' => ['nullable', 'string', 'max:255'],
            'title' => ['required', 'array'],
            'title.en' => ['nullable', 'string', 'max:500'],
            'title.fr' => ['required', 'string', 'max:500'],
            'title.ar' => ['nullable', 'string', 'max:500'],
            'expertise_domains' => ['required', 'array', 'min:1', 'max:6'],
            'expertise_domains.*.en' => ['required', 'string', 'max:255'],
            'expertise_domains.*.fr' => ['required', 'string', 'max:255'],
            'expertise_domains.*.ar' => ['required', 'string', 'max:255'],
            'bio' => ['required', 'array'],
            'bio.en' => ['nullable', 'string', 'max:5000'],
            'bio.fr' => ['required', 'string', 'max:5000'],
            'bio.ar' => ['nullable', 'string', 'max:5000'],
            'country' => ['nullable', 'string', 'max:120'],
            'city' => ['nullable', 'array'],
            'city.en' => ['nullable', 'string', 'max:120'],
            'city.fr' => ['required', 'string', 'max:120'],
            'city.ar' => ['nullable', 'string', 'max:120'],
            'languages' => ['nullable', 'array'],
            'languages.*' => ['string', 'max:16'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:64'],
            'linkedin_url' => ['nullable', 'url', 'max:2048'],
            'twitter_url' => ['nullable', 'url', 'max:2048'],
            'instagram_url' => ['nullable', 'url', 'max:2048'],
            'portfolio_url' => ['nullable', 'url', 'max:2048'],
            'profile_image' => ['nullable', 'file', 'max:5120', 'mimes:jpeg,png,webp,gif'],
        ]);

        if ($request->hasFile('cv')) {
            $request->validate([
                'cv' => ['required', 'file', 'max:5120', 'mimes:pdf,doc,docx'],
            ]);
        }

        $validated['name'] = $this->triLangValue($validated['name'] ?? []);
        $validated['title'] = $this->triLangValue($validated['title'] ?? []);
        $validated['bio'] = $this->triLangValue($validated['bio'] ?? []);
        $validated['country'] = trim((string) ($validated['country'] ?? ''));
        $validated['city'] = $this->triLangValue($validated['city'] ?? []);
        $validated['languages'] = array_values(array_unique(array_filter(array_map(
            static fn (string $value): string => trim($value),
            $validated['languages'] ?? []
        ))));
        $validated['email'] = trim((string) ($validated['email'] ?? ''));
        $validated['phone'] = trim((string) ($validated['phone'] ?? ''));
        $validated['linkedin_url'] = trim((string) ($validated['linkedin_url'] ?? ''));
        $validated['twitter_url'] = trim((string) ($validated['twitter_url'] ?? ''));
        $validated['instagram_url'] = trim((string) ($validated['instagram_url'] ?? ''));
        $validated['portfolio_url'] = trim((string) ($validated['portfolio_url'] ?? ''));

        $validated['bio_i18n'] = $validated['bio'];
        $validated['expertise'] = ExpertDomains::normalizeSelection(
            $validated['expertise_domains'] ?? []
        );
        unset($validated['expertise_domains']);
        $validated['socials'] = [
            'linkedin' => $validated['linkedin_url'],
            'twitter' => $validated['twitter_url'],
            'instagram' => $validated['instagram_url'],
            'portfolio' => $validated['portfolio_url'],
        ];

        unset(
            $validated['portfolio_url'],
            $validated['linkedin_url'],
            $validated['twitter_url'],
            $validated['instagram_url'],
            $validated['bio']
        );
        $validated['city_i18n'] = $validated['city'];
        unset($validated['city']);

        return $validated;
    }

    /**
     * Persist CV file on public disk.
     */
    private function storeCvFromUpload(UploadedFile $file): string
    {
        return $file->store('experts/cv', 'public');
    }

    private function cvUrl(?string $path): ?string
    {
        $path = trim((string) ($path ?? ''));
        if ($path === '') {
            return null;
        }

        return Storage::disk('public')->exists($path) ? Storage::url($path) : null;
    }

    /**
     * @return array{en: string, fr: string, ar: string}
     */
    private function resolveCityForForm(Expert $expert): array
    {
        $cityFromColumn = is_array($expert->city_i18n) ? $expert->city_i18n : null;
        if ($cityFromColumn !== null) {
            return $this->triLangValue($cityFromColumn);
        }

        return $this->triLangValue(['en' => '', 'fr' => '', 'ar' => '']);
    }

    /**
     * @param  list<array{en?: string, fr?: string, ar?: string}>|null  $expertise
     * @return list<array{en: string, fr: string, ar: string}>
     */
    private function expertiseDomainsToForm(?array $expertise): array
    {
        return ExpertDomains::normalizeSelection(is_array($expertise) ? $expertise : []);
    }

    /**
     * Persist profile image on the public disk and return the stored path.
     */
    private function storeProfileImageFromUpload(UploadedFile $file): string
    {
        return $file->store('experts', 'public');
    }
}

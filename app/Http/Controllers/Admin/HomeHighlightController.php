<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeHighlight;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class HomeHighlightController extends Controller
{
    private const MAX_ACTIVE = 3;

    public function index(): Response
    {
        $highlights = HomeHighlight::query()
            ->orderByDesc('highlight_date')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (HomeHighlight $h) => [
                'id' => $h->id,
                'title' => $h->title,
                'card_type' => $h->card_type,
                'link_url' => $h->link_url,
                'highlight_date' => $h->highlight_date?->format('Y-m-d'),
                'is_active' => $h->is_active,
                'sort_order' => $h->sort_order,
                'updated_at' => $h->updated_at?->toIso8601String(),
            ]);

        return Inertia::render('admin/home-highlights/index', [
            'highlights' => $highlights,
            'cardTypes' => HomeHighlight::CARD_TYPES,
            'maxActive' => self::MAX_ACTIVE,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/home-highlights/create', [
            'cardTypes' => HomeHighlight::CARD_TYPES,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);

        if ($data['is_active']) {
            $this->assertCanActivate(null);
        }

        HomeHighlight::query()->create($data);

        return redirect()->route('admin.home-highlights.index')
            ->with('success', 'Home highlight created.');
    }

    public function edit(HomeHighlight $home_highlight): Response
    {
        $h = $home_highlight;

        return Inertia::render('admin/home-highlights/edit', [
            'highlight' => [
                'id' => $h->id,
                'title' => $h->title,
                'card_type' => $h->card_type,
                'link_url' => $h->link_url,
                'highlight_date' => $h->highlight_date?->format('Y-m-d'),
                'is_active' => $h->is_active,
                'sort_order' => $h->sort_order,
            ],
            'cardTypes' => HomeHighlight::CARD_TYPES,
        ]);
    }

    public function update(Request $request, HomeHighlight $home_highlight): RedirectResponse
    {
        $data = $this->validated($request);

        if ($data['is_active']) {
            $this->assertCanActivate($home_highlight->id);
        }

        $home_highlight->update($data);

        return redirect()->route('admin.home-highlights.index')
            ->with('success', 'Home highlight updated.');
    }

    public function destroy(HomeHighlight $home_highlight): RedirectResponse
    {
        $home_highlight->delete();

        return redirect()->route('admin.home-highlights.index')
            ->with('success', 'Home highlight deleted.');
    }

    /**
     * @return array{title: array{en: string, fr: string, ar: string}, card_type: string, link_url: string, highlight_date: string, is_active: bool, sort_order: int}
     */
    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'title.en' => 'nullable|string|max:500',
            'title.fr' => 'nullable|string|max:500',
            'title.ar' => 'nullable|string|max:500',
            'card_type' => ['required', Rule::in(HomeHighlight::CARD_TYPES)],
            'link_url' => 'required|string|max:2048',
            'highlight_date' => 'required|date',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0|max:65535',
        ]);

        $en = trim((string) $request->input('title.en', ''));
        $fr = trim((string) $request->input('title.fr', ''));
        $ar = trim((string) $request->input('title.ar', ''));
        if ($en === '' && $fr === '' && $ar === '') {
            throw ValidationException::withMessages([
                'title' => 'At least one language title is required.',
            ]);
        }

        return [
            'title' => [
                'en' => $en,
                'fr' => $fr,
                'ar' => $ar,
            ],
            'card_type' => $validated['card_type'],
            'link_url' => $validated['link_url'],
            'highlight_date' => $validated['highlight_date'],
            'is_active' => (bool) ($validated['is_active'] ?? false),
            'sort_order' => (int) ($validated['sort_order'] ?? 0),
        ];
    }

    private function assertCanActivate(?int $ignoreId): void
    {
        $q = HomeHighlight::query()->where('is_active', true);
        if ($ignoreId) {
            $q->where('id', '!=', $ignoreId);
        }
        if ($q->count() >= self::MAX_ACTIVE) {
            throw ValidationException::withMessages([
                'is_active' => 'Maximum '.self::MAX_ACTIVE.' active highlights — deactivate one first.',
            ]);
        }
    }
}

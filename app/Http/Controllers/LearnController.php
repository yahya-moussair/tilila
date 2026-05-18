<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\TililabEdition;
use App\Models\TililaEdition;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LearnController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('learn/index');
    }

    public function academy(Request $request): Response
    {
        return Inertia::render('learn/academy');
    }

    public function resources(Request $request): Response
    {
        return Inertia::render('learn/resources');
    }

    public function offers(Request $request): Response
    {
        return Inertia::render('learn/offers');
    }

    /**
     * Agenda under Learn (internal Tilila calendar + partner-style listings).
     */
    public function agenda(Request $request): Response
    {
        $events = Event::query()
            ->where('visibility', 'public')
            ->where('status', '!=', 'draft')
            ->orderByRaw('CASE WHEN date IS NULL THEN 1 ELSE 0 END')
            ->orderBy('date')
            ->orderBy('time')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Event $e) => $this->agendaEventPayload($e));

        return Inertia::render('learn/agenda', [
            'events' => $events,
            'tililaEditionsCount' => TililaEdition::query()->count(),
            'tililabEditionsCount' => TililabEdition::query()->count(),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function agendaEventPayload(Event $event): array
    {
        $title = is_array($event->title) ? $event->title : ['en' => '', 'fr' => '', 'ar' => ''];

        return [
            'id' => $event->id,
            'type' => $event->type,
            'dateIso' => $event->date?->format('Y-m-d'),
            'title' => $title,
            'status' => $event->status,
        ];
    }
}

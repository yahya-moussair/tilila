import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import EventsTabs from '@/pages/events/Partials/EventsTabs';
import EventsSidebar from '@/pages/events/Partials/EventsSidebar';
import EventCard from '@/pages/events/Partials/EventCard';
import { EVENTS } from '@/pages/events/Partials/events-data';

function isPastEvent(event) {
    const ts = new Date(event?.dateTimeIso ?? '').getTime();
    if (Number.isNaN(ts)) return false;
    return ts < Date.now();
}

export default function EventsIndex() {
    const [activeTab, setActiveTab] = useState('upcoming'); // upcoming | past
    const [selectedDayIso, setSelectedDayIso] = useState(null);
    const [categories, setCategories] = useState({
        talk: true,
        webinar: true,
        workshop: true,
    });

    const counts = useMemo(() => {
        const all = EVENTS ?? [];
        const upcoming = all.filter((e) => !isPastEvent(e)).length;
        const past = all.filter((e) => isPastEvent(e)).length;
        return { upcoming, past };
    }, []);

    const filteredEvents = useMemo(() => {
        const all = EVENTS ?? [];

        let list = all.filter((e) => {
            const type = e?.type ?? 'talk';
            return Boolean(categories[type]);
        });

        if (selectedDayIso) {
            list = list.filter((e) => (e?.dateIso ?? '') === selectedDayIso);
        }

        const wantsPast = activeTab === 'past';
        list = list.filter((e) => (wantsPast ? isPastEvent(e) : !isPastEvent(e)));

        list = [...list].sort((a, b) => {
            const at = new Date(a?.dateTimeIso ?? '').getTime();
            const bt = new Date(b?.dateTimeIso ?? '').getTime();
            return wantsPast ? bt - at : at - bt;
        });

        return list;
    }, [activeTab, categories, selectedDayIso]);

    return (
        <>
            <Head title="Events" />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <header className="mx-auto max-w-3xl text-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Events Agenda
                        </h1>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            Stay connected with the latest discussions, workshops, and
                            TiliTalks. Join us to shape the future of diversity and parity
                            in media.
                        </p>

                        <div className="mt-7 flex justify-center">
                            <EventsTabs
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                counts={counts}
                            />
                        </div>
                    </header>

                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-4 xl:col-span-3">
                            <EventsSidebar
                                categories={categories}
                                setCategories={setCategories}
                                selectedDayIso={selectedDayIso}
                                setSelectedDayIso={setSelectedDayIso}
                                events={EVENTS}
                            />
                        </div>

                        <div className="lg:col-span-8 xl:col-span-9">
                            <div className="space-y-4">
                                {filteredEvents.map((event) => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        activeTab={activeTab}
                                    />
                                ))}
                            </div>

                            {filteredEvents.length === 0 ? (
                                <div className="mt-6 rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
                                    <div className="text-sm font-semibold text-foreground">
                                        No events found
                                    </div>
                                    <div className="mt-2 text-sm text-muted-foreground">
                                        Try changing your categories or selecting a different
                                        date.
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

EventsIndex.layout = (page) => <AppLayout>{page}</AppLayout>;


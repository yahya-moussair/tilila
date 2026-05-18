import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';

export default function LearnAgenda({
    events = [],
    tililaEditionsCount = 0,
    tililabEditionsCount = 0,
}) {
    return (
        <>
            <Head title="Learn · Agenda" />
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <Link
                    href="/learn"
                    className="text-sm font-semibold text-beta-blue hover:underline"
                >
                    ← Learn
                </Link>
                <h1 className="mt-6 text-3xl font-extrabold">
                    <TransText
                        en="Programme agenda"
                        fr="Agenda du programme"
                        ar="أجندة البرنامج"
                    />
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                    <TransText
                        en="Internal Tilila calendar entries plus partner conferences and webinars. For the full public events grid, open Events → Calendar."
                        fr="Calendrier interne Tilila, conférences partenaires et webinaires. Pour la grille complète : Événements → Agenda."
                        ar="تقويم تيليلا الداخلي ومؤتمرات الشركاء والندوات. للشبكة الكاملة: الفعاليات ← الأجندة."
                    />
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-border bg-card p-4 text-center">
                        <div className="text-2xl font-extrabold">
                            {events.length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            <TransText
                                en="Listed sessions"
                                fr="Sessions listées"
                                ar="جلسات مسجلة"
                            />
                        </div>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 text-center">
                        <div className="text-2xl font-extrabold">
                            {tililaEditionsCount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Tilila editions
                        </div>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 text-center">
                        <div className="text-2xl font-extrabold">
                            {tililabEditionsCount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Tililab editions
                        </div>
                    </div>
                </div>

                <div className="mt-10 space-y-3">
                    {events.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            <TransText
                                en="No upcoming rows in this simplified view."
                                fr="Aucune ligne dans cette vue simplifiée."
                                ar="لا توجد عناصر في هذا العرض المبسط."
                            />
                        </p>
                    ) : (
                        events.map((ev) => (
                            <div
                                key={ev.id}
                                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
                            >
                                <span className="font-semibold text-foreground">
                                    <TransText
                                        en={ev.title?.en}
                                        fr={ev.title?.fr}
                                        ar={ev.title?.ar}
                                    />
                                </span>
                                <span className="text-muted-foreground">
                                    {ev.dateIso}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-10">
                    <Link
                        href="/events?view=calendar"
                        className="text-sm font-semibold text-beta-blue hover:underline"
                    >
                        <TransText
                            en="Open full events calendar →"
                            fr="Ouvrir l’agenda complet →"
                            ar="افتح أجندة الفعاليات الكاملة ←"
                        />
                    </Link>
                </div>
            </div>
        </>
    );
}

LearnAgenda.layout = (page) => <AppLayout>{page}</AppLayout>;

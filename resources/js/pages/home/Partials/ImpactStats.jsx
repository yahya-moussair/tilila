import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

export default function ImpactStats({ stats }) {
    const metrics = useMemo(() => {
        const s = stats || {};
        const toNum = (v) =>
            typeof v === 'number' && Number.isFinite(v) ? v : 0;
        return [
            {
                value: String(toNum(s.experts_published)),
                en: 'Referenced experts',
                fr: 'Expertes référencées',
                ar: 'خبيرات مسجّلات',
            },
            {
                value: String(toNum(s.countries_represented)),
                en: 'Countries',
                fr: 'Pays',
                ar: 'دول',
            },
            {
                value: String(toNum(s.events_and_editions)),
                en: 'Events & editions',
                fr: 'Événements & éditions',
                ar: 'فعاليات ودورات',
            },
        ];
    }, [stats]);

    return (
        <section className="bg-beta-blue text-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-md">
                        <div className="text-sm font-semibold opacity-95">
                            <TransText
                                en="Proof in numbers"
                                fr="La preuve en chiffres"
                                ar="الأرقام تتحدث"
                            />
                        </div>
                        <div className="mt-1 text-xs opacity-90">
                            <TransText
                                en="Live counts from the expert base and programme activity."
                                fr="Compteurs issus de la base expertes et de l’activité du programme."
                                ar="أعداد مباشرة من قاعدة الخبيرات ونشاط البرنامج."
                            />
                        </div>
                        <Link
                            href="/experts"
                            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-twhite px-8 text-sm font-semibold text-beta-blue shadow-lg shadow-tblack/20 transition hover:opacity-95"
                        >
                            <TransText
                                en="Find an expert"
                                fr="Trouver une experte"
                                ar="اعثر على خبيرة"
                            />
                        </Link>
                    </div>

                    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
                        {metrics.map((stat, idx) => (
                            <div
                                key={`${stat.en}-${idx}`}
                                className="rounded-xl bg-white/10 px-5 py-4 ring-1 ring-white/15"
                            >
                                <div className="text-3xl font-extrabold tracking-tight tabular-nums">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-xs opacity-90">
                                    <TransText
                                        en={stat.en}
                                        fr={stat.fr}
                                        ar={stat.ar}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

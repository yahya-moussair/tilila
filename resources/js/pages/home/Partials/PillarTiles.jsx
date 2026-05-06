import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

const PILLARS = [
    {
        href: '/about',
        enTitle: 'About',
        frTitle: 'À propos',
        arTitle: 'حول',
        enSub: 'Vision · Mission · Impact',
        frSub: 'Vision · Mission · Impact',
        arSub: 'رؤية · رسالة · أثر',
    },
    {
        href: '/events',
        enTitle: 'Events',
        frTitle: 'Événements',
        arTitle: 'الفعاليات',
        enSub: 'Awards · Tililab · Talks',
        frSub: 'Awards · Tililab · Talks',
        arSub: 'جوائز · تيليلاب · نقاشات',
    },
    {
        href: '/experts',
        enTitle: 'Experts',
        frTitle: 'Expertes',
        arTitle: 'الخبيرات',
        enSub: 'Directory · Connect · Media',
        frSub: 'Annuaire · Connect · Média',
        arSub: 'دليل · تواصل · إعلام',
    },
    {
        href: '/learn',
        enTitle: 'Learn',
        frTitle: 'Learn',
        arTitle: 'تعلم',
        enSub: 'Academy · Jobs · Agenda',
        frSub: 'Academy · Offres · Agenda',
        arSub: 'أكاديمية · فرص · أجندة',
    },
];

export default function PillarTiles() {
    return (
        <section className="bg-background">
            <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                        <TransText
                            en="Explore Tilila"
                            fr="Explorer Tilila"
                            ar="استكشف تيليلا"
                        />
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        <TransText
                            en="Four pillars — clear navigation, no duplicates."
                            fr="Quatre piliers — navigation claire, sans doublons."
                            ar="أربعة محاور — تنقل واضح دون ازدواجية."
                        />
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {PILLARS.map((p) => (
                        <Link
                            key={p.href}
                            href={p.href}
                            className="group rounded-2xl border border-border bg-card p-6 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-alpha-blue text-beta-blue">
                                <div className="h-4 w-4 rounded bg-beta-blue/30" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-beta-blue">
                                <TransText
                                    en={p.enTitle}
                                    fr={p.frTitle}
                                    ar={p.arTitle}
                                />
                            </h3>
                            <p className="mt-2 text-xs font-medium text-muted-foreground">
                                <TransText
                                    en={p.enSub}
                                    fr={p.frSub}
                                    ar={p.arSub}
                                />
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

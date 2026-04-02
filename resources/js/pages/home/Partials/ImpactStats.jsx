import React from 'react';
import TransText from '@/components/TransText';

const STATS = [
    { value: '500+', en: 'Experts registered', fr: 'Expertes inscrites', ar: 'خبيرات مسجلات' },
    { value: '50+', en: 'Media partners', fr: 'Partenaires médias', ar: 'شركاء إعلاميون' },
    { value: '120+', en: 'Events hosted', fr: 'Événements organisés', ar: 'فعاليات نُظِّمت' },
];

export default function ImpactStats() {
    return (
        <section className="bg-beta-blue text-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-4">
                    <div>
                        <div className="text-sm font-semibold opacity-95">
                            <TransText
                                en="Our Impact in Numbers"
                                fr="Notre impact en chiffres"
                                ar="أثرنا بالأرقام"
                            />
                        </div>
                        <div className="mt-1 text-xs opacity-90">
                            <TransText
                                en="Growing a community of visibility."
                                fr="Construire une communauté visible."
                                ar="نبني مجتمعًا أكثر حضورًا."
                            />
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl bg-white/10 px-5 py-4 ring-1 ring-white/15"
                                >
                                    <div className="text-2xl font-extrabold tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-xs opacity-90">
                                        <TransText en={stat.en} fr={stat.fr} ar={stat.ar} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

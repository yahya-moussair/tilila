import React from 'react';

import TransText from '@/components/TransText';

const TOPICS = [
    {
        en: 'Women in STEM',
        fr: 'Femmes en STEM',
        ar: 'النساء في STEM',
        metaEn: 'April 2026',
        metaFr: 'Avril 2026',
        metaAr: 'أبريل 2026',
    },
    {
        en: 'Media parity',
        fr: 'Parité dans les médias',
        ar: 'التكافؤ في الإعلام',
        metaEn: 'Trending',
        metaFr: 'Tendance',
        metaAr: 'الأكثر تداولًا',
    },
    {
        en: 'Mentorship',
        fr: 'Mentorat',
        ar: 'الإرشاد',
        metaEn: 'New',
        metaFr: 'Nouveau',
        metaAr: 'جديد',
    },
];

export default function SidebarTrendingTopics() {
    return (
        <aside className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                <TransText en="Trending topics" fr="Sujets tendance" ar="مواضيع رائجة" />
            </div>

            <div className="mt-4 space-y-3">
                {TOPICS.map((t) => (
                    <button
                        key={t.en}
                        type="button"
                        className="flex w-full items-center justify-between gap-3 rounded-xl bg-background px-4 py-3 text-left ring-1 ring-border hover:bg-secondary"
                    >
                        <div className="text-sm font-semibold text-foreground">
                            <TransText en={t.en} fr={t.fr} ar={t.ar} />
                        </div>
                        <div className="text-xs font-semibold text-muted-foreground">
                            <TransText en={t.metaEn} fr={t.metaFr} ar={t.metaAr} />
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    );
}


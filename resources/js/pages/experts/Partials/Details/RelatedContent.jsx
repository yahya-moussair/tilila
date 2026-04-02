import React from 'react';
import TransText from '@/components/TransText';

export default function RelatedContent({ items = [] }) {
    return (
        <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <h2 className="text-base font-extrabold text-foreground">
                <TransText
                    en="Published Articles & Related Content"
                    fr="Articles publiés & contenus associés"
                    ar="مقالات منشورة ومحتوى ذو صلة"
                />
            </h2>

            <div className="mt-5 space-y-3">
                {items.map((x) => (
                    <div
                        key={x.title.en}
                        className="flex gap-3 rounded-xl bg-background p-4 ring-1 ring-border"
                    >
                        <div className="mt-0.5 h-9 w-9 shrink-0 rounded-lg bg-alpha-blue text-beta-blue ring-1 ring-border" />
                        <div className="min-w-0">
                            <div className="text-sm font-extrabold text-foreground">
                                <TransText en={x.title.en} fr={x.title.fr} ar={x.title.ar} />
                            </div>
                            <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                <TransText
                                    en={x.description.en}
                                    fr={x.description.fr}
                                    ar={x.description.ar}
                                />
                            </div>
                            <div className="mt-2 text-xs font-semibold text-muted-foreground">
                                <TransText en={x.meta.en} fr={x.meta.fr} ar={x.meta.ar} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


import React from 'react';

export default function RelatedContent({ items = [] }) {
    return (
        <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <h2 className="text-base font-extrabold text-foreground">
                Published Articles &amp; Related Content
            </h2>

            <div className="mt-5 space-y-3">
                {items.map((x) => (
                    <div
                        key={x.title}
                        className="flex gap-3 rounded-xl bg-background p-4 ring-1 ring-border"
                    >
                        <div className="mt-0.5 h-9 w-9 shrink-0 rounded-lg bg-alpha-blue text-beta-blue ring-1 ring-border" />
                        <div className="min-w-0">
                            <div className="text-sm font-extrabold text-foreground">
                                {x.title}
                            </div>
                            <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                {x.description}
                            </div>
                            <div className="mt-2 text-xs font-semibold text-muted-foreground">
                                {x.meta}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


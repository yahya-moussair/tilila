import React from 'react';

export default function ProfessionalJourney({ items = [] }) {
    return (
        <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <h2 className="text-base font-extrabold text-foreground">
                Media &amp; Professional Journey
            </h2>

            <div className="mt-5 space-y-5">
                {items.map((it) => (
                    <div key={`${it.year}-${it.role}`} className="flex gap-3">
                        <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-alpha-blue text-beta-blue ring-1 ring-border" />
                        <div>
                            <div className="text-xs font-semibold text-muted-foreground">
                                {it.year} • Press
                            </div>
                            <div className="mt-1 text-sm font-extrabold text-foreground">
                                {it.role}
                            </div>
                            <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                {it.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


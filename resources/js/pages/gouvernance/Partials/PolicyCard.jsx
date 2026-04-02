import React from 'react';
import TransText from '@/components/TransText';

function StatCard({ value, label }) {
    return (
        <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="text-3xl font-extrabold text-beta-blue">{value}</div>
            <div className="mt-2 text-xs font-semibold text-muted-foreground">
                {label}
            </div>
        </div>
    );
}

export default function PolicyCard({
    title,
    subtitle,
    highlights = [],
    stat,
}) {
    return (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border lg:col-span-8">
                <div className="text-sm font-extrabold text-foreground">{title}</div>
                {subtitle ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {subtitle}
                    </p>
                ) : null}

                <ul className="mt-4 space-y-3">
                    {highlights.map((h) => (
                        <li key={h.en} className="flex gap-3">
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-alpha-blue text-beta-blue ring-1 ring-border">
                                ✓
                            </span>
                            <span className="text-sm font-semibold text-muted-foreground">
                                <TransText en={h.en} fr={h.fr} ar={h.ar} />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="lg:col-span-4">
                <StatCard value={stat?.value ?? '—'} label={stat?.label ?? ''} />
            </div>
        </section>
    );
}


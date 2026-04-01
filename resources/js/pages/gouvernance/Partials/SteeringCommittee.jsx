import React from 'react';

function Avatar({ tone }) {
    return (
        <div
            className={[
                'h-12 w-12 shrink-0 rounded-full bg-gradient-to-br ring-1 ring-border',
                tone ?? 'from-beta-blue via-alpha-blue to-beta-green',
            ].join(' ')}
            aria-hidden="true"
        />
    );
}

export default function SteeringCommittee({ title, ctaLabel, items = [] }) {
    return (
        <section id="committee">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-base font-extrabold text-foreground">{title}</div>
                {ctaLabel ? (
                    <a
                        href="#"
                        className="text-xs font-semibold text-beta-blue hover:underline"
                    >
                        {ctaLabel}
                    </a>
                ) : null}
            </div>

            <div className="mt-4 space-y-4">
                {items.map((m) => (
                    <article
                        key={`${m.name}-${m.role}`}
                        className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border"
                    >
                        <div className="flex gap-4">
                            <Avatar tone={m.avatarTone} />
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="text-sm font-extrabold text-foreground">
                                        {m.name}
                                    </div>
                                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                                        {m.role}
                                    </span>
                                </div>
                                <div className="mt-1 text-xs font-semibold text-muted-foreground">
                                    {m.org}
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {m.bio}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}


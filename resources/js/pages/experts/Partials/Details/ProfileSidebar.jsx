import React from 'react';

function IconButton({ label, children }) {
    return (
        <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm hover:text-foreground"
            aria-label={label}
            title={label}
        >
            {children}
        </button>
    );
}

export default function ProfileSidebar({ expert, details }) {
    return (
        <aside className="space-y-4">
            <div className="rounded-2xl bg-card shadow-sm ring-1 ring-border">
                <div className="relative">
                    <div
                        className={[
                            'h-28 w-full rounded-t-2xl bg-gradient-to-br',
                            expert.gradient,
                        ].join(' ')}
                    />
                    {expert.badge ? (
                        <div className="absolute left-4 top-4 rounded-full bg-beta-green px-2.5 py-1 text-xs font-semibold text-alpha-green ring-1 ring-border">
                            {expert.badge.toUpperCase()}
                        </div>
                    ) : null}
                </div>

                <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <div className="text-lg font-extrabold text-foreground">
                                {expert.name}
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                                {expert.title}
                            </div>
                        </div>

                        <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-sm ring-1 ring-border backdrop-blur hover:text-foreground"
                            aria-label="Add to favorites"
                        >
                            <span className="text-lg leading-none">♡</span>
                        </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {(details?.headlineTags ?? expert.tags ?? []).slice(0, 3).map((t) => (
                            <span
                                key={t}
                                className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <IconButton label="LinkedIn">in</IconButton>
                        <IconButton label="Twitter / X">𝕏</IconButton>
                        <IconButton label="Website">⌁</IconButton>
                    </div>

                    <button
                        type="button"
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-beta-blue px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                        <span aria-hidden="true">✉</span>
                        Contact Expert
                    </button>
                </div>
            </div>

            {details?.quote ? (
                <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
                    <div className="text-2xl font-extrabold text-beta-blue">“</div>
                    <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {details.quote}
                    </div>
                    <div className="mt-3 text-right text-xs font-semibold text-muted-foreground">
                        — {expert.name}
                    </div>
                </div>
            ) : null}
        </aside>
    );
}


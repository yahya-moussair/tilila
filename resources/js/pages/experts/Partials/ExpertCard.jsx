import React from 'react';
import { Link } from '@inertiajs/react';

export default function ExpertCard({ expert, view = 'grid' }) {
    return (
        <div className="rounded-2xl bg-card shadow-sm ring-1 ring-border">
            <div className="relative">
                <div
                    className={[
                        'h-32 w-full rounded-t-2xl bg-gradient-to-br',
                        expert.gradient,
                    ].join(' ')}
                />

                <button
                    type="button"
                    className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-sm ring-1 ring-border backdrop-blur hover:text-foreground"
                    aria-label="Add to favorites"
                >
                    <span className="text-lg leading-none">♡</span>
                </button>

                {expert.badge ? (
                    <div className="absolute left-3 top-3 rounded-full bg-beta-green px-2.5 py-1 text-xs font-semibold text-alpha-green ring-1 ring-border">
                        {expert.badge.toUpperCase()}
                    </div>
                ) : null}
            </div>

            <div className="p-5">
                <div className="text-base font-extrabold text-foreground">
                    {expert.name}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{expert.title}</div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {expert.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                    {expert.tags.length > 2 ? (
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                            +{expert.tags.length - 2}
                        </span>
                    ) : null}
                </div>

                <div
                    className={[
                        'mt-4 flex items-center justify-between gap-3',
                        view === 'list' ? 'flex-row' : 'flex-row',
                    ].join(' ')}
                >
                    <div className="text-xs text-muted-foreground">{expert.location}</div>
                    <Link
                        href={`/experts/${expert.id}`}
                        className="text-sm font-semibold text-beta-blue hover:underline"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}


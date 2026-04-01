import React from 'react';
import { Link } from '@inertiajs/react';

const TYPE_LABEL = {
    media_call: 'Media Call',
    panel_discussion: 'Panel Discussion',
    grant: 'Grant',
    residency: 'Residency',
};

function StatusPill({ status }) {
    const label =
        status === 'closing_soon'
            ? 'Closing Soon'
            : status === 'open'
              ? 'Open'
              : 'Closed';

    const className =
        status === 'closing_soon'
            ? 'bg-beta-yellow text-alpha-yellow'
            : status === 'open'
              ? 'bg-beta-green text-alpha-green'
              : 'bg-secondary text-muted-foreground';

    return (
        <span
            className={[
                'inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-border',
                className,
            ].join(' ')}
        >
            <span className="h-2 w-2 rounded-full bg-current opacity-70" />
            {label}
        </span>
    );
}

export default function OpportunityCard({ item }) {
    return (
        <article className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-alpha-blue text-beta-blue ring-1 ring-border">
                    <span className="text-lg font-extrabold">◎</span>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                            {TYPE_LABEL[item.type] ?? 'Opportunity'}
                        </span>
                        <StatusPill status={item.status} />
                        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                            <span aria-hidden="true">🗓</span>
                            Deadline: {item.deadlineLabel}
                        </div>
                    </div>

                    <h3 className="mt-2 text-base font-extrabold text-foreground">
                        {item.title}
                    </h3>

                    <div className="mt-1 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground/80">
                            {item.org}
                        </span>{' '}
                        • {item.location}
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <span>Posted {item.posted}</span>
                            <span>👁 {item.views} views</span>
                        </div>
                        <Link
                            href={`/opportunities/${item.id}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-beta-blue hover:underline"
                        >
                            Apply Now <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}


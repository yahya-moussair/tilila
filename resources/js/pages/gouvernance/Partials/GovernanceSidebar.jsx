import React from 'react';

export default function GovernanceSidebar({
    sections = [],
    activeId,
    onSelect,
}) {
    return (
        <aside className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                Governance
            </div>

            <nav className="mt-4 space-y-1">
                {sections.map((s) => {
                    const isActive = s.id === activeId;
                    return (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => onSelect(s.id)}
                            aria-pressed={isActive}
                            className={[
                                'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold ring-1 transition',
                                isActive
                                    ? 'bg-alpha-blue text-beta-blue ring-border'
                                    : 'bg-background text-muted-foreground ring-border hover:text-foreground',
                            ].join(' ')}
                        >
                            <span>{s.label}</span>
                            <span aria-hidden="true">›</span>
                        </button>
                    );
                })}
            </nav>

            <div className="mt-4 rounded-xl bg-background p-4 ring-1 ring-border">
                <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                    Resources
                </div>
                <div className="mt-2 space-y-2 text-sm">
                    <a
                        href="#"
                        className="block font-semibold text-beta-blue hover:underline"
                    >
                        Download policy
                    </a>
                    <a
                        href="#"
                        className="block font-semibold text-beta-blue hover:underline"
                    >
                        Contact committee
                    </a>
                </div>
            </div>
        </aside>
    );
}


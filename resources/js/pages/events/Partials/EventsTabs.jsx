import React from 'react';

function TabButton({ isActive, onClick, children, count, ariaLabel }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isActive}
            aria-label={ariaLabel}
            className={[
                'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-sm ring-1 transition',
                isActive
                    ? 'bg-alpha-blue text-beta-blue ring-border'
                    : 'bg-card text-muted-foreground ring-border hover:text-foreground',
            ].join(' ')}
        >
            <span>{children}</span>
            {typeof count === 'number' ? (
                <span
                    className={[
                        'inline-flex min-w-6 items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-bold',
                        isActive ? 'bg-white text-beta-blue' : 'bg-secondary',
                    ].join(' ')}
                >
                    {count}
                </span>
            ) : null}
        </button>
    );
}

export default function EventsTabs({ activeTab, setActiveTab, counts }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full bg-background p-1 ring-1 ring-border">
            <TabButton
                isActive={activeTab === 'upcoming'}
                onClick={() => setActiveTab('upcoming')}
                count={counts?.upcoming}
                ariaLabel="Upcoming events"
            >
                Upcoming Events
            </TabButton>
            <TabButton
                isActive={activeTab === 'past'}
                onClick={() => setActiveTab('past')}
                count={counts?.past}
                ariaLabel="Past events and replays"
            >
                Past Events / Replays
            </TabButton>
        </div>
    );
}


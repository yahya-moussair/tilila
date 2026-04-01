import React from 'react';

function Section({ title, children }) {
    return (
        <div className="border-b border-border pb-4 last:border-b-0 last:pb-0">
            <div className="text-xs font-extrabold tracking-wide text-muted-foreground">
                {title}
            </div>
            <div className="mt-3 space-y-2">{children}</div>
        </div>
    );
}

function Radio({ checked, onChange, label }) {
    return (
        <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
                type="radio"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 accent-[var(--color-beta-blue)]"
            />
            <span className="text-sm text-muted-foreground">{label}</span>
        </label>
    );
}

export default function FiltersSidebar({ filters, setFilters, onReset }) {
    return (
        <aside className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold text-foreground">Filters</div>
                <button
                    type="button"
                    onClick={onReset}
                    className="text-xs font-semibold text-beta-blue hover:underline"
                >
                    Reset All
                </button>
            </div>

            <div className="mt-5 space-y-4">
                <Section title="TYPE">
                    <Radio
                        checked={filters.type === 'all'}
                        onChange={() => setFilters((f) => ({ ...f, type: 'all' }))}
                        label="All Types"
                    />
                    <Radio
                        checked={filters.type === 'panel_discussion'}
                        onChange={() =>
                            setFilters((f) => ({ ...f, type: 'panel_discussion' }))
                        }
                        label="Panel Discussion"
                    />
                    <Radio
                        checked={filters.type === 'media_call'}
                        onChange={() => setFilters((f) => ({ ...f, type: 'media_call' }))}
                        label="Media Call"
                    />
                    <Radio
                        checked={filters.type === 'grant'}
                        onChange={() => setFilters((f) => ({ ...f, type: 'grant' }))}
                        label="Grant"
                    />
                    <Radio
                        checked={filters.type === 'residency'}
                        onChange={() => setFilters((f) => ({ ...f, type: 'residency' }))}
                        label="Residency"
                    />
                </Section>

                <Section title="DEADLINE">
                    <Radio
                        checked={filters.deadline === 'any'}
                        onChange={() => setFilters((f) => ({ ...f, deadline: 'any' }))}
                        label="Anytime"
                    />
                    <Radio
                        checked={filters.deadline === 'this_week'}
                        onChange={() =>
                            setFilters((f) => ({ ...f, deadline: 'this_week' }))
                        }
                        label="This Week"
                    />
                    <Radio
                        checked={filters.deadline === 'this_month'}
                        onChange={() =>
                            setFilters((f) => ({ ...f, deadline: 'this_month' }))
                        }
                        label="This Month"
                    />
                </Section>

                <Section title="REGION">
                    <select
                        value={filters.region}
                        onChange={(e) =>
                            setFilters((f) => ({ ...f, region: e.target.value }))
                        }
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none"
                    >
                        <option value="all">All Regions</option>
                        <option value="casablanca">Casablanca</option>
                        <option value="rabat">Rabat</option>
                        <option value="marrakesh">Marrakesh</option>
                        <option value="tangier">Tangier</option>
                    </select>
                </Section>

                <div className="rounded-xl bg-alpha-blue/60 p-4 ring-1 ring-border">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 h-9 w-9 rounded-lg bg-beta-blue/20 text-beta-blue ring-1 ring-border" />
                        <div className="min-w-0">
                            <div className="text-sm font-extrabold text-foreground">
                                Stay Updated
                            </div>
                            <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                Get the latest opportunities delivered to your inbox every
                                week.
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-beta-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </aside>
    );
}


import React from 'react';

function Select({ label, value, onChange, options }) {
    return (
        <label className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground shadow-sm">
            <span className="whitespace-nowrap">{label}</span>
            <select
                className="w-full bg-transparent text-sm text-foreground outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default function FiltersBar({
    query,
    setQuery,
    filters,
    setFilters,
    sort,
    setSort,
    view,
    setView,
}) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex w-full items-center gap-3">
                    <div className="relative w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                            <span aria-hidden="true">⌕</span>
                        </div>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by name, expertise, or keyword..."
                            className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => {}}
                        className="inline-flex shrink-0 items-center justify-center rounded-md bg-beta-blue px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Select
                        label="Industry / Theme"
                        value={filters.industry}
                        onChange={(industry) =>
                            setFilters((f) => ({ ...f, industry }))
                        }
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'economics', label: 'Economics' },
                            { value: 'technology', label: 'Technology' },
                            { value: 'health', label: 'Health' },
                            { value: 'legal', label: 'Legal' },
                        ]}
                    />
                    <Select
                        label="Country"
                        value={filters.country}
                        onChange={(country) => setFilters((f) => ({ ...f, country }))}
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'ma', label: 'Morocco' },
                            { value: 'sn', label: 'Senegal' },
                        ]}
                    />
                    <Select
                        label="Languages"
                        value={filters.language}
                        onChange={(language) =>
                            setFilters((f) => ({ ...f, language }))
                        }
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'ar', label: 'Arabic' },
                            { value: 'fr', label: 'French' },
                            { value: 'en', label: 'English' },
                        ]}
                    />
                    <Select
                        label="Availability"
                        value={filters.availability}
                        onChange={(availability) =>
                            setFilters((f) => ({ ...f, availability }))
                        }
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'available', label: 'Available' },
                        ]}
                    />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
                    <Select
                        label="Sort by:"
                        value={sort}
                        onChange={setSort}
                        options={[
                            { value: 'relevance', label: 'Relevance' },
                            { value: 'name_asc', label: 'Name (A–Z)' },
                            { value: 'name_desc', label: 'Name (Z–A)' },
                        ]}
                    />

                    <div className="inline-flex items-center rounded-md border border-border bg-card shadow-sm">
                        <button
                            type="button"
                            onClick={() => setView('grid')}
                            className={[
                                'px-3 py-2 text-sm font-semibold',
                                view === 'grid'
                                    ? 'text-beta-blue'
                                    : 'text-muted-foreground hover:text-foreground',
                            ].join(' ')}
                            aria-pressed={view === 'grid'}
                            aria-label="Grid view"
                        >
                            ▦
                        </button>
                        <div className="h-8 w-px bg-border" />
                        <button
                            type="button"
                            onClick={() => setView('list')}
                            className={[
                                'px-3 py-2 text-sm font-semibold',
                                view === 'list'
                                    ? 'text-beta-blue'
                                    : 'text-muted-foreground hover:text-foreground',
                            ].join(' ')}
                            aria-pressed={view === 'list'}
                            aria-label="List view"
                        >
                            ≡
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import FiltersBar from '@/pages/experts/Partials/FiltersBar';
import ExpertCard from '@/pages/experts/Partials/ExpertCard';
import { EXPERTS } from '@/pages/experts/Partials/expert-data';

export default function ExpertsIndex() {
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('relevance');
    const [view, setView] = useState('grid');
    const [filters, setFilters] = useState({
        industry: 'all',
        country: 'ma',
        language: 'all',
        availability: 'all',
    });

    const filterLabels = useMemo(
        () => ({
            industry: {
                economics: 'Economics',
                technology: 'Technology',
                health: 'Health',
                legal: 'Legal',
            },
            country: {
                ma: 'Morocco',
                sn: 'Senegal',
            },
            language: {
                ar: 'Arabic',
                fr: 'French',
                en: 'English',
            },
            availability: {
                available: 'Available',
            },
        }),
        [],
    );

    const activeFilters = useMemo(() => {
        const items = [];

        if (filters.industry !== 'all') {
            items.push({
                key: 'industry',
                label: filterLabels.industry[filters.industry] ?? filters.industry,
            });
        }

        if (filters.country !== 'all') {
            items.push({
                key: 'country',
                label: filterLabels.country[filters.country] ?? filters.country,
            });
        }

        if (filters.language !== 'all') {
            items.push({
                key: 'language',
                label: filterLabels.language[filters.language] ?? filters.language,
            });
        }

        if (filters.availability !== 'all') {
            items.push({
                key: 'availability',
                label:
                    filterLabels.availability[filters.availability] ??
                    filters.availability,
            });
        }

        return items;
    }, [filterLabels, filters]);

    const experts = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = EXPERTS;

        if (filters.industry !== 'all') {
            list = list.filter((e) => (e.industries ?? []).includes(filters.industry));
        }

        if (filters.country !== 'all') {
            list = list.filter((e) => e.country === filters.country);
        }

        if (filters.language !== 'all') {
            list = list.filter((e) => (e.languages ?? []).includes(filters.language));
        }

        if (q) {
            const withScore = list
                .map((e, idx) => {
                    const name = (e.name ?? '').toLowerCase();
                    const title = (e.title ?? '').toLowerCase();
                    const tags = (e.tags ?? []).join(' ').toLowerCase();
                    const location = (e.location ?? '').toLowerCase();
                    const haystack = [name, title, tags, location].join(' ');

                    if (!haystack.includes(q)) return null;

                    let score = 0;
                    if (name.startsWith(q)) score += 100;
                    if (name.includes(q)) score += 50;
                    if (title.includes(q)) score += 25;
                    if (tags.includes(q)) score += 15;
                    if (location.includes(q)) score += 10;
                    score -= idx / 1000; // stable tie-breaker

                    return { e, score };
                })
                .filter(Boolean);

            list = withScore.map((x) => x.e);

            if (sort === 'relevance') {
                list = [...withScore]
                    .sort((a, b) => b.score - a.score)
                    .map((x) => x.e);
            }
        }

        if (filters.availability === 'available') {
            list = list.filter((e) => e.badge);
        }

        if (sort === 'name_asc') {
            list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'name_desc') {
            list = [...list].sort((a, b) => b.name.localeCompare(a.name));
        }

        return list;
    }, [
        filters.availability,
        filters.country,
        filters.industry,
        filters.language,
        query,
        sort,
    ]);

    return (
        <>
            <Head title="Experts" />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <header className="mx-auto max-w-3xl text-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Find an Expert
                        </h1>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            Discover and connect with leading women experts across Morocco
                            and Africa.
                        </p>
                    </header>

                    <div className="mx-auto mt-8 max-w-5xl">
                        <FiltersBar
                            query={query}
                            setQuery={setQuery}
                            filters={filters}
                            setFilters={setFilters}
                            sort={sort}
                            setSort={setSort}
                            view={view}
                            setView={setView}
                        />

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">ACTIVE FILTERS:</span>
                                {activeFilters.length ? (
                                    <>
                                        {activeFilters.map((f) => (
                                            <button
                                                key={f.key}
                                                type="button"
                                                onClick={() =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        [f.key]: 'all',
                                                    }))
                                                }
                                                className="inline-flex items-center gap-1 rounded-full bg-alpha-blue px-2.5 py-1 text-xs font-semibold text-beta-blue hover:opacity-90"
                                            >
                                                {f.label} <span aria-hidden="true">×</span>
                                            </button>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFilters({
                                                    industry: 'all',
                                                    country: 'all',
                                                    language: 'all',
                                                    availability: 'all',
                                                })
                                            }
                                            className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline"
                                        >
                                            Clear all
                                        </button>
                                    </>
                                ) : (
                                    <span>None</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-10 flex items-center justify-between text-sm">
                            <div className="text-muted-foreground">
                                Showing {experts.length} experts
                            </div>
                        </div>

                        <div className="mt-5">
                            <div
                                className={
                                    view === 'grid'
                                        ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
                                        : 'grid grid-cols-1 gap-4'
                                }
                            >
                                {experts.map((expert) => (
                                    <ExpertCard
                                        key={expert.id}
                                        expert={expert}
                                        view={view}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-2 text-xs">
                            <button
                                type="button"
                                className="rounded-md border border-border bg-card px-3 py-2 font-semibold text-muted-foreground shadow-sm hover:text-foreground"
                            >
                                1
                            </button>
                            <button
                                type="button"
                                className="rounded-md border border-border bg-card px-3 py-2 font-semibold text-muted-foreground shadow-sm hover:text-foreground"
                            >
                                2
                            </button>
                            <button
                                type="button"
                                className="rounded-md border border-border bg-card px-3 py-2 font-semibold text-muted-foreground shadow-sm hover:text-foreground"
                            >
                                3
                            </button>
                            <span className="px-2 text-muted-foreground">…</span>
                            <button
                                type="button"
                                className="rounded-md border border-border bg-card px-3 py-2 font-semibold text-muted-foreground shadow-sm hover:text-foreground"
                            >
                                12
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ExpertsIndex.layout = (page) => <AppLayout>{page}</AppLayout>;


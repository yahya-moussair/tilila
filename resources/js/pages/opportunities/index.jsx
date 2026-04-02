import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import FiltersSidebar from '@/pages/opportunities/Partials/FiltersSidebar';
import OpportunityCard from '@/pages/opportunities/Partials/OpportunityCard';
import { OPPORTUNITIES } from '@/pages/opportunities/Partials/opportunities-data';
import { useTranslation } from '@/contexts/TranslationContext';
import TransText from '@/components/TransText';

function formatDate(iso) {
    try {
        return new Date(iso).toLocaleDateString(undefined, {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
}

function daysUntil(iso) {
    const t = new Date(iso).getTime();
    if (Number.isNaN(t)) return null;
    const now = Date.now();
    return Math.ceil((t - now) / (1000 * 60 * 60 * 24));
}

export default function OpportunitiesIndex() {
    const { locale, t } = useTranslation();
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);
    const pageSize = 4;

    const [filters, setFilters] = useState({
        type: 'all',
        deadline: 'any',
        region: 'all',
    });

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        let list = OPPORTUNITIES.map((x) => ({
            ...x,
            deadlineLabel: formatDate(x.deadline),
            deadlineDays: daysUntil(x.deadline),
        }));

        if (filters.type !== 'all') {
            list = list.filter((x) => x.type === filters.type);
        }

        if (filters.deadline !== 'any') {
            list = list.filter((x) => {
                if (typeof x.deadlineDays !== 'number') return false;
                if (filters.deadline === 'this_week') return x.deadlineDays <= 7;
                if (filters.deadline === 'this_month') return x.deadlineDays <= 31;
                return true;
            });
        }

        if (filters.region !== 'all') {
            list = list.filter((x) =>
                (x.location?.en ?? '').toLowerCase().includes(filters.region),
            );
        }

        if (q) {
            list = list.filter((x) => {
                const haystack = [
                    x.title?.en,
                    x.title?.fr,
                    x.title?.ar,
                    x.org?.en,
                    x.org?.fr,
                    x.org?.ar,
                    x.location?.en,
                    x.location?.fr,
                    x.location?.ar,
                    x.excerpt?.en,
                    x.excerpt?.fr,
                    x.excerpt?.ar,
                    x.type,
                    x.status,
                ]
                    .join(' ')
                    .toLowerCase();
                return haystack.includes(q);
            });
        }

        if (sort === 'newest') {
            // mock: keep original order as “newest first”
            list = [...list];
        } else if (sort === 'deadline_soonest') {
            list = [...list].sort((a, b) => {
                const ad = a.deadlineDays ?? Number.POSITIVE_INFINITY;
                const bd = b.deadlineDays ?? Number.POSITIVE_INFINITY;
                return ad - bd;
            });
        }

        return list;
    }, [filters.deadline, filters.region, filters.type, query, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [currentPage, filtered]);

    // keep page valid when filters change
    React.useEffect(() => {
        setPage(1);
    }, [query, sort, filters.type, filters.deadline, filters.region]);

    return (
        <>
            <Head title={t('opportunities.headTitle')} />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <header className="max-w-3xl">
                        <TransText
                            tag="h1"
                            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
                            en="Opportunities Board"
                            fr="Tableau des opportunités"
                            ar="لوحة الفرص"
                        />
                        <TransText
                            tag="p"
                            className="mt-3 text-sm leading-relaxed text-muted-foreground"
                            en="Discover grants, media calls, panel discussions, and residencies tailored for women experts. Connect, contribute, and grow your impact."
                            fr="Découvrez des subventions, des appels médias, des tables rondes et des résidences destinés aux expertes. Connectez-vous, contribuez et développez votre impact."
                            ar="اكتشفي المنح وفرص الإعلام والحوارات والبرامج الإقامية المصممة للخبيرات. تواصلي، ساهمي، ووسّعي أثرَك."
                        />
                    </header>

                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-4 xl:col-span-3">
                            <FiltersSidebar
                                filters={filters}
                                setFilters={setFilters}
                                onReset={() =>
                                    setFilters({
                                        type: 'all',
                                        deadline: 'any',
                                        region: 'all',
                                    })
                                }
                            />
                        </div>

                        <div className="lg:col-span-8 xl:col-span-9">
                            <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div className="relative w-full md:max-w-xl">
                                        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                                            <span aria-hidden="true">⌕</span>
                                        </div>
                                        <input
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder={t('common.search')}
                                            className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-3 md:justify-end">
                                        <label className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground shadow-sm">
                                            <span className="whitespace-nowrap">
                                                <TransText
                                                    en="Sort by:"
                                                    fr="Trier par :"
                                                    ar="ترتيب حسب:"
                                                />
                                            </span>
                                            <select
                                                value={sort}
                                                onChange={(e) => setSort(e.target.value)}
                                                className="bg-transparent text-sm text-foreground outline-none"
                                            >
                                                <option value="newest">{t('opportunities.sortNewest')}</option>
                                                <option value="deadline_soonest">
                                                    {t('opportunities.sortDeadlineSoonest')}
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 space-y-4">
                                {pageItems.map((item) => (
                                    <OpportunityCard key={item.id} item={item} />
                                ))}
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-2 text-xs">
                                {Array.from({ length: totalPages }).map((_, idx) => {
                                    const n = idx + 1;
                                    const isActive = n === currentPage;
                                    return (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() => setPage(n)}
                                            className={[
                                                'rounded-md border px-3 py-2 font-semibold shadow-sm',
                                                isActive
                                                    ? 'border-beta-blue bg-beta-blue text-white'
                                                    : 'border-border bg-card text-muted-foreground hover:text-foreground',
                                            ].join(' ')}
                                        >
                                            {n}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

OpportunitiesIndex.layout = (page) => <AppLayout>{page}</AppLayout>;


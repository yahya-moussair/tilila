import React, { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import FiltersBar from '@/pages/experts/Partials/FiltersBar';
import ExpertCard from '@/pages/experts/Partials/ExpertCard';
import { useTranslation } from '@/contexts/TranslationContext';
import TransText from '@/components/TransText';

const AFRICA_COUNTRY_LABELS = new Set([
    'Senegal',
    'Kenya',
    'Nigeria',
    'Tunisia',
    'Egypt',
    "Côte d'Ivoire",
]);

export default function ExpertsIndex({ experts: expertsProp = [] }) {
    const { locale, t } = useTranslation();
    const [regionQuick, setRegionQuick] = useState('all');
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('relevance');
    const [view, setView] = useState('grid');
    const [filters, setFilters] = useState({
        industry: 'all',
        country: 'all',
        language: 'all',
        availability: 'all',
    });

    const filterLabels = useMemo(
        () => ({
            industry: {
                economics: t('experts.filters.economics'),
                technology: t('experts.filters.technology'),
                health: t('experts.filters.health'),
                legal: t('experts.filters.legal'),
            },
            country: {
                ma: t('experts.filters.morocco'),
                sn: t('experts.filters.senegal'),
            },
            language: {
                ar: t('experts.filters.arabic'),
                fr: t('experts.filters.french'),
                en: t('experts.filters.english'),
            },
            availability: {
                available: t('experts.filters.available'),
            },
        }),
        [t],
    );

    const activeFilters = useMemo(() => {
        const items = [];

        if (filters.industry !== 'all') {
            items.push({
                key: 'industry',
                label:
                    filterLabels.industry[filters.industry] ?? filters.industry,
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
                label:
                    filterLabels.language[filters.language] ?? filters.language,
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
        let list = expertsProp;

        if (filters.industry !== 'all') {
            list = list.filter((e) =>
                (e.industries ?? []).includes(filters.industry),
            );
        }

        if (filters.country !== 'all') {
            list = list.filter((e) => e.country === filters.country);
        }

        if (regionQuick === 'morocco') {
            list = list.filter(
                (e) =>
                    e.region_scope === 'morocco' || e.country === 'Morocco',
            );
        } else if (regionQuick === 'africa') {
            list = list.filter(
                (e) =>
                    e.region_scope === 'africa' ||
                    (e.country && AFRICA_COUNTRY_LABELS.has(e.country)),
            );
        } else if (regionQuick === 'diaspora') {
            list = list.filter((e) => e.region_scope === 'diaspora');
        }

        if (filters.language !== 'all') {
            list = list.filter((e) =>
                (e.languages ?? []).includes(filters.language),
            );
        }

        if (q) {
            const withScore = list
                .map((e, idx) => {
                    const nameEn = (e.name?.en ?? '').toLowerCase();
                    const nameFr = (e.name?.fr ?? '').toLowerCase();
                    const nameAr = (e.name?.ar ?? '').toLowerCase();
                    const title = (e.title?.en ?? '').toLowerCase();
                    const tags = (e.tags ?? [])
                        .map((x) => x.en)
                        .join(' ')
                        .toLowerCase();
                    const location = (e.location ?? '').toLowerCase();
                    const haystack = [
                        nameEn,
                        nameFr,
                        nameAr,
                        title,
                        tags,
                        location,
                    ].join(' ');

                    if (!haystack.includes(q)) return null;

                    let score = 0;
                    if (nameEn.startsWith(q)) score += 100;
                    if (nameEn.includes(q)) score += 50;
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
            list = [...list].sort((a, b) => {
                const aName =
                    locale === 'ar'
                        ? a.name?.ar
                        : locale === 'fr'
                          ? a.name?.fr
                          : a.name?.en;
                const bName =
                    locale === 'ar'
                        ? b.name?.ar
                        : locale === 'fr'
                          ? b.name?.fr
                          : b.name?.en;
                return (aName ?? '').localeCompare(bName ?? '');
            });
        } else if (sort === 'name_desc') {
            list = [...list].sort((a, b) => {
                const aName =
                    locale === 'ar'
                        ? a.name?.ar
                        : locale === 'fr'
                          ? a.name?.fr
                          : a.name?.en;
                const bName =
                    locale === 'ar'
                        ? b.name?.ar
                        : locale === 'fr'
                          ? b.name?.fr
                          : b.name?.en;
                return (bName ?? '').localeCompare(aName ?? '');
            });
        }

        return list;
    }, [
        filters.availability,
        filters.country,
        filters.industry,
        filters.language,
        locale,
        query,
        regionQuick,
        sort,
        expertsProp,
    ]);

    const countriesCount = useMemo(
        () =>
            new Set(
                (expertsProp ?? []).map((item) => item.country).filter(Boolean),
            ).size,
        [expertsProp],
    );

    return (
        <>
            <Head title={t('experts.headTitle')} />

            <div>
                <div className="bg-[radial-gradient(circle_at_top,#dff2ff_0%,#ffffff_50%,#f8fcff_100%)] py-12">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <header className="mx-auto max-w-3xl text-center">
                            <TransText
                                tag="h1"
                                className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
                                en="Find an Expert"
                                fr="Trouver une experte"
                                ar="اعثر على خبيرة"
                            />
                            <TransText
                                tag="p"
                                className="mt-3 text-sm leading-relaxed text-muted-foreground"
                                en="Discover and connect with leading women experts across Morocco and Africa."
                                fr="Découvrez et contactez des expertes de premier plan au Maroc et en Afrique."
                                ar="اكتشف وتواصل مع خبيرات رائدات في المغرب وإفريقيا."
                            />

                            <div className="mt-6 flex justify-center">
                                <Link
                                    href="/experts/become"
                                    className="inline-flex items-center rounded-full bg-beta-blue px-5 py-2.5 text-sm font-semibold text-twhite transition hover:bg-beta-blue/90"
                                >
                                    <TransText
                                        en="Become an Expert"
                                        fr="Devenir experte"
                                        ar="أصبحي خبيرة"
                                    />
                                </Link>
                            </div>
                        </header>

                        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3">
                            <div className="rounded-xl border border-border/70 bg-card/70 p-4 text-center shadow-sm">
                                <p className="text-2xl font-bold text-tblack">
                                    {expertsProp.length}
                                </p>
                                <p className="text-xs text-tgray">Experts</p>
                            </div>
                            <div className="rounded-xl border border-border/70 bg-card/70 p-4 text-center shadow-sm">
                                <p className="text-2xl font-bold text-tblack">
                                    {countriesCount}
                                </p>
                                <p className="text-xs text-tgray">Countries</p>
                            </div>
                            <div className="rounded-xl border border-border/70 bg-card/70 p-4 text-center shadow-sm">
                                <p className="text-2xl font-bold text-tblack">
                                    {activeFilters.length}
                                </p>
                                <p className="text-xs text-tgray">
                                    Active filters
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-twhite py-10">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-5xl">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    <TransText
                                        en="Directory"
                                        fr="Annuaire"
                                        ar="الدليل"
                                    />
                                </span>
                                {[
                                    {
                                        id: 'all',
                                        en: 'All',
                                        fr: 'Toutes',
                                        ar: 'الكل',
                                    },
                                    {
                                        id: 'morocco',
                                        en: 'Morocco',
                                        fr: 'Maroc',
                                        ar: 'المغرب',
                                    },
                                    {
                                        id: 'africa',
                                        en: 'Africa',
                                        fr: 'Afrique',
                                        ar: 'إفريقيا',
                                    },
                                    {
                                        id: 'diaspora',
                                        en: 'Diaspora',
                                        fr: 'Diaspora',
                                        ar: 'الشتات',
                                    },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() =>
                                            setRegionQuick(tab.id)
                                        }
                                        className={[
                                            'rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-border transition',
                                            regionQuick === tab.id
                                                ? 'bg-beta-blue text-white'
                                                : 'bg-card text-muted-foreground hover:text-foreground',
                                        ].join(' ')}
                                    >
                                        <TransText
                                            en={tab.en}
                                            fr={tab.fr}
                                            ar={tab.ar}
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-beta-blue">
                                <Link
                                    href="/experts/connect"
                                    className="hover:underline"
                                >
                                    Tilila Connect
                                </Link>
                                <Link href="/media" className="hover:underline">
                                    <TransText
                                        en="CPD Media"
                                        fr="Média CPD"
                                        ar="إعلام CPD"
                                    />
                                </Link>
                                <Link
                                    href="/events?view=calendar"
                                    className="hover:underline"
                                >
                                    <TransText
                                        en="Les Débats Tilila"
                                        fr="Les Débats Tilila"
                                        ar="نقاشات تيليلا"
                                    />
                                </Link>
                            </div>

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
                                    <span className="font-semibold">
                                        <TransText
                                            en={`${experts.length} results`}
                                            fr={`${experts.length} resultats`}
                                            ar={`${experts.length} نتيجة`}
                                        />
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    {activeFilters.length > 0 ? (
                                        activeFilters.map((item) => (
                                            <span
                                                key={item.key}
                                                className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground"
                                            >
                                                {item.label}
                                            </span>
                                        ))
                                    ) : (
                                        <span>
                                            <TransText
                                                en="None"
                                                fr="Aucun"
                                                ar="لا شيء"
                                            />
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-between text-sm">
                                <div className="text-muted-foreground">
                                    <TransText
                                        en={`Showing ${experts.length} experts`}
                                        fr={`Affichage de ${experts.length} expertes`}
                                        ar={`عرض ${experts.length} خبيرات`}
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                {experts.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-border/80 bg-card p-10 text-center">
                                        <p className="text-base font-semibold text-tblack">
                                            No experts match your filters.
                                        </p>
                                        <p className="mt-2 text-sm text-tgray">
                                            Try removing a filter or changing
                                            your search query.
                                        </p>
                                    </div>
                                ) : (
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
                                )}
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
                                <span className="px-2 text-muted-foreground">
                                    …
                                </span>
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
            </div>
        </>
    );
}

ExpertsIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

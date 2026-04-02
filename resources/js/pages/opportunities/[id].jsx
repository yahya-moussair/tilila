import React, { useMemo, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { OPPORTUNITIES } from '@/pages/opportunities/Partials/opportunities-data';
import { OPPORTUNITY_DETAILS } from '@/pages/opportunities/Partials/opportunity-details-data';
import InfoCard from '@/pages/opportunities/Partials/Details/InfoCard';
import Eligibility from '@/pages/opportunities/Partials/Details/Eligibility';
import DeadlineCard from '@/pages/opportunities/Partials/Details/DeadlineCard';
import HowToApply from '@/pages/opportunities/Partials/Details/HowToApply';
import { useTranslation } from '@/contexts/TranslationContext';
import TransText from '@/components/TransText';

function Pill({ children, variant = 'secondary' }) {
    const className =
        variant === 'primary'
            ? 'bg-alpha-blue text-beta-blue'
            : 'bg-secondary text-secondary-foreground';
    return (
        <span
            className={[
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-border',
                className,
            ].join(' ')}
        >
            {children}
        </span>
    );
}

export default function OpportunityDetails({ id }) {
    const { locale, t } = useTranslation();
    const pageProps = usePage().props;
    const opportunityId = id ?? pageProps?.id;

    const resolve = (value) =>
        locale === 'ar' ? value?.ar : locale === 'fr' ? value?.fr : value?.en;

    const base = useMemo(
        () => OPPORTUNITIES.find((x) => x.id === opportunityId) ?? OPPORTUNITIES[0],
        [opportunityId],
    );

    const details = useMemo(
        () =>
            OPPORTUNITY_DETAILS[opportunityId] ??
            OPPORTUNITY_DETAILS['women-media-leadership-program-2024'],
        [opportunityId],
    );

    const [saved, setSaved] = useState(false);

    return (
        <>
            <Head
                title={
                    resolve(details?.title) ??
                    resolve(base?.title) ??
                    t('opportunities.detail.fallbackHeadTitle')
                }
            />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Link href="/" className="hover:text-foreground hover:underline">
                            <TransText en="Home" fr="Accueil" ar="الرئيسية" />
                        </Link>
                        <span aria-hidden="true">›</span>
                        <Link
                            href="/opportunities"
                            className="hover:text-foreground hover:underline"
                        >
                            <TransText en="Opportunities" fr="Opportunités" ar="الفرص" />
                        </Link>
                        <span aria-hidden="true">›</span>
                        <span className="font-semibold text-foreground">
                            {resolve(details?.title) ?? resolve(base.title)}
                        </span>
                    </nav>

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <header className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                    {details?.badge ? (
                                        <Pill variant="primary">{resolve(details.badge)}</Pill>
                                    ) : null}
                                    <span className="text-muted-foreground">
                                        {resolve(details?.meta) ??
                                            `${t('opportunities.card.postedPrefix')} ${
                                                resolve(base.posted) ?? ''
                                            }`}
                                    </span>
                                </div>

                                <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                                            {resolve(details?.title) ?? resolve(base.title)}
                                        </h1>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {resolve(details?.description) ??
                                                resolve(base.excerpt)}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-md bg-beta-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                        >
                                            <TransText en="Apply Now" fr="Postuler" ar="قدّم الآن" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSaved((s) => !s)}
                                            className="inline-flex items-center justify-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {saved ? (
                                                <TransText en="Saved" fr="Enregistré" ar="تم الحفظ" />
                                            ) : (
                                                <TransText en="Save" fr="Enregistrer" ar="حفظ" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </header>

                            <div className="mt-6 space-y-6">
                                <InfoCard title={t('opportunities.detail.sections.descriptionTitle')}>
                                    <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                                        {(details?.descriptionLong ?? []).length ? (
                                            (details.descriptionLong ?? []).map((p) => (
                                                <p key={p.en}>
                                                    <TransText en={p.en} fr={p.fr} ar={p.ar} />
                                                </p>
                                            ))
                                        ) : (
                                            <p>
                                                <TransText
                                                    en={resolve(details?.description) ?? resolve(base.excerpt)}
                                                    fr={resolve(details?.description) ?? resolve(base.excerpt)}
                                                    ar={resolve(details?.description) ?? resolve(base.excerpt)}
                                                />
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-5">
                                        <div className="text-xs font-extrabold tracking-wide text-muted-foreground">
                                            <TransText
                                                en="Key Program Modules:"
                                                fr="Modules clés du programme :"
                                                ar="المحاور الأساسية للبرنامج:"
                                            />
                                        </div>
                                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                                            {(details?.programModules ?? []).map((m) => (
                                                <li key={m.en}>
                                                    <TransText en={m.en} fr={m.fr} ar={m.ar} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </InfoCard>

                                <Eligibility items={details?.eligibility ?? []} />
                                <DeadlineCard
                                    label={
                                        resolve(details?.deadline?.label) ??
                                        t('opportunities.detail.sections.deadlineTitle')
                                    }
                                    dateLabel={resolve(details?.deadline?.dateLabel) ?? t('common.na')}
                                />
                                <HowToApply steps={details?.howToApply ?? []} />
                            </div>
                        </div>

                        <div className="space-y-6 lg:col-span-4">
                            <InfoCard title={t('opportunities.detail.sections.organizerTitle')}>
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 h-10 w-10 rounded-xl bg-alpha-blue text-beta-blue ring-1 ring-border" />
                                    <div>
                                        <div className="text-sm font-extrabold text-foreground">
                                            {resolve(details?.organizer?.name) ??
                                                resolve(base.org)}
                                        </div>
                                        <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                            {resolve(details?.organizer?.blurb) ??
                                                t('opportunities.detail.organizerFallback')}
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-3 text-xs font-semibold text-beta-blue hover:underline"
                                        >
                                            <TransText en="View Profile →" fr="Voir le profil →" ar="عرض الملف →" />
                                        </button>
                                    </div>
                                </div>
                            </InfoCard>

                            <InfoCard title={t('opportunities.detail.sections.quickInfoTitle')}>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <div className="font-semibold text-muted-foreground">
                                            <TransText en="Location" fr="Lieu" ar="الموقع" />
                                        </div>
                                        <div className="mt-1 text-sm font-extrabold text-foreground">
                                            {resolve(details?.quickInfo?.location) ??
                                                resolve(base.location)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-muted-foreground">
                                            <TransText en="Duration" fr="Durée" ar="المدة" />
                                        </div>
                                        <div className="mt-1 text-sm font-extrabold text-foreground">
                                            {resolve(details?.quickInfo?.duration) ?? t('common.na')}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-muted-foreground">
                                            <TransText en="Language" fr="Langue" ar="اللغة" />
                                        </div>
                                        <div className="mt-1 text-sm font-extrabold text-foreground">
                                            {resolve(details?.quickInfo?.language) ?? t('common.na')}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-muted-foreground">
                                            <TransText en="Cost" fr="Coût" ar="التكلفة" />
                                        </div>
                                        <div className="mt-1 text-sm font-extrabold text-foreground">
                                            {resolve(details?.quickInfo?.cost) ?? t('common.na')}
                                        </div>
                                    </div>
                                </div>
                            </InfoCard>

                            <InfoCard title={t('opportunities.detail.sections.relatedThemesTitle')}>
                                <div className="flex flex-wrap gap-2">
                                    {(details?.relatedThemes ?? []).map((t) => (
                                        <Pill key={t.en}>
                                            <TransText en={t.en} fr={t.fr} ar={t.ar} />
                                        </Pill>
                                    ))}
                                </div>
                            </InfoCard>

                            <InfoCard title={t('opportunities.detail.sections.shareTitle')}>
                                <div className="flex flex-wrap gap-2">
                                    {['in', '𝕏', '⤴', '✉'].map((x) => (
                                        <button
                                            key={x}
                                            type="button"
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm hover:text-foreground"
                                            aria-label={t('opportunities.detail.shareAria')}
                                        >
                                            {x}
                                        </button>
                                    ))}
                                </div>
                            </InfoCard>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

OpportunityDetails.layout = (page) => <AppLayout>{page}</AppLayout>;


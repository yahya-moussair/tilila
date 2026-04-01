import React, { useMemo, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { OPPORTUNITIES } from '@/pages/opportunities/Partials/opportunities-data';
import { OPPORTUNITY_DETAILS } from '@/pages/opportunities/Partials/opportunity-details-data';
import InfoCard from '@/pages/opportunities/Partials/Details/InfoCard';
import Eligibility from '@/pages/opportunities/Partials/Details/Eligibility';
import DeadlineCard from '@/pages/opportunities/Partials/Details/DeadlineCard';
import HowToApply from '@/pages/opportunities/Partials/Details/HowToApply';

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
    const pageProps = usePage().props;
    const opportunityId = id ?? pageProps?.id;

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
            <Head title={details?.title ?? base?.title ?? 'Opportunity'} />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Link href="/" className="hover:text-foreground hover:underline">
                            Home
                        </Link>
                        <span aria-hidden="true">›</span>
                        <Link
                            href="/opportunities"
                            className="hover:text-foreground hover:underline"
                        >
                            Opportunities
                        </Link>
                        <span aria-hidden="true">›</span>
                        <span className="font-semibold text-foreground">
                            {details?.title ?? base.title}
                        </span>
                    </nav>

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <header className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                    {details?.badge ? (
                                        <Pill variant="primary">{details.badge}</Pill>
                                    ) : null}
                                    <span className="text-muted-foreground">
                                        {details?.meta ?? `Posted ${base.posted}`}
                                    </span>
                                </div>

                                <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                                            {details?.title ?? base.title}
                                        </h1>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {details?.description ?? base.excerpt}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-md bg-beta-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                        >
                                            Apply Now
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSaved((s) => !s)}
                                            className="inline-flex items-center justify-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {saved ? 'Saved' : 'Save'}
                                        </button>
                                    </div>
                                </div>
                            </header>

                            <div className="mt-6 space-y-6">
                                <InfoCard title="Description">
                                    <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                                        <p>
                                            The Women in Media Leadership Program is a flagship
                                            initiative by Tilila and its partners aimed at building
                                            the next generation of media leaders. This program
                                            offers a blended learning experience that combines
                                            practical mentorship, leadership coaching, and digital
                                            transformation modules.
                                        </p>
                                        <p>
                                            Through a cohort-driven program with expert seminars in
                                            Casablanca, guest mentorship from industry veterans,
                                            and project-based work, participants will develop a
                                            capstone project addressing a real-world challenge in
                                            their current organization or community.
                                        </p>
                                    </div>

                                    <div className="mt-5">
                                        <div className="text-xs font-extrabold tracking-wide text-muted-foreground">
                                            Key Program Modules:
                                        </div>
                                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                                            {(details?.programModules ?? []).map((m) => (
                                                <li key={m}>{m}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </InfoCard>

                                <Eligibility items={details?.eligibility ?? []} />
                                <DeadlineCard
                                    label={details?.deadline?.label ?? 'Application Deadline'}
                                    dateLabel={details?.deadline?.dateLabel ?? '—'}
                                />
                                <HowToApply steps={details?.howToApply ?? []} />
                            </div>
                        </div>

                        <div className="space-y-6 lg:col-span-4">
                            <InfoCard title="Organizer">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 h-10 w-10 rounded-xl bg-alpha-blue text-beta-blue ring-1 ring-border" />
                                    <div>
                                        <div className="text-sm font-extrabold text-foreground">
                                            {details?.organizer?.name ?? base.org}
                                        </div>
                                        <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                            {details?.organizer?.blurb ??
                                                'Organizer information will be added soon.'}
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-3 text-xs font-semibold text-beta-blue hover:underline"
                                        >
                                            View Profile →
                                        </button>
                                    </div>
                                </div>
                            </InfoCard>

                            <InfoCard title="Quick Info">
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <div className="font-semibold text-muted-foreground">
                                            Location
                                        </div>
                                        <div className="mt-1 text-sm font-extrabold text-foreground">
                                            {details?.quickInfo?.location ?? base.location}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-muted-foreground">
                                            Duration
                                        </div>
                                        <div className="mt-1 text-sm font-extrabold text-foreground">
                                            {details?.quickInfo?.duration ?? '—'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-muted-foreground">
                                            Language
                                        </div>
                                        <div className="mt-1 text-sm font-extrabold text-foreground">
                                            {details?.quickInfo?.language ?? '—'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-muted-foreground">
                                            Cost
                                        </div>
                                        <div className="mt-1 text-sm font-extrabold text-foreground">
                                            {details?.quickInfo?.cost ?? '—'}
                                        </div>
                                    </div>
                                </div>
                            </InfoCard>

                            <InfoCard title="Related Themes">
                                <div className="flex flex-wrap gap-2">
                                    {(details?.relatedThemes ?? []).map((t) => (
                                        <Pill key={t}>{t}</Pill>
                                    ))}
                                </div>
                            </InfoCard>

                            <InfoCard title="Share this opportunity">
                                <div className="flex flex-wrap gap-2">
                                    {['in', '𝕏', '⤴', '✉'].map((x) => (
                                        <button
                                            key={x}
                                            type="button"
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm hover:text-foreground"
                                            aria-label="Share"
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


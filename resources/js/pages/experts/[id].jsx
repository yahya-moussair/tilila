import React, { useMemo } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { EXPERTS } from '@/pages/experts/Partials/expert-data';
import { EXPERT_DETAILS } from '@/pages/experts/Partials/expert-details-data';
import ProfileSidebar from '@/pages/experts/Partials/Details/ProfileSidebar';
import AreasOfExpertise from '@/pages/experts/Partials/Details/AreasOfExpertise';
import ProfessionalJourney from '@/pages/experts/Partials/Details/ProfessionalJourney';
import PastAppearances from '@/pages/experts/Partials/Details/PastAppearances';
import RelatedContent from '@/pages/experts/Partials/Details/RelatedContent';

export default function ExpertDetails({ id }) {
    const pageProps = usePage().props;
    const expertId = id ?? pageProps?.id;

    const expert = useMemo(
        () => EXPERTS.find((e) => e.id === expertId) ?? EXPERTS[0],
        [expertId],
    );

    const details = useMemo(
        () => EXPERT_DETAILS[expertId] ?? EXPERT_DETAILS['amira-kone'],
        [expertId],
    );

    return (
        <>
            <Head title={expert?.name ?? 'Expert'} />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Link href="/" className="hover:text-foreground hover:underline">
                            Home
                        </Link>
                        <span aria-hidden="true">›</span>
                        <Link
                            href="/experts"
                            className="hover:text-foreground hover:underline"
                        >
                            Experts
                        </Link>
                        <span aria-hidden="true">›</span>
                        <span className="font-semibold text-foreground">
                            {expert.name}
                        </span>
                    </nav>

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <ProfileSidebar expert={expert} details={details} />
                        </div>

                        <div className="space-y-6 lg:col-span-8">
                            <header className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                                <div className="flex flex-wrap gap-2">
                                    {(details?.headlineTags ?? []).map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
                                    {expert.name}
                                </h1>
                                <p className="mt-2 text-sm font-semibold text-muted-foreground">
                                    AI Researcher &amp; Chief Strategy Officer at Agritech
                                    Solutions
                                </p>

                                <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                                    {(details?.bio ?? []).map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                </div>
                            </header>

                            <AreasOfExpertise items={details?.expertise ?? []} />
                            <ProfessionalJourney items={details?.journey ?? []} />
                            <PastAppearances items={details?.appearances ?? []} />
                            <RelatedContent items={details?.articles ?? []} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ExpertDetails.layout = (page) => <AppLayout>{page}</AppLayout>;


import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import GovernanceSidebar from '@/pages/gouvernance/Partials/GovernanceSidebar';
import PolicyCard from '@/pages/gouvernance/Partials/PolicyCard';
import CharterGrid from '@/pages/gouvernance/Partials/CharterGrid';
import SteeringCommittee from '@/pages/gouvernance/Partials/SteeringCommittee';
import JoinCta from '@/pages/gouvernance/Partials/JoinCta';
import {
    CHARTER_ARTICLES,
    GOVERNANCE_SECTIONS,
    POLICY_HIGHLIGHTS,
    STEERING_COMMITTEE,
} from '@/pages/gouvernance/Partials/gouvernance-data';

export default function GouvernanceIndex() {
    const sections = useMemo(() => GOVERNANCE_SECTIONS, []);
    const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? 'diversity');

    return (
        <>
            <Head title="Gouvernance" />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <header className="mx-auto max-w-4xl text-center">
                        <div className="text-xs font-extrabold uppercase tracking-wide text-beta-blue">
                            Institutional framework
                        </div>
                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Governance &amp; CPD
                            <span className="block text-beta-blue">Presentation</span>
                        </h1>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            Ensuring transparency, accountability, and a steadfast commitment to
                            diversity and inclusion within the media landscape.
                        </p>
                    </header>

                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-4 xl:col-span-3">
                            <GovernanceSidebar
                                sections={sections}
                                activeId={activeSectionId}
                                onSelect={setActiveSectionId}
                            />
                        </div>

                        <div className="space-y-8 lg:col-span-8 xl:col-span-9">
                            <div id="policy">
                                <PolicyCard
                                    title="Diversity & Inclusion Policy of 2M"
                                    subtitle="The Governance Charter for Parity and Diversity (CPD) establishes a clear framework to ensure equality, inclusion, and ethical media practices. It sets an ambitious roadmap with transparent reporting to shape a more balanced and representative media ecosystem."
                                    highlights={POLICY_HIGHLIGHTS}
                                    stat={{ value: '30%', label: 'Increase female expert presence in panels' }}
                                />
                            </div>

                            <CharterGrid
                                title="Governance Charter"
                                items={CHARTER_ARTICLES}
                            />

                            <SteeringCommittee
                                title="Steering Committee"
                                ctaLabel="View governance structure"
                                items={STEERING_COMMITTEE}
                            />

                            <JoinCta
                                title="Join Our Mission for Parity"
                                description="Whether you’re a journalist, expert, or partner organization, your voice matters. Help us strengthen inclusive governance and elevate diverse expertise across media."
                                primaryCta={{ label: 'Contact the committee', href: '#' }}
                                secondaryCta={{ label: 'Download policy', href: '#' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

GouvernanceIndex.layout = (page) => <AppLayout>{page}</AppLayout>;


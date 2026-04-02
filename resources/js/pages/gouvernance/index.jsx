import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import GovernanceSidebar from '@/pages/gouvernance/Partials/GovernanceSidebar';
import PolicyCard from '@/pages/gouvernance/Partials/PolicyCard';
import CharterGrid from '@/pages/gouvernance/Partials/CharterGrid';
import SteeringCommittee from '@/pages/gouvernance/Partials/SteeringCommittee';
import JoinCta from '@/pages/gouvernance/Partials/JoinCta';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import {
    CHARTER_ARTICLES,
    GOVERNANCE_SECTIONS,
    POLICY_HIGHLIGHTS,
    STEERING_COMMITTEE,
} from '@/pages/gouvernance/Partials/gouvernance-data';

export default function GouvernanceIndex() {
    const sections = useMemo(() => GOVERNANCE_SECTIONS, []);
    const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? 'diversity');
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('gouvernance.headTitle')} />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <header className="mx-auto max-w-4xl text-center">
                        <div className="text-xs font-extrabold uppercase tracking-wide text-beta-blue">
                            <TransText
                                en="Institutional framework"
                                fr="Cadre institutionnel"
                                ar="الإطار المؤسساتي"
                            />
                        </div>
                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            <TransText
                                en="Governance & CPD"
                                fr="Gouvernance & CPD"
                                ar="الحوكمة وCPD"
                            />
                            <span className="block text-beta-blue">
                                <TransText
                                    en="Presentation"
                                    fr="Présentation"
                                    ar="عرض"
                                />
                            </span>
                        </h1>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            <TransText
                                en="Ensuring transparency, accountability, and a steadfast commitment to diversity and inclusion within the media landscape."
                                fr="Assurer la transparence, la redevabilité et un engagement ferme en faveur de la diversité et de l’inclusion dans le paysage médiatique."
                                ar="ضمان الشفافية والمساءلة والالتزام الراسخ بالتنوع والشمول داخل المشهد الإعلامي."
                            />
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
                                    title={
                                        <TransText
                                            en="Diversity & Inclusion Policy of 2M"
                                            fr="Politique diversité & inclusion de 2M"
                                            ar="سياسة 2M للتنوع والشمول"
                                        />
                                    }
                                    subtitle={
                                        <TransText
                                            en="The Governance Charter for Parity and Diversity (CPD) establishes a clear framework to ensure equality, inclusion, and ethical media practices. It sets an ambitious roadmap with transparent reporting to shape a more balanced and representative media ecosystem."
                                            fr="La Charte de gouvernance pour la parité et la diversité (CPD) établit un cadre clair pour garantir l’égalité, l’inclusion et des pratiques médiatiques éthiques. Elle définit une feuille de route ambitieuse avec un reporting transparent pour construire un écosystème médiatique plus équilibré et représentatif."
                                            ar="يضع ميثاق الحوكمة للتكافؤ والتنوع (CPD) إطارًا واضحًا لضمان المساواة والشمول والممارسات الإعلامية الأخلاقية. كما يرسم خارطة طريق طموحة مع تقارير شفافة لبناء منظومة إعلامية أكثر توازنًا وتمثيلًا."
                                        />
                                    }
                                    highlights={POLICY_HIGHLIGHTS}
                                    stat={{
                                        value: '30%',
                                        label: (
                                            <TransText
                                                en="Increase female expert presence in panels"
                                                fr="Augmenter la présence des expertes dans les panels"
                                                ar="زيادة حضور الخبيرات في اللوحات الحوارية"
                                            />
                                        ),
                                    }}
                                />
                            </div>

                            <CharterGrid
                                title={
                                    <TransText
                                        en="Governance Charter"
                                        fr="Charte de gouvernance"
                                        ar="ميثاق الحوكمة"
                                    />
                                }
                                items={CHARTER_ARTICLES}
                            />

                            <SteeringCommittee
                                title={
                                    <TransText
                                        en="Steering Committee"
                                        fr="Comité de pilotage"
                                        ar="اللجنة التوجيهية"
                                    />
                                }
                                ctaLabel={
                                    <TransText
                                        en="View governance structure"
                                        fr="Voir la structure de gouvernance"
                                        ar="عرض هيكلة الحوكمة"
                                    />
                                }
                                items={STEERING_COMMITTEE}
                            />

                            <JoinCta
                                title={
                                    <TransText
                                        en="Join Our Mission for Parity"
                                        fr="Rejoignez notre mission pour la parité"
                                        ar="انضم إلى رسالتنا من أجل التكافؤ"
                                    />
                                }
                                description={
                                    <TransText
                                        en="Whether you’re a journalist, expert, or partner organization, your voice matters. Help us strengthen inclusive governance and elevate diverse expertise across media."
                                        fr="Que vous soyez journaliste, experte ou organisation partenaire, votre voix compte. Aidez-nous à renforcer une gouvernance inclusive et à valoriser des expertises diverses dans les médias."
                                        ar="سواء كنت صحفيًا أو خبيرًا أو منظمة شريكة، فصوتك مهم. ساعدنا على تعزيز حوكمة شاملة ورفع حضور الخبرات المتنوعة عبر الإعلام."
                                    />
                                }
                                primaryCta={{
                                    label: (
                                        <TransText
                                            en="Contact the committee"
                                            fr="Contacter le comité"
                                            ar="تواصل مع اللجنة"
                                        />
                                    ),
                                    href: '#',
                                }}
                                secondaryCta={{
                                    label: (
                                        <TransText
                                            en="Download policy"
                                            fr="Télécharger la politique"
                                            ar="تنزيل السياسة"
                                        />
                                    ),
                                    href: '#',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

GouvernanceIndex.layout = (page) => <AppLayout>{page}</AppLayout>;


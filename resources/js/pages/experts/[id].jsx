import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ProfileSidebar from '@/pages/experts/Partials/Details/ProfileSidebar';
import AreasOfExpertise from '@/pages/experts/Partials/Details/AreasOfExpertise';
import { useTranslation } from '@/contexts/TranslationContext';
import TransText from '@/components/TransText';
import { buildLanguageOptions } from '@/components/helpers/expert-form-options';

export default function ExpertDetails({ expert, details: detailsProp }) {
    const { locale, t } = useTranslation();
    const details = detailsProp ?? {};

    const resolvedName =
        locale === 'ar'
            ? expert?.name?.ar
            : locale === 'fr'
                ? expert?.name?.fr
                : expert?.name?.en;

    return (
        <>
            <Head
                title={resolvedName ?? t('experts.detail.fallbackHeadTitle')}
            />

            <div className="bg-[linear-gradient(180deg,#f8fcff_0%,#ffffff_22%,#ffffff_100%)]">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Link
                            href="/"
                            className="hover:text-foreground hover:underline"
                        >
                            {t('nav.home')}
                        </Link>
                        <span aria-hidden="true">›</span>
                        <Link
                            href="/experts"
                            className="hover:text-foreground hover:underline"
                        >
                            {t('nav.experts')}
                        </Link>
                        <span aria-hidden="true">›</span>
                        <span className="font-semibold text-foreground">
                            {resolvedName}
                        </span>
                    </nav>

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <ProfileSidebar expert={expert} details={details} />
                        </div>

                        <div className="space-y-6 lg:col-span-8">
                            <header className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
                                    <TransText
                                        {...expert?.name}
                                    />
                                </h1>
                                <p className="mt-2 text-sm font-semibold text-muted-foreground">
                                    <TransText
                                        {...expert?.title}
                                    />
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                    {(expert?.languages ?? []).map((languageCode) => (
                                        <span
                                            key={languageCode}
                                            className="rounded-full border border-border bg-background px-2.5 py-1 text-muted-foreground uppercase"
                                        >
                                            {buildLanguageOptions(locale).find(option => option.value === languageCode)?.label}
                                        </span>
                                    ))}
                                </div>
                            </header>

                            <AreasOfExpertise
                                items={details?.expertise ?? []}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ExpertDetails.layout = (page) => <AppLayout>{page}</AppLayout>;

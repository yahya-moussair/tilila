import React, { useMemo } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';
import { MEDIA_ITEMS } from '@/pages/user/media/mediaItems';

import SidebarNewsletter from '@/pages/user/media/partials/SidebarNewsletter';
import SidebarTrendingTopics from '@/pages/user/media/partials/SidebarTrendingTopics';
import SidebarExpertSpotlight from '@/pages/user/media/partials/SidebarExpertSpotlight';
import SidebarResources from '@/pages/user/media/partials/SidebarResources';
import MediaDetailsHero from '@/pages/user/media/partials/MediaDetailsHero';
import MediaShareRail from '@/pages/user/media/partials/MediaShareRail';
import MediaDetailsContent from '@/pages/user/media/partials/MediaDetailsContent';
import RelatedMedia from '@/pages/user/media/partials/RelatedMedia';

export default function MediaDetails() {
    const { t, locale } = useTranslation();
    const { id } = usePage().props;

    const item = useMemo(() => MEDIA_ITEMS.find((x) => x.id === id), [id]);

    return (
        <>
            <Head title={item ? item.title.en : t('media.headTitle')} />

            <div className="bg-background">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/media" className="text-sm font-semibold text-beta-blue hover:underline">
                            {t('media.actions.backToMedia') ?? '← Back to media'}
                        </Link>
                    </div>

                    {!item ? (
                        <div className="rounded-2xl border border-border bg-card p-6">
                            <h1 className="text-lg font-extrabold text-foreground">
                                {t('media.details.notFoundTitle') ?? 'Media not found'}
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {t('media.details.notFoundDescription') ??
                                    'The media item you are looking for does not exist (or was removed).'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <MediaDetailsHero item={item} locale={locale} />

                            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                                <div className="lg:col-span-1">
                                    <MediaShareRail />
                                </div>

                                <div className="lg:col-span-7">
                                    <MediaDetailsContent item={item} locale={locale} />
                                </div>

                                <div className="space-y-6 lg:col-span-4">
                                    <SidebarNewsletter />
                                    <SidebarTrendingTopics />
                                    <SidebarExpertSpotlight />
                                    <SidebarResources />
                                </div>
                            </div>

                            <RelatedMedia items={MEDIA_ITEMS} currentId={item.id} locale={locale} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

MediaDetails.layout = (page) => <AppLayout>{page}</AppLayout>;


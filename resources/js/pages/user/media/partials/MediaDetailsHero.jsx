import React from 'react';

import TransText from '@/components/TransText';

export default function MediaDetailsHero({ item, locale }) {
    const resolvedBadge =
        locale === 'ar' ? item.badge.ar : locale === 'fr' ? item.badge.fr : item.badge.en;

    return (
        <section className="relative overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border">
            <div className="relative">
                <img
                    src={item.imageSrc}
                    alt=""
                    className="h-[340px] w-full object-cover sm:h-[420px]"
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-tblack/85 via-tblack/30 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <div className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-[11px] font-extrabold text-foreground shadow-sm ring-1 ring-border backdrop-blur">
                    {resolvedBadge}
                </div>
                <h1 className="mt-3 max-w-3xl text-2xl font-extrabold leading-snug text-white sm:text-4xl">
                    <TransText en={item.title.en} fr={item.title.fr} ar={item.title.ar} />
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base">
                    <TransText en={item.excerpt.en} fr={item.excerpt.fr} ar={item.excerpt.ar} />
                </p>
            </div>
        </section>
    );
}


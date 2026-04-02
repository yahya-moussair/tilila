import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

export default function Highlights({ tropheeImageSrc, talkImageSrc }) {
    const highlights = [
        {
            enTag: 'Award',
            frTag: 'Prix',
            arTag: 'جائزة',
            enTitle: 'Trophée Tilila',
            frTitle: 'Trophée Tilila',
            arTitle: 'جائزة تيليلا',
            enDescription:
                'Celebrating remarkable women experts and their contributions across fields.',
            frDescription:
                'Célébrer des expertes remarquables et leurs contributions dans divers domaines.',
            arDescription:
                'الاحتفاء بخبيرات متميزات ومساهماتهن عبر مجالات متعددة.',
            enCta: 'Learn More',
            frCta: 'En savoir plus',
            arCta: 'اعرف المزيد',
            href: '#trophee',
            imageSrc: tropheeImageSrc,
        },
        {
            enTag: 'Upcoming Event',
            frTag: 'Événement à venir',
            arTag: 'فعالية قادمة',
            enTitle: 'TilTalk: Women in Tech',
            frTitle: 'TilTalk : Femmes dans la tech',
            arTitle: 'TilTalk: نساء في التكنولوجيا',
            enDescription:
                'Join our next dialogue highlighting women leaders shaping innovation.',
            frDescription:
                'Rejoignez notre prochain échange mettant en lumière des femmes leaders qui façonnent l’innovation.',
            arDescription:
                'انضم إلى حوارنا القادم لتسليط الضوء على قائدات يساهمن في تشكيل الابتكار.',
            enCta: 'Register Now',
            frCta: 'S’inscrire',
            arCta: 'سجّل الآن',
            href: '#tiltalk',
            imageSrc: talkImageSrc,
        },
    ];

    return (
        <section className="bg-background">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                            <TransText
                                en="Highlighting Excellence & Dialogue"
                                fr="Mettre en lumière l’excellence et le dialogue"
                                ar="إبراز التميز والحوار"
                            />
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            <TransText
                                en="Discover our key initiatives designed to promote diversity in media and foster meaningful conversations."
                                fr="Découvrez nos initiatives clés pour promouvoir la diversité dans les médias et encourager des échanges porteurs de sens."
                                ar="اكتشف مبادراتنا الأساسية المصممة لتعزيز التنوع في الإعلام وخلق حوارات ذات معنى."
                            />
                        </p>
                    </div>
                    <Link
                        href="#initiatives"
                        className="inline-flex w-fit items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                    >
                        <TransText en="View All Initiatives" fr="Voir toutes les initiatives" ar="عرض جميع المبادرات" />
                    </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {highlights.map((item) => (
                        <div
                            key={item.enTitle}
                            className="relative overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border"
                        >
                            <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-muted to-secondary">
                                {item.imageSrc ? (
                                    <img
                                        src={item.imageSrc}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                ) : null}
                                <div className="absolute inset-0 bg-gradient-to-br from-tblack/75 via-tblack/40 to-transparent" />
                                <div className="relative flex h-full w-full flex-col justify-end p-6">
                                    <div className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                                        <TransText en={item.enTag} fr={item.frTag} ar={item.arTag} />
                                    </div>
                                    <div className="mt-3 text-xl font-extrabold text-white">
                                        <TransText en={item.enTitle} fr={item.frTitle} ar={item.arTitle} />
                                    </div>
                                    <div className="mt-2 max-w-md text-sm text-white/85">
                                        <TransText en={item.enDescription} fr={item.frDescription} ar={item.arDescription} />
                                    </div>
                                    <div className="mt-5">
                                        <Link
                                            href={item.href}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline"
                                        >
                                            <TransText en={item.enCta} fr={item.frCta} ar={item.arCta} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

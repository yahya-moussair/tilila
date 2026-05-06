import React from 'react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import { HERO_ZONE_A } from '@/pages/home/Partials/hero-zone-a';

function pickLocalizedTriple(obj, locale) {
    return (
        (locale === 'ar' ? obj.ar : locale === 'fr' ? obj.fr : obj.en) ??
        obj.en ??
        ''
    );
}

export default function Hero() {
    const { locale } = useTranslation();
    const embedUrl = HERO_ZONE_A.videoEmbedUrl;

    return (
        <section className="relative overflow-hidden bg-background">
            <div className="relative mx-auto w-full max-w-[min(100%,1920px)] px-3 py-10 sm:px-5 sm:py-12 lg:px-10">
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_60px_-12px_rgba(15,23,42,0.12)] ring-1 ring-tblack/10">
                    <div className="grid gap-0 lg:grid-cols-2 lg:gap-px lg:bg-border">
                        <div className="relative bg-tblack lg:min-h-[min(22rem,50vh)]">
                            {embedUrl ? (
                                <iframe
                                    title={pickLocalizedTriple(
                                        HERO_ZONE_A.cardKicker,
                                        locale,
                                    )}
                                    src={embedUrl}
                                    className="absolute inset-0 h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            ) : (
                                <img
                                    src={HERO_ZONE_A.posterSrc}
                                    alt=""
                                    className="h-full min-h-[min(22rem,50vh)] w-full object-cover object-center"
                                    loading="eager"
                                />
                            )}
                        </div>

                        <div className="flex flex-col justify-center bg-background px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
                            <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
                                <TransText
                                    tag="p"
                                    className="text-[0.65rem] font-bold tracking-[0.2em] text-alpha-blue uppercase"
                                    {...HERO_ZONE_A.cardKicker}
                                />
                                <span className="text-muted-foreground/50" aria-hidden>
                                    ·
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-semibold text-foreground">
                                    <span
                                        className="size-1.5 rounded-full bg-beta-blue shadow-[0_0_8px_rgba(0,151,170,0.8)]"
                                        aria-hidden
                                    />
                                    <TransText {...HERO_ZONE_A.badge} />
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl lg:leading-tight xl:text-[2.75rem]">
                                <TransText {...HERO_ZONE_A.titleBefore} />{' '}
                                <TransText
                                    className="text-beta-blue"
                                    {...HERO_ZONE_A.titleAccent}
                                />
                            </h1>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base lg:text-lg">
                                <TransText {...HERO_ZONE_A.description} />
                            </p>
                            <p className="mt-2 max-w-xl text-xs text-muted-foreground sm:text-sm">
                                <TransText {...HERO_ZONE_A.cardLine} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

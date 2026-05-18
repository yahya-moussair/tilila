import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import { HERO_ZONE_A } from '@/pages/home/Partials/hero-zone-a';
import { HERO_CAROUSEL_SLIDES } from '@/pages/home/Partials/hero-carousel-data';

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
    const slides = HERO_CAROUSEL_SLIDES;
    const [activeIndex, setActiveIndex] = React.useState(0);
    const mediaMinHeightClass = 'min-h-[min(22rem,50vh)]';

    React.useEffect(() => {
        if (!Array.isArray(slides) || slides.length <= 1) return;

        const id = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 8000);

        return () => window.clearInterval(id);
    }, [slides?.length]);

    const safeIndex =
        typeof activeIndex === 'number' && slides.length
            ? ((activeIndex % slides.length) + slides.length) % slides.length
            : 0;

    const goPrev = () =>
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    const goNext = () => setActiveIndex((prev) => (prev + 1) % slides.length);

    return (
        <section className="relative overflow-hidden bg-background">
            <div className="relative mx-auto w-full max-w-[min(100%,1920px)] px-3 py-10 sm:px-5 sm:py-12 lg:px-10">
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_60px_-12px_rgba(15,23,42,0.12)] ring-1 ring-tblack/10">
                    <div
                        className={[
                            'relative grid gap-0 lg:grid-cols-2 lg:gap-px lg:bg-border',
                            mediaMinHeightClass,
                            'lg:min-h-[min(22rem,50vh)]',
                        ].join(' ')}
                    >
                        <div
                            className={[
                                'relative bg-tblack',
                                mediaMinHeightClass,
                                'lg:min-h-[min(22rem,50vh)]',
                            ].join(' ')}
                        >
                            <div className="absolute inset-0 overflow-hidden">
                                <div
                                    className="flex h-full w-full transition-transform duration-700 ease-out motion-reduce:transition-none"
                                    style={{
                                        transform: `translateX(-${safeIndex * 100}%)`,
                                    }}
                                >
                                    {slides.map((s, idx) => {
                                        const imageContain = Boolean(s?.imageContain);
                                        const tintClass = s?.imageTint ?? 'from-tblack/40';

                                        return (
                                            <div
                                                key={s.key ?? idx}
                                                className="relative h-full w-full shrink-0"
                                                aria-hidden={idx !== safeIndex}
                                            >
                                                {s?.key === 'home' && embedUrl ? (
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
                                                ) : s?.imageSrc ? (
                                                    <img
                                                        src={s.imageSrc}
                                                        alt={pickLocalizedTriple(
                                                            s.imageAlt ?? { en: '', fr: '', ar: '' },
                                                            locale,
                                                        )}
                                                        className={[
                                                            'absolute inset-0 h-full w-full',
                                                            imageContain
                                                                ? 'object-contain object-center'
                                                                : 'object-cover object-center',
                                                        ].join(' ')}
                                                        loading="eager"
                                                    />
                                                ) : (
                                                    <img
                                                        src={HERO_ZONE_A.posterSrc}
                                                        alt=""
                                                        className="absolute inset-0 h-full w-full object-cover object-center"
                                                        loading="eager"
                                                    />
                                                )}
                                                <div
                                                    className={[
                                                        'pointer-events-none absolute inset-0 bg-linear-to-br',
                                                        tintClass,
                                                        'via-transparent to-tblack/55',
                                                    ].join(' ')}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {slides.length > 1 ? (
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        {slides.map((s, idx) => (
                                            <button
                                                key={s.key ?? idx}
                                                type="button"
                                                onClick={() => setActiveIndex(idx)}
                                                className={[
                                                    'h-2.5 rounded-full ring-1 ring-white/35 transition-all',
                                                    idx === safeIndex
                                                        ? 'w-7 bg-white/90'
                                                        : 'w-2.5 bg-white/40 hover:bg-white/70',
                                                ].join(' ')}
                                                aria-label={`Go to slide ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={goPrev}
                                            className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
                                            aria-label="Previous slide"
                                        >
                                            ‹
                                        </button>
                                        <button
                                            type="button"
                                            onClick={goNext}
                                            className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
                                            aria-label="Next slide"
                                        >
                                            ›
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div
                            className={[
                                'flex flex-col justify-center bg-background px-5 py-10 sm:px-8 sm:py-12 lg:px-12',
                                mediaMinHeightClass,
                                'lg:min-h-[min(22rem,50vh)]',
                            ].join(' ')}
                        >
                            <div className="relative overflow-hidden">
                                <div
                                    className="flex w-full transition-transform duration-700 ease-out motion-reduce:transition-none"
                                    style={{
                                        transform: `translateX(-${safeIndex * 100}%)`,
                                    }}
                                >
                                    {slides.map((s, idx) => {
                                        const hasSecondary = Boolean(
                                            s?.secondaryCta && s?.secondaryHref,
                                        );

                                        return (
                                            <div
                                                key={s.key ?? idx}
                                                className="w-full shrink-0"
                                                aria-hidden={idx !== safeIndex}
                                            >
                                                <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
                                                    <TransText
                                                        tag="p"
                                                        className="text-[0.65rem] font-bold tracking-[0.2em] text-alpha-blue uppercase"
                                                        en={
                                                            s?.cardKicker?.en ??
                                                            HERO_ZONE_A.cardKicker.en
                                                        }
                                                        fr={
                                                            s?.cardKicker?.fr ??
                                                            HERO_ZONE_A.cardKicker.fr
                                                        }
                                                        ar={
                                                            s?.cardKicker?.ar ??
                                                            HERO_ZONE_A.cardKicker.ar
                                                        }
                                                    />
                                                    <span
                                                        className="text-muted-foreground/50"
                                                        aria-hidden
                                                    >
                                                        ·
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-semibold text-foreground">
                                                        <span
                                                            className="size-1.5 rounded-full bg-beta-blue shadow-[0_0_8px_rgba(0,151,170,0.8)]"
                                                            aria-hidden
                                                        />
                                                        <TransText
                                                            en={s?.badge?.en ?? HERO_ZONE_A.badge.en}
                                                            fr={s?.badge?.fr ?? HERO_ZONE_A.badge.fr}
                                                            ar={s?.badge?.ar ?? HERO_ZONE_A.badge.ar}
                                                        />
                                                    </span>
                                                </div>

                                                <h1 className="text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl lg:leading-tight xl:text-[2.75rem]">
                                                    <TransText
                                                        en={
                                                            s?.titleBefore?.en ??
                                                            HERO_ZONE_A.titleBefore.en
                                                        }
                                                        fr={
                                                            s?.titleBefore?.fr ??
                                                            HERO_ZONE_A.titleBefore.fr
                                                        }
                                                        ar={
                                                            s?.titleBefore?.ar ??
                                                            HERO_ZONE_A.titleBefore.ar
                                                        }
                                                    />{' '}
                                                    <TransText
                                                        className="text-beta-blue"
                                                        en={
                                                            s?.titleAccent?.en ??
                                                            HERO_ZONE_A.titleAccent.en
                                                        }
                                                        fr={
                                                            s?.titleAccent?.fr ??
                                                            HERO_ZONE_A.titleAccent.fr
                                                        }
                                                        ar={
                                                            s?.titleAccent?.ar ??
                                                            HERO_ZONE_A.titleAccent.ar
                                                        }
                                                    />
                                                </h1>
                                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base lg:text-lg">
                                                    <TransText
                                                        en={
                                                            s?.description?.en ??
                                                            HERO_ZONE_A.description.en
                                                        }
                                                        fr={
                                                            s?.description?.fr ??
                                                            HERO_ZONE_A.description.fr
                                                        }
                                                        ar={
                                                            s?.description?.ar ??
                                                            HERO_ZONE_A.description.ar
                                                        }
                                                    />
                                                </p>
                                                <p className="mt-2 max-w-xl text-xs text-muted-foreground sm:text-sm">
                                                    <TransText
                                                        en={s?.cardLine?.en ?? HERO_ZONE_A.cardLine.en}
                                                        fr={s?.cardLine?.fr ?? HERO_ZONE_A.cardLine.fr}
                                                        ar={s?.cardLine?.ar ?? HERO_ZONE_A.cardLine.ar}
                                                    />
                                                </p>

                                                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                                    {s?.primaryCta && s?.primaryHref ? (
                                                        <Link
                                                            href={s.primaryHref}
                                                            className="inline-flex w-full items-center justify-center rounded-xl bg-beta-blue px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-beta-blue/90 sm:w-auto"
                                                        >
                                                            <TransText
                                                                en={s.primaryCta.en}
                                                                fr={s.primaryCta.fr}
                                                                ar={s.primaryCta.ar}
                                                            />
                                                        </Link>
                                                    ) : null}
                                                    {hasSecondary ? (
                                                        <Link
                                                            href={s.secondaryHref}
                                                            className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground sm:w-auto"
                                                        >
                                                            <TransText
                                                                en={s.secondaryCta.en}
                                                                fr={s.secondaryCta.fr}
                                                                ar={s.secondaryCta.ar}
                                                            />
                                                        </Link>
                                                    ) : null}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

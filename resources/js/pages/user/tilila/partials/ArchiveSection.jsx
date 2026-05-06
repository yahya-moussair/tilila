import { GalleryHorizontal, Gavel, Trophy } from 'lucide-react';
import TransText from '@/components/TransText';
import { useEffect, useMemo, useRef, useState } from 'react';

function normalizeEdition(raw) {
    if (!raw) return null;
    return {
        id: raw.id ?? `${raw.year ?? ''}-${raw.sort ?? ''}`,
        year: String(raw.year ?? ''),
        edition_label: raw.edition_label ?? { en: '', fr: '', ar: '' },
        theme: raw.theme ?? { en: '', fr: '', ar: '' },
        winners_url:
            raw.winners_url ??
            (raw.id ? `/tilila/editions/${raw.id}/winners` : '/tilila'),
        jury_url:
            raw.jury_url ??
            (raw.id ? `/tilila/editions/${raw.id}/jury` : '/tilila'),
        gallery_url:
            raw.gallery_url ??
            (raw.id ? `/tilila/editions/${raw.id}/gallery` : '/tilila'),
        gallery_images: Array.isArray(raw.gallery_images)
            ? raw.gallery_images
            : [],
        has_gallery:
            Boolean(raw.has_gallery) ||
            (Array.isArray(raw.gallery_images) &&
                raw.gallery_images.length > 0),
    };
}

export default function ArchiveSection({ editions = [] }) {
    const rows = useMemo(() => {
        return Array.isArray(editions)
            ? editions.map(normalizeEdition).filter(Boolean)
            : [];
    }, [editions]);

    const trackRef = useRef(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const updateNavState = () => {
        const el = trackRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        const x = el.scrollLeft;
        setCanPrev(x > 4);
        setCanNext(x < max - 4);
    };

    useEffect(() => {
        updateNavState();
        const el = trackRef.current;
        if (!el) return;
        const onScroll = () => updateNavState();
        el.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateNavState, { passive: true });
        return () => {
            el.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateNavState);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows.length]);

    const scrollBySlides = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        const w = el.clientWidth;
        el.scrollBy({
            left: dir * Math.max(240, Math.floor(w * 0.92)),
            behavior: 'smooth',
        });
    };

    return (
        <section id="archive" className="mx-auto max-w-7xl px-4 pt-10 pb-12">
            <div className="text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-tblack sm:text-4xl">
                    <TransText
                        en="Archive of Editions"
                        fr="Archives des éditions"
                        ar="أرشيف الدورات"
                    />
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-tgray">
                    <TransText
                        en="Explore the history of the Trophée Tilila. Dive into past ceremonies, discover the illustrious jury members, and see the evolution of our mission."
                        fr="Explorez l’histoire du Trophée Tilila. Plongez dans les cérémonies passées, découvrez les membres du jury, et suivez l’évolution de notre mission."
                        ar="استكشف تاريخ جائزة تيليلا. تعرّف على الدورات السابقة، واكتشف أعضاء لجنة التحكيم، وتابع تطور رسالتنا."
                    />
                </p>
            </div>

            <div className="mt-10 rounded-2xl bg-background/60 p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-tblack">
                        <TransText
                            en="Editions"
                            fr="Éditions"
                            ar="الدورات"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => scrollBySlides(-1)}
                            disabled={!canPrev}
                            className={[
                                'inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary',
                                !canPrev
                                    ? 'cursor-not-allowed opacity-40'
                                    : '',
                            ].join(' ')}
                            aria-label="Previous editions"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollBySlides(1)}
                            disabled={!canNext}
                            className={[
                                'inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary',
                                !canNext
                                    ? 'cursor-not-allowed opacity-40'
                                    : '',
                            ].join(' ')}
                            aria-label="Next editions"
                        >
                            ›
                        </button>
                    </div>
                </div>

                <div className="relative mt-4">
                    <div
                        ref={trackRef}
                        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        aria-label="Tilila editions carousel"
                    >
                        {rows.map((edition) => (
                            <div
                                key={edition.id}
                                className="w-[88%] shrink-0 snap-start sm:w-[70%] md:w-[48%] lg:w-[32%]"
                            >
                                <div className="flex h-full flex-col gap-4 rounded-2xl bg-beta-white px-4 py-6 sm:px-6">
                                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
                                        <div className="text-3xl font-semibold tracking-tight text-tblack/10 sm:text-5xl">
                                            {edition.year}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-lg font-semibold text-tblack">
                                                <TransText
                                                    en={edition.edition_label?.en ?? ''}
                                                    fr={edition.edition_label?.fr ?? ''}
                                                    ar={edition.edition_label?.ar ?? ''}
                                                />
                                            </div>
                                            <div className="text-sm text-tgray">
                                                <TransText
                                                    en={`Theme: “${edition.theme?.en ?? ''}”`}
                                                    fr={`Thème : « ${edition.theme?.fr ?? ''} »`}
                                                    ar={`الموضوع: « ${edition.theme?.ar ?? ''} »`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex flex-wrap items-center gap-3">
                                        <a
                                            href={edition.winners_url || '/tilila'}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary sm:w-auto"
                                        >
                                            <Trophy className="size-4 text-tgray" />
                                            <TransText
                                                en="Winners"
                                                fr="Lauréats"
                                                ar="الفائزون"
                                            />
                                        </a>
                                        <a
                                            href={edition.jury_url || '/tilila'}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary sm:w-auto"
                                        >
                                            <Gavel className="size-4 text-tgray" />
                                            <TransText
                                                en="Jury"
                                                fr="Jury"
                                                ar="لجنة التحكيم"
                                            />
                                        </a>
                                        {edition.has_gallery ? (
                                            <a
                                                href={edition.gallery_url || '/tilila'}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary sm:w-auto"
                                            >
                                                <GalleryHorizontal className="size-4 text-tgray" />
                                                <TransText
                                                    en="Gallery"
                                                    fr="Galerie"
                                                    ar="المعرض"
                                                />
                                            </a>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center">
                    <a
                        href="/tilila"
                        className="text-sm font-semibold text-beta-blue hover:opacity-80"
                    >
                        <TransText
                            en="View older editions"
                            fr="Voir les éditions précédentes"
                            ar="عرض الدورات الأقدم"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const winners = [
    {
        year: '2022 Winner',
        title: 'Equal Voices',
        description:
            'A campaign exploring gender bias in media and proposing inclusive storytelling tools.',
        imageUrl:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    },
    {
        year: '2021 Winner',
        title: 'Breaking the Mold',
        description:
            'A visual identity and content kit challenging stereotypes in product advertising.',
        imageUrl:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    },
    {
        year: '2020 Winner',
        title: 'Faces of Morocco',
        description:
            'A documentary-style creative concept celebrating diversity of voices and professions.',
        imageUrl:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    },
    {
        year: '2020 Winner',
        title: 'Faces of Morocco',
        description:
            'A documentary-style creative concept celebrating diversity of voices and professions.',
        imageUrl:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    },
];

export default function PastWinnersSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);

    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.matchMedia('(min-width: 1024px)').matches) {
                setCardsPerView(3);
                return;
            }

            if (window.matchMedia('(min-width: 640px)').matches) {
                setCardsPerView(2);
                return;
            }

            setCardsPerView(1);
        };

        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    const totalWinners = winners.length;
    const safeCardsPerView =
        totalWinners === 0 ? 1 : Math.min(cardsPerView, totalWinners);
    const canNavigate = totalWinners > safeCardsPerView;

    const visibleWinners = useMemo(() => {
        if (totalWinners === 0) return [];

        return Array.from({ length: safeCardsPerView }, (_, offset) => {
            const winnerIndex = (activeIndex + offset) % totalWinners;
            return { ...winners[winnerIndex], _carouselIndex: winnerIndex };
        });
    }, [activeIndex, safeCardsPerView, totalWinners]);

    const goPrevious = () => {
        if (!canNavigate) return;
        setActiveIndex(
            (currentIndex) => (currentIndex - 1 + totalWinners) % totalWinners,
        );
    };

    const goNext = () => {
        if (!canNavigate) return;
        setActiveIndex((currentIndex) => (currentIndex + 1) % totalWinners);
    };

    return (
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="text-xs font-semibold tracking-widest text-tgray">
                        PAST WINNERS
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-tblack">
                        Past Winners
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-tgray">
                        Discover the inspiring projects that have shaped
                        previous editions of Tililab.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={goPrevious}
                        disabled={!canNavigate}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-tgray transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Previous winners"
                    >
                        <ArrowLeft className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        disabled={!canNavigate}
                        className="inline-flex size-10 items-center justify-center rounded-full bg-beta-blue text-twhite transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Next winners"
                    >
                        <ArrowRight className="size-4" />
                    </button>
                </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleWinners.map((winner) => (
                    <article
                        key={`${winner.year}-${winner._carouselIndex}`}
                        className="overflow-hidden rounded-2xl border border-border bg-background"
                    >
                        <div className="relative">
                            <img
                                src={winner.imageUrl}
                                alt={winner.title}
                                className="aspect-4/3 w-full object-cover"
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                            />
                            <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-semibold text-tblack">
                                {winner.year}
                            </span>
                        </div>

                        <div className="p-5">
                            <h3 className="text-sm font-semibold text-tblack">
                                {winner.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-tgray">
                                {winner.description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}


import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';

const winners = [
    {
        year: '2022',
        enYearLabel: '2022 Winner',
        frYearLabel: 'Lauréat 2022',
        arYearLabel: 'فائز 2022',
        enTitle: 'Equal Voices',
        frTitle: 'Voix égales',
        arTitle: 'أصوات متساوية',
        enDescription:
            'A campaign exploring gender bias in media and proposing inclusive storytelling tools.',
        frDescription:
            'Une campagne explorant les biais de genre dans les médias et proposant des outils de narration inclusive.',
        arDescription:
            'حملة تستكشف التحيز القائم على النوع في الإعلام وتقترح أدوات لسردٍ شامل.',
        imageUrl:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    },
    {
        year: '2021',
        enYearLabel: '2021 Winner',
        frYearLabel: 'Lauréat 2021',
        arYearLabel: 'فائز 2021',
        enTitle: 'Breaking the Mold',
        frTitle: 'Briser les codes',
        arTitle: 'كسر القوالب',
        enDescription:
            'A visual identity and content kit challenging stereotypes in product advertising.',
        frDescription:
            'Une identité visuelle et un kit de contenus qui remettent en question les stéréotypes dans la publicité produit.',
        arDescription:
            'هوية بصرية وحزمة محتوى تتحدى الصور النمطية في إعلانات المنتجات.',
        imageUrl:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    },
    {
        year: '2020',
        enYearLabel: '2020 Winner',
        frYearLabel: 'Lauréat 2020',
        arYearLabel: 'فائز 2020',
        enTitle: 'Faces of Morocco',
        frTitle: 'Visages du Maroc',
        arTitle: 'وجوه المغرب',
        enDescription:
            'A documentary-style creative concept celebrating diversity of voices and professions.',
        frDescription:
            'Un concept créatif de style documentaire célébrant la diversité des voix et des métiers.',
        arDescription:
            'تصور إبداعي بأسلوب وثائقي يحتفي بتنوع الأصوات والمهن.',
        imageUrl:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    },
    {
        year: '2019',
        enYearLabel: '2019 Winner',
        frYearLabel: 'Lauréat 2019',
        arYearLabel: 'فائز 2019',
        enTitle: 'New Horizons',
        frTitle: 'Nouveaux horizons',
        arTitle: 'آفاق جديدة',
        enDescription:
            'A concept reframing gender roles through everyday stories and visuals.',
        frDescription:
            'Un concept qui recompose les rôles de genre à travers des récits et des visuels du quotidien.',
        arDescription:
            'تصور يعيد صياغة أدوار النوع من خلال قصص وصور يومية.',
        imageUrl:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    },
];

export default function PastWinnersSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const { locale, t } = useTranslation();

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
                        <TransText en="PAST WINNERS" fr="LAURÉATS PRÉCÉDENTS" ar="الفائزون السابقون" />
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-tblack">
                        <TransText en="Past Winners" fr="Lauréats précédents" ar="الفائزون السابقون" />
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-tgray">
                        <TransText
                            en="Discover the inspiring projects that have shaped previous editions of Tililab."
                            fr="Découvrez les projets inspirants qui ont marqué les éditions précédentes de Tililab."
                            ar="اكتشف المشاريع الملهمة التي شكّلت الدورات السابقة من تيليلاب."
                        />
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={goPrevious}
                        disabled={!canNavigate}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-tgray transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={t('tililab.pastWinners.prevAria')}
                    >
                        <ArrowLeft className="size-4" />
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        disabled={!canNavigate}
                        className="inline-flex size-10 items-center justify-center rounded-full bg-beta-blue text-twhite transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={t('tililab.pastWinners.nextAria')}
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
                                alt={
                                    locale === 'ar'
                                        ? winner.arTitle
                                        : locale === 'fr'
                                          ? winner.frTitle
                                          : winner.enTitle
                                }
                                className="aspect-4/3 w-full object-cover"
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                            />
                            <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-semibold text-tblack">
                                <TransText
                                    en={winner.enYearLabel}
                                    fr={winner.frYearLabel}
                                    ar={winner.arYearLabel}
                                />
                            </span>
                        </div>

                        <div className="p-5">
                            <h3 className="text-sm font-semibold text-tblack">
                                <TransText en={winner.enTitle} fr={winner.frTitle} ar={winner.arTitle} />
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-tgray">
                                <TransText
                                    en={winner.enDescription}
                                    fr={winner.frDescription}
                                    ar={winner.arDescription}
                                />
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}


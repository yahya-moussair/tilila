import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';

function cardAccent(type) {
    switch (type) {
        case 'event':
            return 'border-l-beta-blue bg-beta-blue/5';
        case 'press_release':
            return 'border-l-muted-foreground bg-muted/40';
        case 'expert_spotlight':
            return 'border-l-beta-purple bg-beta-purple/5';
        case 'partner_initiative':
            return 'border-l-alpha-green bg-beta-green/5';
        default:
            return 'border-l-border bg-card';
    }
}

function TypeLabel({ type }) {
    switch (type) {
        case 'event':
            return (
                <TransText en="Event" fr="Événement" ar="فعالية" tag="span" />
            );
        case 'press_release':
            return (
                <TransText
                    en="Press release"
                    fr="Communiqué"
                    ar="بيان صحفي"
                    tag="span"
                />
            );
        case 'expert_spotlight':
            return (
                <TransText
                    en="Expert spotlight"
                    fr="Experte à la une"
                    ar="خبيرة في الواجهة"
                    tag="span"
                />
            );
        case 'partner_initiative':
            return (
                <TransText
                    en="Partner initiative"
                    fr="Initiative partenaire"
                    ar="مبادرة شريك"
                    tag="span"
                />
            );
        default:
            return <span>{type}</span>;
    }
}

function formatNewsDate(iso, locale) {
    if (!iso || typeof iso !== 'string') return '';
    const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
    if (!y || !m || !d) return iso;
    const date = new Date(Date.UTC(y, m - 1, d));
    const tag =
        locale === 'ar' ? 'ar' : locale === 'fr' ? 'fr-FR' : 'en-US';
    try {
        return date.toLocaleDateString(tag, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
        });
    } catch {
        return iso;
    }
}

export default function HomeNews({ items = [] }) {
    const { locale } = useTranslation();
    const list = (items ?? []).slice(0, 3);

    if (list.length === 0) {
        return null;
    }

    return (
        <section className="border-y border-border bg-muted/30">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                        <TransText
                            en="News"
                            fr="Actualités"
                            ar="أخبار"
                        />
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        <TransText
                            en="Up to three featured stories from the CMS."
                            fr="Jusqu’à trois contenus mis en avant (CMS)."
                            ar="حتى ثلاثة محتويات مميزة من نظام الإدارة."
                        />
                    </p>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {list.map((card, idx) => (
                        <Link
                            key={`${card.highlight_date}-${idx}`}
                            href={card.link_url}
                            className={[
                                'group flex flex-col rounded-2xl border border-border border-l-4 bg-card p-5 text-start shadow-sm ring-1 ring-border/60 transition hover:-translate-y-0.5 hover:shadow-md',
                                cardAccent(card.card_type),
                            ].join(' ')}
                        >
                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                <TypeLabel type={card.card_type} />
                                <span aria-hidden>·</span>
                                <time dateTime={card.highlight_date}>
                                    {formatNewsDate(
                                        card.highlight_date,
                                        locale,
                                    )}
                                </time>
                            </div>
                            <h3 className="mt-3 text-base font-bold text-foreground group-hover:text-beta-blue">
                                <TransText
                                    en={card.title?.en}
                                    fr={card.title?.fr}
                                    ar={card.title?.ar}
                                />
                            </h3>
                            <span className="mt-4 inline-flex text-sm font-semibold text-beta-blue">
                                <TransText
                                    en="Read more"
                                    fr="Lire la suite"
                                    ar="اقرأ المزيد"
                                />
                                <span className="ms-1 rtl:rotate-180">→</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

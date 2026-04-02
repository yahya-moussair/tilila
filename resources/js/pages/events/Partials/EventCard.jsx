import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from '@/contexts/TranslationContext';
import TransText from '@/components/TransText';

function formatDateLabel(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
}

function monthShort(iso) {
    try {
        return new Date(iso).toLocaleDateString(undefined, { month: 'short' });
    } catch {
        return '';
    }
}

function day2(iso) {
    try {
        return new Date(iso).toLocaleDateString(undefined, { day: '2-digit' });
    } catch {
        return '';
    }
}

function Badge({ children, tone = 'blue' }) {
    const cls =
        tone === 'green'
            ? 'bg-beta-green text-alpha-green'
            : tone === 'muted'
              ? 'bg-secondary text-secondary-foreground'
              : 'bg-alpha-blue text-beta-blue';

    return (
        <span
            className={[
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-border',
                cls,
            ].join(' ')}
        >
            {children}
        </span>
    );
}

function CtaButton({ cta }) {
    const { locale, t } = useTranslation();
    const label =
        locale === 'ar'
            ? cta?.label?.ar
            : locale === 'fr'
              ? cta?.label?.fr
              : cta?.label?.en ?? t('events.actions.view');
    const href = cta?.href ?? '#';
    const kind = cta?.kind ?? 'secondary';

    const cls =
        kind === 'primary'
            ? 'bg-beta-blue text-white hover:opacity-90'
            : kind === 'ghost'
              ? 'bg-background text-beta-blue hover:bg-secondary'
              : kind === 'muted'
                ? 'bg-secondary text-secondary-foreground hover:opacity-90'
                : 'bg-background text-foreground hover:bg-secondary';

    return (
        <Link
            href={href}
            className={[
                'inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-semibold shadow-sm ring-1 ring-border',
                cls,
            ].join(' ')}
        >
            {label}
        </Link>
    );
}

export default function EventCard({ event, activeTab }) {
    const { locale, t } = useTranslation();
    const dateLabel = useMemo(() => formatDateLabel(event?.dateIso ?? ''), [event]);
    const leftMonth = useMemo(() => monthShort(event?.dateIso ?? ''), [event]);
    const leftDay = useMemo(() => day2(event?.dateIso ?? ''), [event]);

    const isFeatured = Boolean(event?.imageSrc);
    const showLeftDate = !isFeatured;

    const subtitle = [
        locale === 'ar'
            ? event?.location?.ar
            : locale === 'fr'
              ? event?.location?.fr
              : event?.location?.en,
        event?.isOnline ? t('events.labels.andOnline') : null,
    ].filter(Boolean);

    return (
        <article className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-12">
                {isFeatured ? (
                    <div className="md:col-span-5">
                        <div className="relative h-full min-h-44 bg-muted md:min-h-full">
                            <img
                                src={event.imageSrc}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-tblack/60 via-tblack/15 to-transparent" />
                            <div className="absolute left-4 top-4">
                                <Badge tone="blue">
                                    {locale === 'ar'
                                        ? event?.badge?.ar
                                        : locale === 'fr'
                                          ? event?.badge?.fr
                                          : event?.badge?.en ?? t('events.labels.event')}
                                </Badge>
                            </div>
                        </div>
                    </div>
                ) : null}

                <div
                    className={[
                        isFeatured ? 'md:col-span-7' : 'md:col-span-12',
                        'p-5 sm:p-6',
                    ].join(' ')}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                {!isFeatured && event?.badge ? (
                                    <Badge tone={activeTab === 'past' ? 'muted' : 'blue'}>
                                        {locale === 'ar'
                                            ? event.badge.ar
                                            : locale === 'fr'
                                              ? event.badge.fr
                                              : event.badge.en}
                                    </Badge>
                                ) : null}
                                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                                    <span className="inline-flex items-center gap-1">
                                        <span aria-hidden="true">🗓</span>
                                        {dateLabel}
                                    </span>
                                    {event?.startTime ? (
                                        <span className="inline-flex items-center gap-1">
                                            <span aria-hidden="true">⏱</span>
                                            {event.startTime}
                                            {event?.endTime ? ` – ${event.endTime}` : null}{' '}
                                            {event?.tzLabel ? `(${event.tzLabel})` : null}
                                        </span>
                                    ) : null}
                                </div>
                            </div>

                            <h3 className="mt-3 text-base font-extrabold text-foreground sm:text-lg">
                                <TransText en={event?.title?.en} fr={event?.title?.fr} ar={event?.title?.ar} />
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                <TransText
                                    en={event?.excerpt?.en}
                                    fr={event?.excerpt?.fr}
                                    ar={event?.excerpt?.ar}
                                />
                            </p>
                        </div>

                        {showLeftDate ? (
                            <div className="hidden shrink-0 text-center md:block">
                                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    {leftMonth}
                                </div>
                                <div className="mt-1 text-2xl font-extrabold text-foreground">
                                    {leftDay}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs font-semibold text-muted-foreground">
                            {subtitle.join(' • ')}
                        </div>
                        <div className="flex items-center gap-2">
                            {event?.categoryLabel ? (
                                <Badge tone="muted">
                                    {locale === 'ar'
                                        ? event.categoryLabel.ar
                                        : locale === 'fr'
                                          ? event.categoryLabel.fr
                                          : event.categoryLabel.en}
                                </Badge>
                            ) : null}
                            <CtaButton cta={event?.cta} />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}


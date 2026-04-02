import React from 'react';

import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';

export default function SidebarExpertSpotlight() {
    const { locale, t } = useTranslation();

    const expert = {
        name: {
            en: 'Fatima Zahra El Idrissi',
            fr: 'Fatima Zahra El Idrissi',
            ar: 'فاطمة الزهراء الإدريسي',
        },
        title: {
            en: 'Environmental Scientist',
            fr: 'Scientifique de l’environnement',
            ar: 'عالِمة بيئة',
        },
        location: {
            en: 'Marrakesh, MA',
            fr: 'Marrakech, MA',
            ar: 'مراكش، المغرب',
        },
    };

    const resolvedName =
        locale === 'ar' ? expert.name.ar : locale === 'fr' ? expert.name.fr : expert.name.en;
    const resolvedLocation =
        locale === 'ar'
            ? expert.location.ar
            : locale === 'fr'
              ? expert.location.fr
              : expert.location.en;

    return (
        <aside className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                    <TransText en="Expert spotlight" fr="Experte à la une" ar="خبيرة مميزة" />
                </div>
                <button type="button" className="text-xs font-semibold text-beta-blue hover:underline">
                    {t('media.actions.viewAllExperts')}
                </button>
            </div>

            <div className="mt-4 rounded-xl bg-background p-4 ring-1 ring-border">
                <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-muted-foreground ring-1 ring-border">
                        <span aria-hidden="true">👤</span>
                    </div>
                    <div className="min-w-0">
                        <div className="truncate text-sm font-extrabold text-foreground">
                            {resolvedName}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                            <TransText en={expert.title.en} fr={expert.title.fr} ar={expert.title.ar} />
                            {' • '}
                            {resolvedLocation}
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-beta-blue px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                >
                    <TransText en="Consult Profile" fr="Consulter le profil" ar="عرض الملف" />
                </button>
            </div>
        </aside>
    );
}


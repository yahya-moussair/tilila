import React from 'react';
import InfoCard from '@/pages/opportunities/Partials/Details/InfoCard';
import { useTranslation } from '@/contexts/TranslationContext';
import TransText from '@/components/TransText';

export default function Eligibility({ items = [] }) {
    const { t } = useTranslation();

    return (
        <InfoCard title={t('opportunities.detail.sections.eligibilityTitle')}>
            <ul className="space-y-3 text-sm text-muted-foreground">
                {items.map((x) => (
                    <li key={x.en} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-beta-green text-alpha-green ring-1 ring-border">
                            ✓
                        </span>
                        <span className="leading-relaxed">
                            <TransText en={x.en} fr={x.fr} ar={x.ar} />
                        </span>
                    </li>
                ))}
            </ul>
        </InfoCard>
    );
}


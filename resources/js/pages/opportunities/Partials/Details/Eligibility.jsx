import React from 'react';
import InfoCard from '@/pages/opportunities/Partials/Details/InfoCard';
import { useTranslation } from '@/contexts/TranslationContext';

export default function Eligibility({ items = [] }) {
    const { t } = useTranslation();

    return (
        <InfoCard title={t('opportunities.detail.sections.eligibilityTitle')}>
            <ul className="space-y-3 text-sm text-muted-foreground">
                {items.map((x) => (
                    <li key={x} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-beta-green text-alpha-green ring-1 ring-border">
                            ✓
                        </span>
                        <span className="leading-relaxed">{x}</span>
                    </li>
                ))}
            </ul>
        </InfoCard>
    );
}


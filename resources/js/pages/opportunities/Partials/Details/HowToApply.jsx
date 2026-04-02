import React from 'react';
import InfoCard from '@/pages/opportunities/Partials/Details/InfoCard';
import { useTranslation } from '@/contexts/TranslationContext';

export default function HowToApply({ steps = [] }) {
    const { t } = useTranslation();

    return (
        <InfoCard title={t('opportunities.detail.sections.howToApplyTitle')}>
            <div className="space-y-4">
                {steps.map((s) => (
                    <div key={s.step} className="flex gap-3">
                        <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-beta-blue text-sm font-extrabold text-white">
                            {s.step}
                        </div>
                        <div>
                            <div className="text-sm font-extrabold text-foreground">
                                {s.title}
                            </div>
                            <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                {s.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </InfoCard>
    );
}


import React from 'react';

import TransText from '@/components/TransText';

function TabButton({ isActive, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isActive}
            className={[
                'rounded-full px-4 py-2 text-xs font-semibold ring-1 transition',
                isActive
                    ? 'bg-beta-blue text-white ring-beta-blue/30'
                    : 'bg-card text-muted-foreground ring-border hover:text-foreground',
            ].join(' ')}
        >
            {children}
        </button>
    );
}

export default function MediaTabs({ tabs = [], activeTabId, setActiveTabId }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
                const isActive = tab.id === activeTabId;

                const label =
                    tab.id === 'all' ? (
                        <TransText en="All Media" fr="Tous les médias" ar="كل المحتوى" />
                    ) : tab.id === 'interviews' ? (
                        <TransText en="Interviews" fr="Interviews" ar="مقابلات" />
                    ) : tab.id === 'tililaReplay' ? (
                        <TransText en="Tilila Replay" fr="Replay Tilila" ar="إعادة تيليلا" />
                    ) : tab.id === 'impactReports' ? (
                        <TransText en="Impact Reports" fr="Rapports d’impact" ar="تقارير الأثر" />
                    ) : tab.id === 'diversityInsights' ? (
                        <TransText en="Diversity Insights" fr="Insights diversité" ar="رؤى التنوع" />
                    ) : (
                        <TransText en="Expert Profiles" fr="Profils d’expertes" ar="ملفات الخبيرات" />
                    );

                return (
                    <TabButton
                        key={tab.id}
                        isActive={isActive}
                        onClick={() => setActiveTabId(tab.id)}
                    >
                        {label}
                    </TabButton>
                );
            })}
        </div>
    );
}


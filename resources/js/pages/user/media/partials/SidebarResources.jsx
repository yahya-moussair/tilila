import React from 'react';

import TransText from '@/components/TransText';

const RESOURCES = [
    {
        en: 'Media kit (PDF)',
        fr: 'Kit média (PDF)',
        ar: 'حقيبة الإعلام (PDF)',
    },
    {
        en: 'Tilila charter',
        fr: 'Charte Tilila',
        ar: 'ميثاق تيليلا',
    },
    {
        en: 'Press contacts',
        fr: 'Contacts presse',
        ar: 'جهات اتصال الصحافة',
    },
];

export default function SidebarResources() {
    return (
        <aside className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                <TransText en="Resources" fr="Ressources" ar="الموارد" />
            </div>

            <div className="mt-4 space-y-2">
                {RESOURCES.map((r) => (
                    <button
                        key={r.en}
                        type="button"
                        className="block w-full rounded-lg bg-background px-4 py-3 text-left text-sm font-semibold text-beta-blue ring-1 ring-border hover:bg-secondary"
                    >
                        <TransText en={r.en} fr={r.fr} ar={r.ar} />
                    </button>
                ))}
            </div>
        </aside>
    );
}


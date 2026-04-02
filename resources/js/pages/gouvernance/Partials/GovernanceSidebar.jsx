import React from 'react';
import TransText from '@/components/TransText';

export default function GovernanceSidebar({
    sections = [],
    activeId,
    onSelect,
}) {
    return (
        <aside className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                <TransText en="Governance" fr="Gouvernance" ar="الحوكمة" />
            </div>

            <nav className="mt-4 space-y-1">
                {sections.map((s) => {
                    const isActive = s.id === activeId;
                    return (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => onSelect(s.id)}
                            aria-pressed={isActive}
                            className={[
                                'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold ring-1 transition',
                                isActive
                                    ? 'bg-alpha-blue text-beta-blue ring-border'
                                    : 'bg-background text-muted-foreground ring-border hover:text-foreground',
                            ].join(' ')}
                        >
                            <span>
                                <TransText en={s.enLabel} fr={s.frLabel} ar={s.arLabel} />
                            </span>
                            <span aria-hidden="true">›</span>
                        </button>
                    );
                })}
            </nav>

            <div className="mt-4 rounded-xl bg-background p-4 ring-1 ring-border">
                <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                    <TransText en="Resources" fr="Ressources" ar="الموارد" />
                </div>
                <div className="mt-2 space-y-2 text-sm">
                    <a
                        href="#"
                        className="block font-semibold text-beta-blue hover:underline"
                    >
                        <TransText en="Download policy" fr="Télécharger la politique" ar="تنزيل السياسة" />
                    </a>
                    <a
                        href="#"
                        className="block font-semibold text-beta-blue hover:underline"
                    >
                        <TransText en="Contact committee" fr="Contacter le comité" ar="تواصل مع اللجنة" />
                    </a>
                </div>
            </div>
        </aside>
    );
}


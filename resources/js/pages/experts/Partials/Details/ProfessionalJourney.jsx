import React from 'react';
import TransText from '@/components/TransText';

export default function ProfessionalJourney({ items = [] }) {
    return (
        <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <h2 className="text-base font-extrabold text-foreground">
                <TransText
                    en="Media & Professional Journey"
                    fr="Parcours médiatique & professionnel"
                    ar="المسار الإعلامي والمهني"
                />
            </h2>

            <div className="mt-5 space-y-5">
                {items.map((it) => (
                    <div key={`${it.year}-${it.role.en}`} className="flex gap-3">
                        <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-alpha-blue text-beta-blue ring-1 ring-border" />
                        <div>
                            <div className="text-xs font-semibold text-muted-foreground">
                                <TransText
                                    en={`${it.year} • Press`}
                                    fr={`${it.year} • Presse`}
                                    ar={`${it.year} • الصحافة`}
                                />
                            </div>
                            <div className="mt-1 text-sm font-extrabold text-foreground">
                                <TransText en={it.role.en} fr={it.role.fr} ar={it.role.ar} />
                            </div>
                            <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                <TransText
                                    en={it.description.en}
                                    fr={it.description.fr}
                                    ar={it.description.ar}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


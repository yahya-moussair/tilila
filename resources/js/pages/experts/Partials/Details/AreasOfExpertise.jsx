import React from 'react';
import TransText from '@/components/TransText';

export default function AreasOfExpertise({ items = [] }) {
    return (
        <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <div className="flex items-center gap-2">
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-alpha-blue text-beta-blue">
                    ⓘ
                </div>
                <h2 className="text-base font-extrabold text-foreground">
                    <TransText
                        en="Areas of Expertise"
                        fr="Domaines d’expertise"
                        ar="مجالات الخبرة"
                    />
                </h2>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((x) => (
                    <div
                        key={x.title.en}
                        className="rounded-xl bg-background p-4 ring-1 ring-border"
                    >
                        <div className="text-sm font-extrabold text-foreground">
                            <TransText
                                en={x.title.en}
                                fr={x.title.fr}
                                ar={x.title.ar}
                            />
                        </div>
                        <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            <TransText
                                en={x.description.en}
                                fr={x.description.fr}
                                ar={x.description.ar}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


import React from 'react';
import TransText from '@/components/TransText';

export default function CharterGrid({ title, items = [] }) {
    return (
        <section id="charter">
            <div className="text-base font-extrabold text-foreground">{title}</div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((it) => (
                    <article
                        key={it.enTitle}
                        className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border"
                    >
                        <div className="text-sm font-extrabold text-foreground">
                            <TransText
                                en={it.enTitle}
                                fr={it.frTitle}
                                ar={it.arTitle}
                            />
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            <TransText
                                en={it.enDescription}
                                fr={it.frDescription}
                                ar={it.arDescription}
                            />
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}


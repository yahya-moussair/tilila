import React from 'react';

export default function CharterGrid({ title, items = [] }) {
    return (
        <section id="charter">
            <div className="text-base font-extrabold text-foreground">{title}</div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((it) => (
                    <article
                        key={it.title}
                        className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border"
                    >
                        <div className="text-sm font-extrabold text-foreground">
                            {it.title}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {it.description}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}


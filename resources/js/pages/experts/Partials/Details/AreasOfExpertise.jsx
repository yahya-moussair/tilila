import React from 'react';

export default function AreasOfExpertise({ items = [] }) {
    return (
        <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <div className="flex items-center gap-2">
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-alpha-blue text-beta-blue">
                    ⓘ
                </div>
                <h2 className="text-base font-extrabold text-foreground">
                    Areas of Expertise
                </h2>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((x) => (
                    <div
                        key={x.title}
                        className="rounded-xl bg-background p-4 ring-1 ring-border"
                    >
                        <div className="text-sm font-extrabold text-foreground">
                            {x.title}
                        </div>
                        <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {x.description}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


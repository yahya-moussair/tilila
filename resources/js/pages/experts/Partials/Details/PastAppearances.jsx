import React from 'react';
import { Link } from '@inertiajs/react';

export default function PastAppearances({ items = [] }) {
    return (
        <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-base font-extrabold text-foreground">
                    Past Appearances
                </h2>
                <Link href="#" className="text-xs font-semibold text-beta-blue hover:underline">
                    View All
                </Link>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((x) => (
                    <div
                        key={x.title}
                        className="overflow-hidden rounded-xl bg-background ring-1 ring-border"
                    >
                        <div className="relative aspect-[16/9] w-full bg-muted">
                            {x.thumbnailSrc ? (
                                <img
                                    src={x.thumbnailSrc}
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover"
                                    loading="lazy"
                                />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-tblack/65 via-tblack/15 to-transparent" />
                            <div className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/25 backdrop-blur">
                                ▶
                            </div>
                            <div className="absolute bottom-3 right-3 rounded-md bg-tblack/70 px-2 py-1 text-xs font-semibold text-white">
                                {x.duration}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="text-sm font-extrabold text-foreground">
                                {x.title}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                                {x.meta}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


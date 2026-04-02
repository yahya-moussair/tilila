import React, { useMemo } from 'react';

import MediaCard from '@/pages/user/media/partials/MediaCard';
import TransText from '@/components/TransText';

export default function RelatedMedia({ items, currentId, locale }) {
    const related = useMemo(
        () => items.filter((x) => x.id !== currentId).slice(0, 3),
        [items, currentId],
    );

    if (related.length === 0) return null;

    return (
        <section className="mt-10">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
                    <TransText en="More from Tilila" fr="Plus de Tilila" ar="المزيد من تيليلا" />
                </h2>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                    <MediaCard key={item.id} item={item} locale={locale} />
                ))}
            </div>
        </section>
    );
}


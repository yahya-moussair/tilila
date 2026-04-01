import { ArrowRight } from 'lucide-react';

const laureates = [
    {
        title: 'Breaking the Ceiling',
        brand: 'Agency: Studio Link',
        year: '2024',
        imageUrl:
            'https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=1200&q=80',
    },
    {
        title: 'Her Voice Matters',
        brand: 'Agency: Atlas Media',
        year: '2023',
        imageUrl:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    },
    {
        title: 'Equality in Sport',
        brand: 'Agency: North Creative',
        year: '2022',
        imageUrl:
            'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80',
    },
];

export default function FeaturedLaureatesSection() {
    return (
        <section
            id="featured"
            className="mx-auto max-w-7xl px-4 pb-10 pt-8"
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="text-xs font-semibold tracking-widest text-tgray">
                        FEATURED
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-tblack">
                        Featured Laureates
                    </h2>
                </div>
                <a
                    href="/tilila#archive"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-beta-blue hover:opacity-80"
                >
                    View all editions <ArrowRight className="size-4" />
                </a>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {laureates.map((item) => (
                    <article
                        key={`${item.title}-${item.year}`}
                        className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm"
                    >
                        <div className="relative">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="aspect-4/3 w-full object-cover"
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                            />
                            <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-semibold text-tblack">
                                {item.year}
                            </span>
                        </div>
                        <div className="p-5">
                            <h3 className="text-sm font-semibold text-tblack">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-tgray">
                                {item.brand}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}


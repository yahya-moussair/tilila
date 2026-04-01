import React from 'react';
import { Link } from '@inertiajs/react';

export default function Highlights({ tropheeImageSrc, talkImageSrc }) {
    const highlights = [
        {
            tag: 'Award',
            title: 'Trophée Tilila',
            description:
                'Celebrating remarkable women experts and their contributions across fields.',
            cta: 'Learn More',
            href: '#trophee',
            imageSrc: tropheeImageSrc,
        },
        {
            tag: 'Upcoming Event',
            title: 'TilTalk: Women in Tech',
            description:
                'Join our next dialogue highlighting women leaders shaping innovation.',
            cta: 'Register Now',
            href: '#tiltalk',
            imageSrc: talkImageSrc,
        },
    ];

    return (
        <section className="bg-background">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                            Highlighting Excellence &amp; Dialogue
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            Discover our key initiatives designed to promote diversity in
                            media and foster meaningful conversations.
                        </p>
                    </div>
                    <Link
                        href="#initiatives"
                        className="inline-flex w-fit items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                    >
                        View All Initiatives
                    </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {highlights.map((item) => (
                        <div
                            key={item.title}
                            className="relative overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border"
                        >
                            <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-muted to-secondary">
                                {item.imageSrc ? (
                                    <img
                                        src={item.imageSrc}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                ) : null}
                                <div className="absolute inset-0 bg-gradient-to-br from-tblack/75 via-tblack/40 to-transparent" />
                                <div className="relative flex h-full w-full flex-col justify-end p-6">
                                    <div className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                                        {item.tag}
                                    </div>
                                    <div className="mt-3 text-xl font-extrabold text-white">
                                        {item.title}
                                    </div>
                                    <div className="mt-2 max-w-md text-sm text-white/85">
                                        {item.description}
                                    </div>
                                    <div className="mt-5">
                                        <Link
                                            href={item.href}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline"
                                        >
                                            {item.cta}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

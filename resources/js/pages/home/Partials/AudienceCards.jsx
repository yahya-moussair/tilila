import React from 'react';
import { Link } from '@inertiajs/react';

const AUDIENCES = [
    {
        title: 'For Media',
        description:
            'Access a representative database of experts and amplify diverse voices for your reports.',
        cta: 'See our Database',
        href: '#media',
    },
    {
        title: 'For Experts',
        description:
            'Get visibility, join a network of peers, and find new opportunities to share your expertise.',
        cta: 'Create Profile',
        href: '#experts',
    },
    {
        title: 'For Partners',
        description:
            'Support community initiatives, promote inclusion, and accelerate the impact of Tilila’s mission.',
        cta: 'Become a Partner',
        href: '#partners',
    },
];

export default function AudienceCards() {
    return (
        <section id="connect" className="bg-background">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                        Your Path to Connection
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Whether you’re looking for expertise, visibility, or supporting
                        our cause, there is a place for you at Tilila.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {AUDIENCES.map((card) => (
                        <div
                            key={card.title}
                            className="group rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-alpha-blue text-beta-blue">
                                <div className="h-4 w-4 rounded bg-beta-blue/30" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-foreground">
                                {card.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {card.description}
                            </p>
                            <div className="mt-5">
                                <Link
                                    href={card.href}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-beta-blue hover:underline"
                                >
                                    {card.cta} <span aria-hidden="true">+</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

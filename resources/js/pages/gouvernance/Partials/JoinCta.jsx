import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

export default function JoinCta({ title, description, primaryCta, secondaryCta }) {
    return (
        <section className="overflow-hidden rounded-2xl bg-beta-blue shadow-sm ring-1 ring-border">
            <div className="px-6 py-10 sm:px-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="text-2xl font-extrabold tracking-tight text-white">
                        {title}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/90">
                        {description}
                    </p>

                    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href={primaryCta?.href ?? '#'}
                            className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-beta-blue shadow-sm hover:opacity-95"
                        >
                            {primaryCta?.label ?? (
                                <TransText
                                    en="Get involved"
                                    fr="S’impliquer"
                                    ar="شارك معنا"
                                />
                            )}
                        </Link>
                        {secondaryCta ? (
                            <Link
                                href={secondaryCta.href ?? '#'}
                                className="inline-flex items-center justify-center rounded-md bg-white/15 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25 hover:bg-white/20"
                            >
                                {secondaryCta.label}
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}


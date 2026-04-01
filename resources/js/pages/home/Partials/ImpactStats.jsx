import React from 'react';

const STATS = [
    { value: '500+', label: 'Experts registered' },
    { value: '50+', label: 'Media partners' },
    { value: '120+', label: 'Events hosted' },
];

export default function ImpactStats() {
    return (
        <section className="bg-beta-blue text-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-4">
                    <div>
                        <div className="text-sm font-semibold opacity-95">
                            Our Impact in Numbers
                        </div>
                        <div className="mt-1 text-xs opacity-90">
                            Growing a community of visibility.
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl bg-white/10 px-5 py-4 ring-1 ring-white/15"
                                >
                                    <div className="text-2xl font-extrabold tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-xs opacity-90">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

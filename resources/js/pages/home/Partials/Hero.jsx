import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

export default function Hero({ imageSrc }) {
    return (
        <section className="bg-background">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-beta-blue" />
                        <TransText en="An initiative by Tilila" fr="Une initiative de Tilila" ar="مبادرة من تيليلا" />
                    </div>

                    <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                        <TransText
                            en="Empowering Women Experts,"
                            fr="Valoriser les expertes,"
                            ar="تمكين الخبيرات،"
                        />{' '}
                        <span className="text-beta-blue">
                            <TransText
                                en="Shaping the Future"
                                fr="façonner l’avenir"
                                ar="وصناعة المستقبل"
                            />
                        </span>
                    </h1>

                    <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                        <TransText
                            en="Connecting Moroccan and African women experts with media and institutions to drive parity, inclusion, and diversity in public discourse."
                            fr="Relier les expertes marocaines et africaines aux médias et aux institutions pour promouvoir la parité, l’inclusion et la diversité dans le débat public."
                            ar="ربط الخبيرات المغربيات والإفريقيات بوسائل الإعلام والمؤسسات لتعزيز المساواة والإدماج والتنوع في الخطاب العام."
                        />
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="#experts"
                            className="inline-flex items-center justify-center rounded-md bg-beta-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            <TransText en="Find an Expert" fr="Trouver une experte" ar="اعثر على خبيرة" />
                        </Link>
                        <Link
                            href="#connect"
                            className="inline-flex items-center justify-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            <TransText en="Join Tilila Connect" fr="Rejoindre Tilila Connect" ar="انضم إلى Tilila Connect" />
                        </Link>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        <TransText en="See Experts" fr="Voir les expertes" ar="عرض الخبيرات" />{' '}
                        <span className="inline-block align-middle">{'>'}</span>
                    </div>
                </div>

                <div className="relative">
                    <div className="rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-secondary to-muted">
                            {imageSrc ? (
                                <img
                                    src={imageSrc}
                                    alt="Women experts in discussion"
                                    className="absolute inset-0 h-full w-full object-cover"
                                    loading="eager"
                                />
                            ) : null}

                            <div className="absolute inset-0 bg-gradient-to-t from-tblack/70 via-tblack/20 to-transparent" />

                            <div className="relative flex h-full w-full flex-col justify-end p-6">
                                <div className="max-w-xs rounded-xl bg-background/75 p-4 backdrop-blur">
                                    <div className="text-xs font-semibold text-muted-foreground">
                                        <TransText en="Voices of change" fr="Voix du changement" ar="أصوات التغيير" />
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-foreground">
                                        <TransText
                                            en="Bridging the gap between expertise and visibility."
                                            fr="Réduire l’écart entre expertise et visibilité."
                                            ar="ردم الفجوة بين الخبرة والظهور."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute -right-6 -top-6 hidden h-24 w-24 rounded-full bg-beta-blue/20 blur-2xl lg:block" />
                    <div className="pointer-events-none absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-full bg-beta-purple/30 blur-2xl lg:block" />
                </div>
            </div>
        </section>
    );
}

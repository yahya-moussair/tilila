import React from 'react';

import TransText from '@/components/TransText';

export default function FeaturedHero() {
    return (
        <section className="rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border sm:p-6">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">
                <TransText
                    en="Featured thematic dossier"
                    fr="Dossier thématique à la une"
                    ar="ملف موضوعي مميز"
                />
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-border">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
                        alt=""
                        className="h-56 w-full object-cover sm:h-64"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tblack/70 via-tblack/25 to-transparent" />

                    <div className="absolute left-5 top-5 flex items-center gap-2">
                        <span className="rounded-full bg-beta-blue px-3 py-1 text-[11px] font-extrabold text-white shadow-sm ring-1 ring-border">
                            <TransText en="New release" fr="Nouveau" ar="إصدار جديد" />
                        </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                        <h1 className="max-w-3xl text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                            <TransText
                                en="Women in STEM: Breaking Barriers in North Africa"
                                fr="Femmes en STEM : briser les barrières en Afrique du Nord"
                                ar="النساء في STEM: كسر الحواجز في شمال إفريقيا"
                            />
                        </h1>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/85">
                            <TransText
                                en="An in-depth analysis of the challenges and triumphs of women scientists and engineers across the region, featuring expert interviews and data-driven insights."
                                fr="Une analyse approfondie des défis et des réussites des femmes scientifiques et ingénieures de la région, avec des interviews d’expertes et des insights basés sur des données."
                                ar="تحليل معمّق لتحديات ونجاحات العالمات والمهندسات في المنطقة، مع مقابلات خبراء ورؤى مبنية على البيانات."
                            />
                        </p>

                        <div className="mt-5">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-tblack shadow-sm hover:opacity-95"
                            >
                                <TransText
                                    en="Read Full Dossier"
                                    fr="Lire le dossier"
                                    ar="اقرأ الملف الكامل"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


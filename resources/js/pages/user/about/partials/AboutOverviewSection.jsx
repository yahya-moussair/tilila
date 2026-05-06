import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

function Card({ title, body, href, cta }) {
    return (
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm ring-1 ring-border/60">
            <h3 className="text-base font-extrabold text-foreground">
                {title}
            </h3>
            <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {body}
            </div>
            {href ? (
                <div className="mt-4">
                    <Link
                        href={href}
                        className="text-sm font-semibold text-beta-blue hover:underline"
                    >
                        {cta}
                    </Link>
                </div>
            ) : null}
        </div>
    );
}

export default function AboutOverviewSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-14">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    <TransText
                        en="What is Tilila?"
                        fr="Qu’est-ce que Tilila ?"
                        ar="ما هي تيليلا؟"
                    />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    <TransText
                        en="A SOREAD 2M initiative (Programme EDI) to improve parity, diversity and inclusion in the media ecosystem—by making women experts more visible and easier to reach."
                        fr="Une initiative SOREAD 2M (Programme EDI) pour renforcer la parité, la diversité et l’inclusion dans l’écosystème média—en rendant les expertes plus visibles et plus accessibles."
                        ar="مبادرة من SOREAD 2M (برنامج EDI) لتعزيز التكافؤ والتنوع والشمول في المنظومة الإعلامية—عبر إبراز الخبيرات وتسهيل الوصول إليهن."
                    />
                </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card
                    title={
                        <TransText
                            en="Vision"
                            fr="Vision"
                            ar="الرؤية"
                        />
                    }
                    body={
                        <TransText
                            en="A public discourse where expert voices reflect society: inclusive, representative, and credible."
                            fr="Un débat public où les voix expertes reflètent la société : inclusif, représentatif et crédible."
                            ar="خطاب عام تعكس فيه الأصوات الخبيرة المجتمع: شامل، ممثل، وموثوق."
                        />
                    }
                />
                <Card
                    title={
                        <TransText
                            en="Mission"
                            fr="Mission"
                            ar="المهمة"
                        />
                    }
                    body={
                        <TransText
                            en="Connect journalists, producers and institutions with qualified women experts across Morocco, Africa and the diaspora."
                            fr="Mettre en relation journalistes, producteurs et institutions avec des expertes qualifiées au Maroc, en Afrique et dans la diaspora."
                            ar="ربط الصحفيين والمنتجين والمؤسسات بخبيرات مؤهلات في المغرب وإفريقيا والمهجر."
                        />
                    }
                    href="/experts"
                    cta={
                        <TransText
                            en="Browse experts →"
                            fr="Accéder à l’annuaire →"
                            ar="تصفح الخبيرات →"
                        />
                    }
                />
                <Card
                    title={
                        <TransText
                            en="Positioning"
                            fr="Positionnement"
                            ar="التموقع"
                        />
                    }
                    body={
                        <TransText
                            en="Impact media programme: awards, lab, public conversations, and editorial resources to raise standards and representation."
                            fr="Programme média à impact : awards, lab, conversations publiques et ressources éditoriales pour améliorer les standards et la représentation."
                            ar="برنامج إعلامي مؤثر: جوائز ومختبر وحوارات عامة وموارد تحريرية لرفع المعايير والتمثيل."
                        />
                    }
                    href="/events"
                    cta={
                        <TransText
                            en="See events →"
                            fr="Voir les événements →"
                            ar="عرض الفعاليات →"
                        />
                    }
                />
                <Card
                    title={
                        <TransText
                            en="Values (EDI)"
                            fr="Valeurs (EDI)"
                            ar="القيم (EDI)"
                        />
                    }
                    body={
                        <ul className="list-disc space-y-1 ps-5">
                            <li>
                                <TransText
                                    en="Parity"
                                    fr="Parité"
                                    ar="تكافؤ"
                                />
                            </li>
                            <li>
                                <TransText
                                    en="Diversity"
                                    fr="Diversité"
                                    ar="تنوع"
                                />
                            </li>
                            <li>
                                <TransText
                                    en="Inclusion"
                                    fr="Inclusion"
                                    ar="شمول"
                                />
                            </li>
                        </ul>
                    }
                    href="/mentions-legales"
                    cta={
                        <TransText
                            en="References & compliance →"
                            fr="Références & conformité →"
                            ar="المراجع والامتثال →"
                        />
                    }
                />
            </div>
        </section>
    );
}


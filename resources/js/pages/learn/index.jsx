import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';

const LINKS = [
    {
        href: '/learn/academy',
        en: 'Tilila Academy',
        fr: 'Tilila Academy',
        ar: 'أكاديمية تيليلا',
        sub: {
            en: 'Training · Leadership · Certificates',
            fr: 'Formation · Leadership · Certificats',
            ar: 'تدريب · قيادة · شهادات',
        },
    },
    {
        href: '/learn/resources',
        en: 'Resources',
        fr: 'Ressources',
        ar: 'موارد',
        sub: {
            en: 'Guides · Toolkits · Templates',
            fr: 'Guides · Boîte à outils · Modèles',
            ar: 'أدلة · أدوات · قوالب',
        },
    },
    {
        href: '/learn/offers',
        en: 'Offers',
        fr: 'Offres',
        ar: 'عروض',
        sub: {
            en: 'Companies · Institutions · NGOs',
            fr: 'Entreprises · Institutions · ONG',
            ar: 'شركات · مؤسسات · منظمات',
        },
    },
    {
        href: '/learn/opportunities',
        en: 'Opportunities',
        fr: 'Opportunités',
        ar: 'الفرص',
        sub: {
            en: 'Jobs · Grants · Calls',
            fr: 'Emplois · Bourses · Appels',
            ar: 'وظائف · منح · نداءات',
        },
    },
    {
        href: '/learn/agenda',
        en: 'Agenda',
        fr: 'Agenda',
        ar: 'الأجندة',
        sub: {
            en: 'Internal calendar · Webinars',
            fr: 'Calendrier interne · Webinaires',
            ar: 'تقويم داخلي · ندوات',
        },
    },
];

export default function LearnIndex() {
    return (
        <>
            <Head title="Learn · Tilila" />

            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <header className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        <TransText
                            en="TILILA LEARN"
                            fr="TILILA LEARN"
                            ar="تعلم تيليلا"
                        />
                    </h1>
                    <p className="mt-3 text-sm text-muted-foreground">
                        <TransText
                            en="Academy, resources, institutional offers, opportunities, and the programme agenda."
                            fr="Academy, ressources, offres institutionnelles, opportunités et agenda du programme."
                            ar="الأكاديمية والموارد والعروض المؤسسية والفرص وأجندة البرنامج."
                        />
                    </p>
                </header>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {LINKS.map((x) => (
                        <Link
                            key={x.href}
                            href={x.href}
                            className="rounded-2xl border border-border bg-card p-6 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <h2 className="text-lg font-bold text-foreground">
                                <TransText
                                    en={x.en}
                                    fr={x.fr}
                                    ar={x.ar}
                                />
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                <TransText
                                    en={x.sub.en}
                                    fr={x.sub.fr}
                                    ar={x.sub.ar}
                                />
                            </p>
                            <span className="mt-4 inline-flex text-sm font-semibold text-beta-blue">
                                <TransText en="Open" fr="Ouvrir" ar="افتح" /> →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

LearnIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

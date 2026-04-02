import React from 'react';
import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

const AUDIENCES = [
    {
        enTitle: 'For Media',
        frTitle: 'Pour les médias',
        arTitle: 'للإعلام',
        enDescription:
            'Access a representative database of experts and amplify diverse voices for your reports.',
        frDescription:
            'Accédez à une base d’expertes représentative et mettez en avant des voix diverses dans vos reportages.',
        arDescription:
            'استفد من قاعدة بيانات ممثلة للخبيرات وابرز أصواتًا متنوعة في تقاريرك.',
        enCta: 'See our Database',
        frCta: 'Voir la base',
        arCta: 'عرض القاعدة',
        href: '#media',
    },
    {
        enTitle: 'For Experts',
        frTitle: 'Pour les expertes',
        arTitle: 'للخبيرات',
        enDescription:
            'Get visibility, join a network of peers, and find new opportunities to share your expertise.',
        frDescription:
            'Gagnez en visibilité, rejoignez un réseau de pairs et découvrez de nouvelles opportunités pour partager votre expertise.',
        arDescription:
            'احصلي على مزيد من الظهور، وانضمي إلى شبكة من الزميلات، واعثري على فرص جديدة لمشاركة خبرتك.',
        enCta: 'Create Profile',
        frCta: 'Créer un profil',
        arCta: 'إنشاء ملف',
        href: '#experts',
    },
    {
        enTitle: 'For Partners',
        frTitle: 'Pour les partenaires',
        arTitle: 'للشركاء',
        enDescription:
            'Support community initiatives, promote inclusion, and accelerate the impact of Tilila’s mission.',
        frDescription:
            'Soutenez des initiatives communautaires, encouragez l’inclusion et accélérez l’impact de la mission de Tilila.',
        arDescription:
            'ادعم المبادرات المجتمعية، وعزز الشمول، وساهم في تسريع أثر رسالة تيليلا.',
        enCta: 'Become a Partner',
        frCta: 'Devenir partenaire',
        arCta: 'كن شريكًا',
        href: '#partners',
    },
];

export default function AudienceCards() {
    return (
        <section id="connect" className="bg-background">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                        <TransText
                            en="Your Path to Connection"
                            fr="Votre chemin vers la connexion"
                            ar="طريقك نحو التواصل"
                        />
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        <TransText
                            en="Whether you’re looking for expertise, visibility, or supporting our cause, there is a place for you at Tilila."
                            fr="Que vous recherchiez de l’expertise, de la visibilité ou que vous souhaitiez soutenir notre cause, il y a une place pour vous chez Tilila."
                            ar="سواء كنت تبحث عن خبرة أو عن مزيد من الظهور أو ترغب في دعم قضيتنا، فهناك مكان لك في تيليلا."
                        />
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
                                <TransText en={card.enTitle} fr={card.frTitle} ar={card.arTitle} />
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                <TransText
                                    en={card.enDescription}
                                    fr={card.frDescription}
                                    ar={card.arDescription}
                                />
                            </p>
                            <div className="mt-5">
                                <Link
                                    href={card.href}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-beta-blue hover:underline"
                                >
                                    <TransText en={card.enCta} fr={card.frCta} ar={card.arCta} />{' '}
                                    <span aria-hidden="true">+</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

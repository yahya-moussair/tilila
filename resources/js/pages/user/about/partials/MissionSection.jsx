import TransText from '@/components/TransText';

const stats = [
    {
        value: '2018',
        en: 'Year founded',
        fr: 'Année de création',
        ar: 'سنة التأسيس',
    },
    {
        value: '4',
        en: 'Pillars',
        fr: 'Piliers',
        ar: 'محاور',
    },
    {
        value: '3',
        en: 'Home news cards (max)',
        fr: 'Cartes actu (max)',
        ar: 'بطاقات أخبار (حد أقصى)',
    },
];

export default function MissionSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-6">
                    <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
                        <img
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                            alt="People collaborating in a meeting"
                            className="aspect-4/3 w-full object-cover"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>

                <div className="lg:col-span-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-alpha-blue px-4 py-1 text-xs font-semibold text-beta-blue">
                        <span className="size-2 rounded-full bg-beta-blue" />
                        <span>
                            <TransText
                                en="Our Mission & History"
                                fr="Notre mission et notre histoire"
                                ar="مهمتنا وتاريخنا"
                            />
                        </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-tblack">
                        <TransText
                            en="Building a more inclusive media ecosystem"
                            fr="Construire un écosystème médiatique plus inclusif"
                            ar="بناء منظومة إعلامية أكثر شمولًا"
                        />
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-tgray">
                        <TransText
                            en="Tilila supports parity and diversity by making it easier for journalists, producers, and organizations to discover expert voices across disciplines. We work with partners to improve representation and raise the quality of public debate."
                            fr="Tilila soutient la parité et la diversité en facilitant l’accès, pour les journalistes, producteurs et organisations, à des voix expertes dans toutes les disciplines. Nous collaborons avec nos partenaires pour améliorer la représentation et renforcer la qualité du débat public."
                            ar="تدعم تيليلا المساواة والتنوع عبر تسهيل وصول الصحفيين والمنتجين والمنظمات إلى أصوات خبيرة عبر مختلف التخصصات. ونعمل مع الشركاء لتحسين التمثيل ورفع جودة النقاش العام."
                        />
                    </p>

                    <p className="mt-4 text-sm leading-6 text-tgray">
                        <TransText
                            en="Our flagship activities include Tilila Awards, Tililab, and TiliTalks—plus an expert directory and CPD media resources (articles, podcasts, newsletters, video capsules)."
                            fr="Nos actions phares : Tilila Awards, Tililab, TiliTalks—ainsi qu’un annuaire d’expertes et des ressources média CPD (articles, podcasts, newsletters, capsules vidéo)."
                            ar="أنشطتنا الرئيسية: جوائز تيليلا وتيليلاب وTiliTalks—إضافةً إلى دليل الخبيرات وموارد إعلام CPD (مقالات وبودكاست ونشرات وكبسولات فيديو)."
                        />
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {stats.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-border bg-background p-5"
                            >
                                <div className="text-2xl font-semibold text-tblack">
                                    {item.value}
                                </div>
                                <div className="mt-1 text-xs font-medium text-tgray">
                                    <TransText
                                        en={item.en}
                                        fr={item.fr}
                                        ar={item.ar}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

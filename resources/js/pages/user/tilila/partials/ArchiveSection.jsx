import { GalleryHorizontal, Gavel, Trophy } from 'lucide-react';
import TransText from '@/components/TransText';

const editions = [
    {
        year: '2023',
        enEdition: '5th Edition',
        frEdition: '5e édition',
        arEdition: 'الدورة الخامسة',
        enTheme: 'Digital Inclusion',
        frTheme: 'Inclusion numérique',
        arTheme: 'الإدماج الرقمي',
        hasGallery: true,
    },
    {
        year: '2022',
        enEdition: '4th Edition',
        frEdition: '4e édition',
        arEdition: 'الدورة الرابعة',
        enTheme: 'Authenticity in Storytelling',
        frTheme: 'Authenticité dans le récit',
        arTheme: 'المصداقية في السرد',
        hasGallery: true,
    },
    {
        year: '2021',
        enEdition: '3rd Edition',
        frEdition: '3e édition',
        arEdition: 'الدورة الثالثة',
        enTheme: 'Resilience & Representation',
        frTheme: 'Résilience & représentation',
        arTheme: 'الصمود والتمثيل',
        hasGallery: false,
    },
    {
        year: '2020',
        enEdition: '2nd Edition',
        frEdition: '2e édition',
        arEdition: 'الدورة الثانية',
        enTheme: 'Parity in Crisis',
        frTheme: 'Parité en temps de crise',
        arTheme: 'التكافؤ في الأزمات',
        hasGallery: false,
    },
];

export default function ArchiveSection() {
    return (
        <section id="archive" className="mx-auto max-w-7xl px-4 pb-12 pt-10">
            <div className="text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-tblack sm:text-4xl">
                    <TransText
                        en="Archive of Editions"
                        fr="Archives des éditions"
                        ar="أرشيف الدورات"
                    />
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-tgray">
                    <TransText
                        en="Explore the history of the Trophée Tilila. Dive into past ceremonies, discover the illustrious jury members, and see the evolution of our mission."
                        fr="Explorez l’histoire du Trophée Tilila. Plongez dans les cérémonies passées, découvrez les membres du jury, et suivez l’évolution de notre mission."
                        ar="استكشف تاريخ جائزة تيليلا. تعرّف على الدورات السابقة، واكتشف أعضاء لجنة التحكيم، وتابع تطور رسالتنا."
                    />
                </p>
            </div>

            <div className="mt-10 rounded-2xl bg-background/60 p-4 sm:p-6">
                <div className="space-y-4">
                    {editions.map((edition) => (
                        <div
                            key={`${edition.year}-${edition.edition}`}
                            className="flex flex-col gap-4 rounded-2xl bg-beta-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-center gap-6">
                                <div className="text-4xl font-semibold tracking-tight text-tblack/10 sm:text-5xl">
                                    {edition.year}
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-tblack">
                                        <TransText
                                            en={edition.enEdition}
                                            fr={edition.frEdition}
                                            ar={edition.arEdition}
                                        />
                                    </div>
                                    <div className="text-sm text-tgray">
                                        <TransText
                                            en={`Theme: “${edition.enTheme}”`}
                                            fr={`Thème : « ${edition.frTheme} »`}
                                            ar={`الموضوع: « ${edition.arTheme} »`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                                <a
                                    href="/tilila"
                                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary"
                                >
                                    <Trophy className="size-4 text-tgray" />
                                    <TransText en="Winners" fr="Lauréats" ar="الفائزون" />
                                </a>
                                <a
                                    href="/tilila"
                                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary"
                                >
                                    <Gavel className="size-4 text-tgray" />
                                    <TransText en="Jury" fr="Jury" ar="لجنة التحكيم" />
                                </a>
                                {edition.hasGallery ? (
                                    <a
                                        href="/tilila"
                                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary"
                                    >
                                        <GalleryHorizontal className="size-4 text-tgray" />
                                        <TransText en="Gallery" fr="Galerie" ar="المعرض" />
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex items-center justify-center">
                    <a
                        href="/tilila"
                        className="text-sm font-semibold text-beta-blue hover:opacity-80"
                    >
                        <TransText
                            en="View older editions"
                            fr="Voir les éditions précédentes"
                            ar="عرض الدورات الأقدم"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}


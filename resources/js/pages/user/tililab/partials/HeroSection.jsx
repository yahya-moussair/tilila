import { Download } from 'lucide-react';
import TransText from '@/components/TransText';

export default function HeroSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:pb-16 sm:pt-20">
            <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center rounded-full bg-beta-yellow px-4 py-1 text-xs font-semibold text-alpha-yellow">
                    <TransText
                        en="CALL FOR YOUNG CREATIVES"
                        fr="APPEL AUX JEUNES CRÉATIFS"
                        ar="نداء للشباب المبدعين"
                    />
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-tblack sm:text-5xl lg:text-6xl">
                    <TransText
                        en="Tililab: Incubating the Next"
                        fr="Tililab : Incuber la prochaine"
                        ar="تيليلاب: احتضان الجيل القادم"
                    />
                    <br />
                    <TransText
                        en="Generation of"
                        fr="génération de"
                        ar="من"
                    />{' '}
                    <span className="text-beta-blue">
                        <TransText
                            en="Creative Talent"
                            fr="talents créatifs"
                            ar="المواهب الإبداعية"
                        />
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-tgray sm:text-lg">
                    <TransText
                        en="A dedicated space for young creators to develop gender-sensitive advertising and media content. We provide mentorship, resources, and a platform to shape a more inclusive visual culture."
                        fr="Un espace dédié aux jeunes créateurs pour développer des contenus publicitaires et médiatiques sensibles au genre. Nous offrons du mentorat, des ressources et une plateforme pour construire une culture visuelle plus inclusive."
                        ar="مساحة مخصصة للمبدعين الشباب لتطوير محتوى إعلاني وإعلامي مراعي للنوع الاجتماعي. نوفر الإرشاد والموارد ومنصة للمساهمة في ثقافة بصرية أكثر شمولًا."
                    />
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                        href="/#apply"
                        className="inline-flex items-center justify-center rounded-full bg-beta-blue px-6 py-2.5 text-sm font-semibold text-twhite transition-opacity hover:opacity-90"
                    >
                        <TransText en="Apply Now" fr="Postuler" ar="قدّم الآن" />
                    </a>
                    <a
                        href="/#guidelines"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-semibold text-tblack transition-colors hover:bg-secondary"
                    >
                        <Download className="size-4 text-tgray" />
                        <TransText en="Download Guidelines" fr="Télécharger les directives" ar="تنزيل الإرشادات" />
                    </a>
                </div>
            </div>
        </section>
    );
}


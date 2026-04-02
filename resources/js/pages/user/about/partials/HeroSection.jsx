import { ShieldCheck } from 'lucide-react';
import TransText from '@/components/TransText';

export default function HeroSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:pb-24 sm:pt-24">
            <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-alpha-blue px-5 py-2 text-sm font-semibold text-beta-blue">
                    <ShieldCheck className="size-5" />
                    <span>
                        <TransText en="Our Initiative" fr="Notre initiative" ar="مبادرتنا" />
                    </span>
                </div>

                <h1 className="mt-7 text-4xl font-semibold tracking-tight text-tblack sm:text-5xl lg:text-6xl">
                    <TransText
                        en="Driving Parity & Diversity"
                        fr="Promouvoir la parité et la diversité"
                        ar="تعزيز المساواة والتنوع"
                    />
                    <br />
                    <TransText
                        en="in Public Discourse"
                        fr="dans le débat public"
                        ar="في الخطاب العام"
                    />
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-tgray sm:text-lg">
                    <TransText
                        en="Tilila is committed to impactful media engagement and representation. We build a trusted platform that connects media and experts to elevate diverse voices, stories, and solutions."
                        fr="Tilila s’engage pour une représentation et un engagement médiatique à fort impact. Nous construisons une plateforme de confiance qui relie médias et expertes afin de mettre en avant des voix, des récits et des solutions diversifiés."
                        ar="تلتزم تيليلا بتعزيز المشاركة الإعلامية المؤثرة والتمثيل العادل. نبني منصة موثوقة تربط الإعلام بالخبيرات لرفع الأصوات والقصص والحلول المتنوعة."
                    />
                </p>
            </div>
        </section>
    );
}


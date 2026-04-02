import { CheckCircle2 } from 'lucide-react';
import TransText from '@/components/TransText';

const eligibility = [
    {
        en: 'Students and young professionals under 30 years old',
        fr: 'Étudiants et jeunes professionnels de moins de 30 ans',
        ar: 'طلاب ومهنيون شباب دون 30 عامًا',
    },
    {
        en: 'Creative and communication backgrounds',
        fr: 'Profils créatifs et communication',
        ar: 'خلفيات في الإبداع والتواصل',
    },
    {
        en: 'Teams of 1–3 people (Design, Illustration, Copywriting, Messaging)',
        fr: 'Équipes de 1 à 3 personnes (design, illustration, rédaction, messaging)',
        ar: 'فرق من 1 إلى 3 أشخاص (تصميم، رسم، كتابة إعلانية، رسائل)',
    },
];

export default function MissionSection() {
    return (
        <div className="rounded-2xl border border-border bg-background px-6 py-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-tblack">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                    ✦
                </span>
                <span>
                    <TransText en="Our Mission" fr="Notre mission" ar="مهمتنا" />
                </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-tgray">
                <TransText
                    en="Tilila is more than just a competition; it’s a movement toward better representation. We challenge young creatives to design advertising narratives and visual strategies. Selected teams will undergo intensive workshops, receive professional coaching, and have their work showcased to industry leaders."
                    fr="Tilila est plus qu’une compétition : c’est un mouvement vers une meilleure représentation. Nous mettons au défi les jeunes créatifs de concevoir des récits publicitaires et des stratégies visuelles. Les équipes sélectionnées suivront des ateliers intensifs, bénéficieront d’un coaching professionnel et verront leur travail présenté à des leaders du secteur."
                    ar="تيليلا أكثر من مجرد مسابقة؛ إنها حركة نحو تمثيل أفضل. نتحدى المبدعين الشباب لصياغة سرديات إعلانية واستراتيجيات بصرية. ستمر الفرق المختارة بورشات مكثفة، وتحصل على تدريب مهني، ويُعرض عملها على قادة الصناعة."
                />
            </p>

            <div className="mt-6">
                <div className="text-sm font-semibold text-tblack">
                    <TransText en="Who can apply?" fr="Qui peut postuler ?" ar="من يمكنه التقديم؟" />
                </div>
                <ul className="mt-3 space-y-2 text-sm text-tgray">
                    {eligibility.map((item) => (
                        <li key={item.en} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-beta-blue" />
                            <span>
                                <TransText en={item.en} fr={item.fr} ar={item.ar} />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


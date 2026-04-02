import { CalendarDays } from 'lucide-react';
import TransText from '@/components/TransText';

const keyDates = [
    {
        date: 'OCT 1 – OCT 18',
        enTitle: 'Applications Open',
        frTitle: 'Ouverture des candidatures',
        arTitle: 'فتح باب التقديم',
        enDescription: 'Submit your application via the form and guidelines.',
        frDescription: 'Soumettez votre candidature via le formulaire et les directives.',
        arDescription: 'قدّم طلبك عبر الاستمارة والإرشادات.',
    },
    {
        date: 'NOV 1 – NOV 9',
        enTitle: 'Selection Phase',
        frTitle: 'Phase de sélection',
        arTitle: 'مرحلة الاختيار',
        enDescription: 'Shortlisted teams are invited to the mentorship track.',
        frDescription: 'Les équipes présélectionnées sont invitées à rejoindre le parcours de mentorat.',
        arDescription: 'تتم دعوة الفرق المختارة إلى مسار الإرشاد.',
    },
    {
        date: 'NOV 15 – DEC 3',
        enTitle: 'Incubation Period',
        frTitle: 'Période d’incubation',
        arTitle: 'فترة الاحتضان',
        enDescription: 'Coaching, workshops, and project development.',
        frDescription: 'Coaching, ateliers et développement du projet.',
        arDescription: 'تدريب وورشات وتطوير المشاريع.',
    },
    {
        date: 'DEC 20',
        enTitle: 'Final Pitch Day',
        frTitle: 'Journée de pitch final',
        arTitle: 'يوم العرض النهائي',
        enDescription: 'Present your project to the jury and partners.',
        frDescription: 'Présentez votre projet au jury et aux partenaires.',
        arDescription: 'قدّم مشروعك للجنة التحكيم والشركاء.',
    },
];

export default function KeyDatesSection() {
    return (
        <div className="rounded-2xl border border-border bg-background p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-tblack">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                    <CalendarDays className="size-4" />
                </span>
                <span>
                    <TransText en="Key Dates" fr="Dates clés" ar="التواريخ الرئيسية" />
                </span>
            </div>

            <div className="mt-6 space-y-5">
                {keyDates.map((item) => (
                    <div key={item.enTitle} className="flex gap-3">
                        <div className="mt-1 size-2 shrink-0 rounded-full bg-beta-blue" />
                        <div>
                            <div className="text-xs font-semibold text-beta-blue">
                                {item.date}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-tblack">
                                <TransText en={item.enTitle} fr={item.frTitle} ar={item.arTitle} />
                            </div>
                            <div className="mt-1 text-sm leading-6 text-tgray">
                                <TransText en={item.enDescription} fr={item.frDescription} ar={item.arDescription} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <a
                    href="/#apply"
                    className="inline-flex w-full items-center justify-center rounded-full bg-beta-blue px-6 py-2.5 text-sm font-semibold text-twhite transition-opacity hover:opacity-90"
                >
                    <TransText en="Apply for this Edition" fr="Postuler pour cette édition" ar="قدّم لهذه الدورة" />
                </a>
                <div className="mt-2 text-center text-xs text-tgray">
                    <TransText
                        en="Until OCT 18, 23:59 (GMT)"
                        fr="Jusqu’au 18 oct., 23:59 (GMT)"
                        ar="حتى 18 أكتوبر، 23:59 (GMT)"
                    />
                </div>
            </div>
        </div>
    );
}


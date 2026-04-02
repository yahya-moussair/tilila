import TransText from '@/components/TransText';

const guidelines = [
    {
        number: 1,
        enTitle: 'Concept Note',
        frTitle: 'Note conceptuelle',
        arTitle: 'مذكرة المفهوم',
        enDescription:
            'Describe your idea and how it challenges stereotypes. Include your target audience and key message.',
        frDescription:
            'Décrivez votre idée et la façon dont elle remet en question les stéréotypes. Indiquez votre public cible et votre message clé.',
        arDescription:
            'صف فكرتك وكيف تتحدى الصور النمطية. اذكر الجمهور المستهدف والرسالة الأساسية.',
    },
    {
        number: 2,
        enTitle: 'Portfolio',
        frTitle: 'Portfolio',
        arTitle: 'ملف الأعمال',
        enDescription:
            'Share a selection of your work that demonstrates your craft and creative range.',
        frDescription:
            'Partagez une sélection de vos réalisations qui illustre votre savoir-faire et votre palette créative.',
        arDescription:
            'شارك نماذج من أعمالك تُظهر مهارتك وتنوعك الإبداعي.',
    },
    {
        number: 3,
        enTitle: 'Video Pitch',
        frTitle: 'Pitch vidéo',
        arTitle: 'عرض فيديو',
        enDescription:
            'A short video introducing your concept, motivation, and what you want to change through your work.',
        frDescription:
            'Une courte vidéo présentant votre concept, votre motivation et ce que vous souhaitez changer à travers votre travail.',
        arDescription:
            'فيديو قصير يعرّف بمفهومك ودوافعك وما تريد تغييره من خلال عملك.',
    },
    {
        number: 4,
        enTitle: 'CVs',
        frTitle: 'CV',
        arTitle: 'السير الذاتية',
        enDescription:
            'Provide updated résumés for each team member with relevant experience and education.',
        frDescription:
            'Fournissez des CV à jour pour chaque membre de l’équipe, incluant l’expérience pertinente et la formation.',
        arDescription:
            'قدّم سيرًا ذاتية محدثة لكل عضو في الفريق تتضمن الخبرات والدراسة ذات الصلة.',
    },
];

export default function GuidelinesSection() {
    return (
        <div id="guidelines" className="mt-6 rounded-2xl border border-border bg-background p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-tblack">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                    ✦
                </span>
                <span>
                    <TransText
                        en="Application Guidelines"
                        fr="Directives de candidature"
                        ar="إرشادات التقديم"
                    />
                </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {guidelines.map((item) => (
                    <div
                        key={item.number}
                        className="rounded-2xl border border-border bg-secondary p-5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="grid size-8 place-items-center rounded-full bg-alpha-blue text-sm font-semibold text-beta-blue">
                                {item.number}
                            </div>
                            <div className="text-sm font-semibold text-tblack">
                                <TransText en={item.enTitle} fr={item.frTitle} ar={item.arTitle} />
                            </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-tgray">
                            <TransText
                                en={item.enDescription}
                                fr={item.frDescription}
                                ar={item.arDescription}
                            />
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}


const guidelines = [
    {
        number: 1,
        title: 'Concept Note',
        description:
            'Describe your idea and how it challenges stereotypes. Include your target audience and key message.',
    },
    {
        number: 2,
        title: 'Portfolio',
        description:
            'Share a selection of your work that demonstrates your craft and creative range.',
    },
    {
        number: 3,
        title: 'Video Pitch',
        description:
            'A short video introducing your concept, motivation, and what you want to change through your work.',
    },
    {
        number: 4,
        title: 'CVs',
        description:
            'Provide updated résumés for each team member with relevant experience and education.',
    },
];

export default function GuidelinesSection() {
    return (
        <div id="guidelines" className="mt-6 rounded-2xl border border-border bg-background p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-tblack">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                    ✦
                </span>
                <span>Application Guidelines</span>
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
                                {item.title}
                            </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-tgray">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}


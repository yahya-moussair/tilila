import { CalendarDays } from 'lucide-react';

const keyDates = [
    {
        date: 'OCT 1 – OCT 18',
        title: 'Applications Open',
        description: 'Submit your application via the form and guidelines.',
    },
    {
        date: 'NOV 1 – NOV 9',
        title: 'Selection Phase',
        description: 'Shortlisted teams are invited to the mentorship track.',
    },
    {
        date: 'NOV 15 – DEC 3',
        title: 'Incubation Period',
        description: 'Coaching, workshops, and project development.',
    },
    {
        date: 'DEC 20',
        title: 'Final Pitch Day',
        description: 'Present your project to the jury and partners.',
    },
];

export default function KeyDatesSection() {
    return (
        <div className="rounded-2xl border border-border bg-background p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-tblack">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                    <CalendarDays className="size-4" />
                </span>
                <span>Key Dates</span>
            </div>

            <div className="mt-6 space-y-5">
                {keyDates.map((item) => (
                    <div key={item.title} className="flex gap-3">
                        <div className="mt-1 size-2 shrink-0 rounded-full bg-beta-blue" />
                        <div>
                            <div className="text-xs font-semibold text-beta-blue">
                                {item.date}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-tblack">
                                {item.title}
                            </div>
                            <div className="mt-1 text-sm leading-6 text-tgray">
                                {item.description}
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
                    Apply for this Edition
                </a>
                <div className="mt-2 text-center text-xs text-tgray">
                    Until OCT 18, 23:59 (GMT)
                </div>
            </div>
        </div>
    );
}


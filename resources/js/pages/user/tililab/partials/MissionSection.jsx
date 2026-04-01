import { CheckCircle2 } from 'lucide-react';

const eligibility = [
    'Students and young professionals under 30 years old',
    'Creative and communication backgrounds',
    'Teams of 1–3 people (Design, Illustration, Copywriting, Messaging)',
];

export default function MissionSection() {
    return (
        <div className="rounded-2xl border border-border bg-background px-6 py-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-tblack">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                    ✦
                </span>
                <span>Our Mission</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-tgray">
                Tilila is more than just a competition; it’s a movement toward
                better representation. We challenge young creatives to design
                advertising narratives and visual strategies. Selected teams
                will undergo intensive workshops, receive professional coaching,
                and have their work showcased to industry leaders.
            </p>

            <div className="mt-6">
                <div className="text-sm font-semibold text-tblack">
                    Who can apply?
                </div>
                <ul className="mt-3 space-y-2 text-sm text-tgray">
                    {eligibility.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-beta-blue" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


import TransText from '@/components/TransText';

const committee = [
    {
        name: 'Khadija Bouzoubaa',
        role: 'Chair',
        photoUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    },
    {
        name: 'Salim Cherdi',
        role: 'Member',
        photoUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    },
    {
        name: 'Rabia Fassi',
        role: 'Member',
        photoUrl:
            'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=900&q=80',
    },
    {
        name: 'Fatiha Derres',
        role: 'Member',
        photoUrl:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    },
];

export default function CommitteeSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-12">
            <div className="text-center">
                <div className="text-xs font-semibold tracking-widest text-tgray">
                    <TransText en="LEADERSHIP" fr="GOUVERNANCE" ar="القيادة" />
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-tblack">
                    <TransText
                        en="Parity & Diversity Committee"
                        fr="Comité Parité & Diversité"
                        ar="لجنة المساواة والتنوع"
                    />
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-tgray">
                    <TransText
                        en="A committee of committed professionals supporting our mission and guiding our initiatives."
                        fr="Un comité de professionnels engagés qui soutiennent notre mission et orientent nos initiatives."
                        ar="لجنة من مهنيين ملتزمين يدعمون رسالتنا ويوجهون مبادراتنا."
                    />
                </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {committee.map((member) => (
                    <div
                        key={member.name}
                        className="rounded-2xl border border-border bg-background p-4"
                    >
                        <div className="aspect-4/5 w-full overflow-hidden rounded-xl bg-secondary">
                            <img
                                src={member.photoUrl}
                                alt={member.name}
                                className="h-full w-full object-cover"
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <div className="mt-4">
                            <div className="text-sm font-semibold text-tblack">
                                {member.name}
                            </div>
                            <div className="mt-1 text-xs font-medium text-tgray">
                                {member.role === 'Chair' ? (
                                    <TransText en="Chair" fr="Présidente" ar="الرئيسة" />
                                ) : (
                                    <TransText en="Member" fr="Membre" ar="عضوة" />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}


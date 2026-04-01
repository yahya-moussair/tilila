const stats = [
    { label: 'Year founded', value: '2018' },
    { label: 'Experts onboard', value: '1000+' },
];

export default function MissionSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-6">
                    <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
                        <img
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                            alt="People collaborating in a meeting"
                            className="aspect-4/3 w-full object-cover"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>

                <div className="lg:col-span-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-alpha-blue px-4 py-1 text-xs font-semibold text-beta-blue">
                        <span className="size-2 rounded-full bg-beta-blue" />
                        <span>Our Mission &amp; History</span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-tblack">
                        Building a more inclusive media ecosystem
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-tgray">
                        Tilila supports parity and diversity by making it easier
                        for journalists, producers, and organizations to
                        discover expert voices across disciplines. We work with
                        partners to improve representation and raise the quality
                        of public debate.
                    </p>

                    <p className="mt-4 text-sm leading-6 text-tgray">
                        Through our programs and initiatives, we encourage
                        participation, celebrate excellence, and provide
                        resources that help media teams build stronger, fairer
                        narratives.
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        {stats.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-border bg-background p-5"
                            >
                                <div className="text-2xl font-semibold text-tblack">
                                    {item.value}
                                </div>
                                <div className="mt-1 text-xs font-medium text-tgray">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


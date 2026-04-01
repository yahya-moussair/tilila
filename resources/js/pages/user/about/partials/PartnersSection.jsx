const partners = [
    {
        id: 'un',
        name: 'United Nations',
        logoUrl: 'https://placehold.co/240x80/png?text=United%20Nations',
    },
    {
        id: 'unesco',
        name: 'UNESCO',
        logoUrl: 'https://placehold.co/240x80/png?text=UNESCO',
    },
    {
        id: 'un-women',
        name: 'UN Women',
        logoUrl: 'https://placehold.co/240x80/png?text=UN%20Women',
    },
    {
        id: 'unicef',
        name: 'UNICEF',
        logoUrl: 'https://placehold.co/240x80/png?text=UNICEF',
    },
    {
        id: 'world-bank',
        name: 'World Bank',
        logoUrl: 'https://placehold.co/240x80/png?text=World%20Bank',
    },
    {
        id: 'oecd',
        name: 'OECD',
        logoUrl: 'https://placehold.co/240x80/png?text=OECD',
    },
    {
        id: 'who',
        name: 'World Health Organization',
        logoUrl: 'https://placehold.co/240x80/png?text=WHO',
    },
    {
        id: 'eu',
        name: 'European Union',
        logoUrl: 'https://placehold.co/240x80/png?text=European%20Union',
    },
];

export default function PartnersSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="text-xs font-semibold tracking-widest text-tgray">
                        PARTNERSHIP
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-tblack">
                        Institutional Partners
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-tgray">
                        Building a network of allies advancing parity,
                        diversity, and high-quality public discourse.
                    </p>
                </div>

                <a
                    href="/#partners"
                    className="text-sm font-semibold text-beta-blue hover:underline"
                >
                    Become a Partner
                </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {partners.map((partner) => (
                    <div
                        key={partner.id}
                        className="flex h-16 items-center justify-center rounded-2xl border border-border bg-secondary px-6"
                    >
                        <img
                            src={partner.logoUrl}
                            alt={`${partner.name} logo`}
                            className="h-8 w-full object-contain"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={(event) => {
                                event.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}


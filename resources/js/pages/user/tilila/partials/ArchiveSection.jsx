import { GalleryHorizontal, Gavel, Trophy } from 'lucide-react';

const editions = [
    { year: '2023', edition: '5th Edition', theme: 'Digital Inclusion', hasGallery: true },
    { year: '2022', edition: '4th Edition', theme: 'Authenticity in Storytelling', hasGallery: true },
    { year: '2021', edition: '3rd Edition', theme: 'Resilience & Representation', hasGallery: false },
    { year: '2020', edition: '2nd Edition', theme: 'Parity in Crisis', hasGallery: false },
];

export default function ArchiveSection() {
    return (
        <section id="archive" className="mx-auto max-w-7xl px-4 pb-12 pt-10">
            <div className="text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-tblack sm:text-4xl">
                    Archive of Editions
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-tgray">
                    Explore the history of the Trophée Tilila. Dive into past ceremonies,
                    discover the illustrious jury members, and see the evolution of our mission.
                </p>
            </div>

            <div className="mt-10 rounded-2xl bg-background/60 p-4 sm:p-6">
                <div className="space-y-4">
                    {editions.map((edition) => (
                        <div
                            key={`${edition.year}-${edition.edition}`}
                            className="flex flex-col gap-4 rounded-2xl bg-beta-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-center gap-6">
                                <div className="text-4xl font-semibold tracking-tight text-tblack/10 sm:text-5xl">
                                    {edition.year}
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-tblack">
                                        {edition.edition}
                                    </div>
                                    <div className="text-sm text-tgray">
                                        Theme: “{edition.theme}”
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                                <a
                                    href="/tilila"
                                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary"
                                >
                                    <Trophy className="size-4 text-tgray" />
                                    Winners
                                </a>
                                <a
                                    href="/tilila"
                                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary"
                                >
                                    <Gavel className="size-4 text-tgray" />
                                    Jury
                                </a>
                                {edition.hasGallery ? (
                                    <a
                                        href="/tilila"
                                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-tblack transition-colors hover:bg-secondary"
                                    >
                                        <GalleryHorizontal className="size-4 text-tgray" />
                                        Gallery
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex items-center justify-center">
                    <a
                        href="/tilila"
                        className="text-sm font-semibold text-beta-blue hover:opacity-80"
                    >
                        View older editions
                    </a>
                </div>
            </div>
        </section>
    );
}


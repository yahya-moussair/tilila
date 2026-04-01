import { Download } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:pb-16 sm:pt-20">
            <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center rounded-full bg-beta-yellow px-4 py-1 text-xs font-semibold text-alpha-yellow">
                    CALL FOR YOUNG CREATIVES
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-tblack sm:text-5xl lg:text-6xl">
                    Tililab: Incubating the Next
                    <br />
                    Generation of{' '}
                    <span className="text-beta-blue">Creative Talent</span>
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-tgray sm:text-lg">
                    A dedicated space for young creators to develop gender-
                    sensitive advertising and media content. We provide
                    mentorship, resources, and a platform to shape a more
                    inclusive visual culture.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                        href="/#apply"
                        className="inline-flex items-center justify-center rounded-full bg-beta-blue px-6 py-2.5 text-sm font-semibold text-twhite transition-opacity hover:opacity-90"
                    >
                        Apply Now
                    </a>
                    <a
                        href="/#guidelines"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-semibold text-tblack transition-colors hover:bg-secondary"
                    >
                        <Download className="size-4 text-tgray" />
                        Download Guidelines
                    </a>
                </div>
            </div>
        </section>
    );
}


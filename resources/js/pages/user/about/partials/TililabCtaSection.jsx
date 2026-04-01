import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function TililabCtaSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-14">
            <div className="overflow-hidden rounded-3xl border border-border bg-alpha-blue">
                <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-7">
                        <div className="text-xs font-semibold tracking-widest text-beta-blue">
                            TILILAB
                        </div>
                        <h2 className="mt-3 text-2xl font-semibold text-tblack sm:text-3xl">
                            Explore Tililab program
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-tgray">
                            Discover the guidelines, key dates, and previous
                            winners. Tililab supports projects that amplify
                            parity and diversity in media.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link
                                href="/tililab"
                                className="inline-flex items-center gap-2 rounded-full bg-beta-blue px-6 py-2.5 text-sm font-semibold text-twhite transition-opacity hover:opacity-90"
                            >
                                Visit Tililab
                                <ArrowRight className="size-4" />
                            </Link>
                            <a
                                href="/tililab#key-dates"
                                className="inline-flex items-center justify-center rounded-full bg-background px-6 py-2.5 text-sm font-semibold text-tblack transition-colors hover:bg-secondary"
                            >
                                See key dates
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="rounded-2xl bg-background/70 p-6">
                            <div className="grid gap-4">
                                <div className="rounded-2xl border border-border bg-background px-5 py-4">
                                    <div className="text-xs font-semibold tracking-widest text-tgray">
                                        WHO
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-tblack">
                                        Applicants &amp; partners
                                    </div>
                                    <div className="mt-1 text-sm text-tgray">
                                        Journalists, media professionals, and
                                        organizations.
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-border bg-background px-5 py-4">
                                    <div className="text-xs font-semibold tracking-widest text-tgray">
                                        WHAT
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-tblack">
                                        Support &amp; recognition
                                    </div>
                                    <div className="mt-1 text-sm text-tgray">
                                        Training, mentoring, and visibility for
                                        impactful projects.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


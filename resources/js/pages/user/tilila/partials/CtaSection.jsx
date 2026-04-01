export default function CtaSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-14">
            <div className="rounded-3xl bg-beta-white px-6 py-14 text-center sm:px-10">
                <h2 className="text-4xl font-semibold tracking-tight text-tblack sm:text-5xl">
                    Ready to make a difference?
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-tgray">
                    Whether you are an advertiser, an agency, or a media partner, join the
                    movement towards a more inclusive advertising landscape.
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                    <a
                        href="/tilila#featured"
                        className="inline-flex h-11 items-center justify-center rounded-xl bg-background px-7 text-sm font-semibold text-beta-blue shadow-sm ring-1 ring-border transition-colors hover:bg-secondary"
                    >
                        Submit a Campaign
                    </a>
                    <a
                        href="/about#contact"
                        className="inline-flex h-11 items-center justify-center rounded-xl bg-tblack px-7 text-sm font-semibold text-twhite shadow-sm transition-opacity hover:opacity-90"
                    >
                        Contact the Committee
                    </a>
                </div>
            </div>
        </section>
    );
}


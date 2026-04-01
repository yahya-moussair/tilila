import { ShieldCheck } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:pb-24 sm:pt-24">
            <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-alpha-blue px-5 py-2 text-sm font-semibold text-beta-blue">
                    <ShieldCheck className="size-5" />
                    <span>Our Initiative</span>
                </div>

                <h1 className="mt-7 text-4xl font-semibold tracking-tight text-tblack sm:text-5xl lg:text-6xl">
                    Driving Parity &amp; Diversity
                    <br />
                    in Public Discourse
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-tgray sm:text-lg">
                    Tilila is committed to impactful media engagement and
                    representation. We build a trusted platform that connects
                    media and experts to elevate diverse voices, stories, and
                    solutions.
                </p>
            </div>
        </section>
    );
}


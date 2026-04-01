import { ArrowRight } from "lucide-react";

const stats = [
    {
        label: "Impact on Advertising",
        description:
            "Measuring how the Trophée Tilila has shifted the narrative in Moroccan media over the years.",
    },
    { value: "+45%", label: "ADS WITH GENDER PARITY" },
    { value: "300+", label: "CAMPAIGNS REVIEWED" },
    { value: "6", label: "EDITIONS CELEBRATED" },
];

export default function HeroSection() {
    return (
        <section className="relative w-full  sm:pb-28">
            {/* ── Dark hero panel ── */}
            <div className="relative h-[85vh] overflow-hidden"
                style={{ background: "linear-gradient(135deg, var(--color-tblack) 0%, #111827 60%, #1a2035 100%)" }}
            >
                {/* Gold glow blob */}
                <div
                    className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(194,157,87,0.12) 0%, transparent 70%)" }}
                />

                <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-28 pt-10 sm:px-10 sm:pb-32 sm:pt-14 lg:grid-cols-12 lg:items-center">

                    {/* ── Left: text ── */}
                    <div className="lg:col-span-7">
                        {/* Badge */}
                        <div
                            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-widest"
                            style={{
                                background: "rgba(194,157,87,0.18)",
                                border: "0.5px solid rgba(194,157,87,0.35)",
                                color: "var(--color-gold)",
                            }}
                        >
                            <span style={{ fontSize: 9 }}>✦</span>
                            SINCE 2018
                        </div>

                        {/* Heading */}
                        <h1
                            className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
                            style={{ fontFamily: "'Playfair Display', serif", color: "var(--color-twhite)", lineHeight: 1.05 }}
                        >
                            Trophée
                            <br />
                            <span style={{ color: "var(--color-gold)" }}>Tilila</span>
                        </h1>

                        {/* Description */}
                        <p
                            className="mt-5 max-w-xl text-base leading-7 sm:text-lg"
                            style={{ color: "rgba(255,255,255,0.62)" }}
                        >
                            Honoring the advertising campaigns that break stereotypes and
                            champion gender equality. A celebration of creativity committed
                            to diversity in Morocco and Africa.
                        </p>

                        {/* CTA buttons */}
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <button
                                className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                                style={{ background: "var(--color-gold)", color: "var(--color-tblack)" }}
                            >
                                Discover 2024 Winners
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                            <button
                                className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-colors"
                                style={{
                                    background: "rgba(255,255,255,0.07)",
                                    border: "0.5px solid rgba(255,255,255,0.22)",
                                    color: "var(--color-twhite)",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                            >
                                Participate
                            </button>
                        </div>
                    </div>

                    {/* ── Right: trophy card ── */}
                    <div className="lg:col-span-5">
                        <div
                            className="rounded-3xl p-3"
                            style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                            <div
                                className="overflow-hidden rounded-2xl"
                                style={{ border: "0.5px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.25)" }}
                            >
                                {/* Image slot — swap src for real photo */}
                                <div
                                    className="flex w-full items-center justify-center"
                                    style={{
                                        minHeight: 240,
                                        background: "linear-gradient(160deg, #1a1a2e 0%, #2a1a0e 60%, #1a1a2e 100%)",
                                    }}
                                >
                                    {/* Replace this SVG with: <img src="..." alt="Trophée Tilila" className="w-full aspect-[4/3] object-cover" /> */}
                                    <TrophySVG />
                                </div>

                                {/* Card footer */}
                                <div className="relative p-5">
                                    {/* Dot indicators */}
                                    <div className="mb-3 flex items-center gap-1.5">
                                        {[0.6, 0.38, 0.22, 0.12].map((opacity, i) => (
                                            <span
                                                key={i}
                                                className="block h-2 w-2 rounded-full"
                                                style={{ background: `rgba(255,255,255,${opacity})` }}
                                            />
                                        ))}
                                    </div>

                                    <p
                                        className="text-xs font-bold tracking-widest"
                                        style={{ color: "var(--color-gold)", marginBottom: 6 }}
                                    >
                                        THE MISSION
                                    </p>
                                    <p
                                        className="text-sm font-medium italic leading-relaxed"
                                        style={{ color: "rgba(255,255,255,0.80)" }}
                                    >
                                        "Advertising has the power to shape minds. Let's make sure
                                        it shapes a world of equality."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Stats bar — floats over the bottom edge ── */}
            <div className="pointer-events-none absolute inset-x-0 bottom-6">
                <div className="pointer-events-auto mx-auto max-w-7xl px-4 sm:px-10">
                    <div
                        className="rounded-2xl shadow-xl"
                        style={{
                            background: "var(--color-twhite)",
                            border: "0.5px solid #e5e7eb",
                        }}
                    >
                        <div className="grid gap-6 p-6 lg:grid-cols-12 lg:items-center lg:gap-0">

                            {/* Label + description */}
                            <div className="lg:col-span-5 lg:pr-6">
                                <p className="text-sm font-semibold" style={{ color: "var(--color-tblack)" }}>
                                    {stats[0].label}
                                </p>
                                <p className="mt-1.5 text-xs leading-6" style={{ color: "var(--color-tgray)" }}>
                                    {stats[0].description}
                                </p>
                            </div>

                            {/* Metrics */}
                            <div
                                className="grid gap-6 sm:grid-cols-3 lg:col-span-7 lg:pl-6"
                                style={{ borderLeft: "0.5px solid #e5e7eb" }}
                            >
                                {stats.slice(1).map((item, i) => (
                                    <div
                                        key={item.label}
                                        className="text-center sm:text-left lg:px-6"
                                        style={
                                            i < 2
                                                ? { borderRight: "0.5px solid #e5e7eb" }
                                                : {}
                                        }
                                    >
                                        <div
                                            className="text-3xl font-bold tracking-tight sm:text-4xl"
                                            style={{ color: "var(--color-beta-blue)" }}
                                        >
                                            {item.value}
                                        </div>
                                        <div
                                            className="mt-1 text-[0.65rem] font-semibold tracking-widest"
                                            style={{ color: "var(--color-tgray)" }}
                                        >
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TrophySVG() {
    return (
        <svg width="90" height="110" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15 10 H65 V45 C65 68 50 78 40 82 C30 78 15 68 15 45 Z"
                fill="none" stroke="#c29d57" strokeWidth="2.5"
            />
            <path d="M15 20 H5 C5 20 3 38 15 38" stroke="#c29d57" strokeWidth="2" strokeLinecap="round" />
            <path d="M65 20 H75 C75 20 77 38 65 38" stroke="#c29d57" strokeWidth="2" strokeLinecap="round" />
            <path d="M40 82 V90" stroke="#c29d57" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="24" y="90" width="32" height="6" rx="2" fill="#c29d57" opacity="0.8" />
            <circle cx="40" cy="46" r="10" fill="rgba(194,157,87,0.18)" stroke="#c29d57" strokeWidth="1.5" />
            <text x="40" y="51" fontSize="12" textAnchor="middle" fill="#c29d57" fontWeight="bold">★</text>
        </svg>
    );
}
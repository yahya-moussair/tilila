import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

const stats = [
    { label: 'Year founded', value: '2018' },
    { label: 'Experts onboard', value: '1000+' },
];

const committee = [
    { name: 'Khadija Bouzoubaa', role: 'Chair' },
    { name: 'Salim Cherdi', role: 'Member' },
    { name: 'Rabia Fassi', role: 'Member' },
    { name: 'Fatiha Derres', role: 'Member' },
];

const partnerPlaceholders = Array.from({ length: 8 }, (_, index) => ({
    id: index,
}));

export default function About() {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Head title="About" />

            <div className="bg-background">
                {/* Hero */}
                <section className="mx-auto max-w-7xl px-4 pb-10 pt-12">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-alpha-blue px-4 py-1 text-xs font-semibold text-beta-blue">
                            <ShieldCheck className="size-4" />
                            <span>Our Initiative</span>
                        </div>

                        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-tblack sm:text-4xl">
                            Driving Parity &amp; Diversity
                            <br />
                            in Public Discourse
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-tgray">
                            Tilila is committed to impactful media engagement and
                            representation. We build a trusted platform that
                            connects media and experts to elevate diverse
                            voices, stories, and solutions.
                        </p>
                    </div>
                </section>

                {/* Mission & history */}
                <section className="mx-auto max-w-7xl px-4 py-10">
                    <div className="grid items-center gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-6">
                            <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
                                <div className="aspect-4/3 w-full bg-alpha-blue" />
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
                                Tilila supports parity and diversity by making
                                it easier for journalists, producers, and
                                organizations to discover expert voices across
                                disciplines. We work with partners to improve
                                representation and raise the quality of public
                                debate.
                            </p>

                            <p className="mt-4 text-sm leading-6 text-tgray">
                                Through our programs and initiatives, we
                                encourage participation, celebrate excellence,
                                and provide resources that help media teams
                                build stronger, fairer narratives.
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

                {/* Committee */}
                <section className="mx-auto max-w-7xl px-4 py-12">
                    <div className="text-center">
                        <div className="text-xs font-semibold tracking-widest text-tgray">
                            LEADERSHIP
                        </div>
                        <h2 className="mt-3 text-2xl font-semibold text-tblack">
                            Comité Parité &amp; Diversité
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-tgray">
                            A committee of committed professionals supporting
                            our mission and guiding our initiatives.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {committee.map((member) => (
                            <div
                                key={member.name}
                                className="rounded-2xl border border-border bg-background p-4"
                            >
                                <div className="aspect-4/5 w-full overflow-hidden rounded-xl bg-secondary">
                                    <div className="h-full w-full bg-alpha-blue" />
                                </div>
                                <div className="mt-4">
                                    <div className="text-sm font-semibold text-tblack">
                                        {member.name}
                                    </div>
                                    <div className="mt-1 text-xs font-medium text-tgray">
                                        {member.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Partners */}
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
                        {partnerPlaceholders.map((p) => (
                            <div
                                key={p.id}
                                className="flex h-16 items-center justify-center rounded-2xl border border-border bg-secondary"
                            >
                                <div className="h-8 w-24 rounded-lg bg-alpha-blue" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="mx-auto max-w-7xl px-4 py-14">
                    <div className="grid gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <div className="text-xs font-semibold tracking-widest text-tgray">
                                CONTACT
                            </div>
                            <h2 className="mt-3 text-2xl font-semibold text-tblack">
                                Contact Us
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-tgray">
                                Reach out for partnerships, media inquiries, or
                                program questions. We’ll get back to you as soon
                                as possible.
                            </p>

                            <div className="mt-6 space-y-4 text-sm text-tgray">
                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                                        <MapPin className="size-4" />
                                    </span>
                                    <div>
                                        <div className="font-semibold text-tblack">
                                            Headquarters
                                        </div>
                                        <div>Casablanca, Morocco</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                                        <Mail className="size-4" />
                                    </span>
                                    <div>
                                        <div className="font-semibold text-tblack">
                                            Email Us
                                        </div>
                                        <a
                                            className="hover:text-tblack"
                                            href="mailto:contact@tilila.ma"
                                        >
                                            contact@tilila.ma
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-full bg-alpha-blue text-beta-blue">
                                        <Phone className="size-4" />
                                    </span>
                                    <div>
                                        <div className="font-semibold text-tblack">
                                            Call Us
                                        </div>
                                        <a
                                            className="hover:text-tblack"
                                            href="tel:+212522000000"
                                        >
                                            +212 5 22 00 00 00
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <form
                                onSubmit={handleSubmit}
                                className="rounded-2xl border border-border bg-background p-6"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-base font-semibold text-tblack">
                                        Send an Inquiry
                                    </h3>
                                    <span className="text-xs font-medium text-tgray">
                                        We respond within 1–2 business days
                                    </span>
                                </div>

                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    <label className="grid gap-2 text-sm">
                                        <span className="font-medium text-tblack">
                                            Full Name
                                        </span>
                                        <input
                                            className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-tblack placeholder:text-tgray focus:outline-none focus:ring-2 focus:ring-beta-blue/30"
                                            placeholder="Your name"
                                            name="fullName"
                                            autoComplete="name"
                                        />
                                    </label>

                                    <label className="grid gap-2 text-sm">
                                        <span className="font-medium text-tblack">
                                            Email
                                        </span>
                                        <input
                                            className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-tblack placeholder:text-tgray focus:outline-none focus:ring-2 focus:ring-beta-blue/30"
                                            placeholder="name@company.com"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </label>

                                    <label className="grid gap-2 text-sm sm:col-span-2">
                                        <span className="font-medium text-tblack">
                                            Subject
                                        </span>
                                        <input
                                            className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-tblack placeholder:text-tgray focus:outline-none focus:ring-2 focus:ring-beta-blue/30"
                                            placeholder="How can we help?"
                                            name="subject"
                                        />
                                    </label>

                                    <label className="grid gap-2 text-sm sm:col-span-2">
                                        <span className="font-medium text-tblack">
                                            Message
                                        </span>
                                        <textarea
                                            className="min-h-32 resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-tblack placeholder:text-tgray focus:outline-none focus:ring-2 focus:ring-beta-blue/30"
                                            placeholder="Write your message..."
                                            name="message"
                                        />
                                    </label>
                                </div>

                                <div className="mt-6 flex items-center justify-end">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-full bg-beta-blue px-6 py-2.5 text-sm font-semibold text-twhite transition-opacity hover:opacity-90"
                                    >
                                        <Send className="size-4" />
                                        Send Inquiry
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

About.layout = (page) => <AppLayout>{page}</AppLayout>;

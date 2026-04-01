import { Link } from '@inertiajs/react';
import { Mail, MessageCircle, Twitter } from 'lucide-react';
import { login } from '@/routes';

const platformLinks = [
    { label: 'Find an Expert', href: '/#experts' },
    { label: 'Join as Media', href: '/#join' },
    { label: 'Our Partners', href: '/#partners' },
];

const initiativesLinks = [
    { label: 'Trophée Tilila', href: '/#trophee' },
    { label: 'TilTalks', href: '/#tilltalks' },
    { label: 'Past Events', href: '/#events' },
    { label: 'Resources', href: '/#resources' },
];

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 py-14">
                <div className="grid gap-10 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-3 text-tblack">
                            <span className="grid size-10 place-items-center rounded-full bg-alpha-blue">
                                <img
                                    src="/assets/logo.webp"
                                    alt="Tilila"
                                    className="size-6 object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </span>
                            <span className="text-base font-semibold tracking-wide">
                                TILILA
                            </span>
                        </div>

                        <p className="mt-5 max-w-xs text-sm leading-6 text-tgray">
                            An initiative committed to parity and diversity in
                            media. Empowering voices, changing narratives.
                        </p>

                        <div className="mt-5 flex items-center gap-4 text-tgray">
                            <a
                                href="/"
                                aria-label="Twitter"
                                className="inline-flex size-9 items-center justify-center rounded-full bg-alpha-blue text-beta-blue transition-colors hover:bg-beta-blue hover:text-twhite"
                            >
                                <Twitter className="size-4" />
                            </a>
                            <a
                                href="/"
                                aria-label="Community"
                                className="inline-flex size-9 items-center justify-center rounded-full bg-alpha-blue text-beta-blue transition-colors hover:bg-beta-blue hover:text-twhite"
                            >
                                <MessageCircle className="size-4" />
                            </a>
                            <a
                                href="mailto:contact@tilila.ma"
                                aria-label="Email"
                                className="inline-flex size-9 items-center justify-center rounded-full bg-alpha-blue text-beta-blue transition-colors hover:bg-beta-blue hover:text-twhite"
                            >
                                <Mail className="size-4" />
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-2 md:col-start-6">
                        <h3 className="text-sm font-semibold text-tblack">
                            Platform
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-tgray">
                            {platformLinks.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="transition-colors hover:text-tblack"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href={login()}
                                    className="transition-colors hover:text-tblack"
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-sm font-semibold text-tblack">
                            Initiatives
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-tgray">
                            {initiativesLinks.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="transition-colors hover:text-tblack"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h3 className="text-sm font-semibold text-tblack">
                            Contact
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-tgray">
                            <li>Casablanca, Morocco</li>
                            <li>
                                <a
                                    href="mailto:contact@tilila.ma"
                                    className="transition-colors hover:text-tblack"
                                >
                                    contact@tilila.ma
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+212522000000"
                                    className="transition-colors hover:text-tblack"
                                >
                                    +212 5 22 00 00 00
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-tgray md:flex-row md:items-center md:justify-between">
                    <span>© 2023 Tilila. All rights reserved.</span>
                    <span>
                        Powered by <span className="font-semibold">2M</span>
                    </span>
                </div>
            </div>
        </footer>
    );
}
import { Link, usePage } from '@inertiajs/react';
import { home, login, register, dashboard } from '@/routes';

const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Tililab', href: '/tililab' },
    { label: 'Experts', href: '/#experts' },
    { label: 'Events', href: '/#events' },
    { label: 'Trophée', href: '/#trophee' },
];

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <header className="border-b border-border bg-background">
            <div className="mx-auto flex max-w-7xl items-center gap-6 px-4">
                <Link
                    href={home()}
                    className="flex items-center gap-3 text-tblack"
                >

                    <img
                        src="/assets/logo.webp"
                        alt="Tilila"
                        className="size-25 object-contain"
                        loading="eager"
                        decoding="async"
                    /> 
                </Link>

                <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-sm font-medium text-tgray transition-colors hover:text-tblack"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-3">
                    {auth?.user ? (
                        <Link
                            href={dashboard()}
                            className="inline-flex items-center justify-center rounded-full bg-alpha-blue px-5 py-2 text-sm font-semibold text-beta-blue transition-colors hover:bg-beta-blue hover:text-twhite"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-flex items-center justify-center rounded-full bg-alpha-blue px-5 py-2 text-sm font-semibold text-beta-blue transition-colors hover:bg-beta-blue hover:text-twhite"
                            >
                                Login
                            </Link>
                            <Link
                                href={register()}
                                className="inline-flex items-center justify-center rounded-full bg-beta-blue px-5 py-2 text-sm font-semibold text-twhite transition-colors hover:opacity-90"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
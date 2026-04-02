import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { home, login, register, dashboard } from '@/routes';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';

const navItems = [
    { en: 'About', fr: 'À propos', ar: 'حول', href: '/about' },
    { en: 'Tililab', fr: 'Tililab', ar: 'تيليلاب', href: '/tililab' },
    { en: 'Tilila', fr: 'Tilila', ar: 'تيليلا', href: '/tilila' },
    { en: 'Governance', fr: 'Gouvernance', ar: 'الحوكمة', href: '/gouvernance' },
    { en: 'Experts', fr: 'Experts', ar: 'الخبراء', href: '/experts' },
    { en: 'Events', fr: 'Événements', ar: 'الفعاليات', href: '/events' },
    { en: 'Opportunities', fr: 'Opportunités', ar: 'الفرص', href: '/opportunities' },
    { en: 'Media', fr: 'Média', ar: 'الوسائط', href: '/media' },
];

export default function Navbar() {
    const { auth } = usePage().props;
    const { t } = useTranslation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const headerRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        if (!mobileOpen) {
            return undefined;
        }

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                setMobileOpen(false);
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [mobileOpen]);

    useEffect(() => {
        if (!mobileOpen) {
            return undefined;
        }

        const onPointerDown = (event) => {
            const menuElement = mobileMenuRef.current;
            if (!menuElement) {
                return;
            }

            if (menuElement.contains(event.target)) {
                return;
            }

            setMobileOpen(false);
        };

        document.addEventListener('pointerdown', onPointerDown, true);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown, true);
        };
    }, [mobileOpen]);

    useEffect(() => {
        if (!mobileOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [mobileOpen]);

    const closeMobile = () => setMobileOpen(false);

    const authButtonClass =
        'inline-flex items-center justify-center rounded-full bg-alpha-blue px-5 py-2 text-sm font-semibold text-beta-blue transition-colors hover:bg-beta-blue hover:text-twhite';
    const registerButtonClass =
        'inline-flex items-center justify-center rounded-full bg-beta-blue px-5 py-2 text-sm font-semibold text-twhite transition-colors hover:opacity-90';

    return (
        <header
            ref={headerRef}
            className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:gap-6">
                <Link
                    href={home()}
                    className="flex shrink-0 items-center gap-3 text-tblack"
                    onClick={closeMobile}
                >
                    <img
                        src="/assets/logo.webp"
                        alt="Tilila"
                        className="h-10 w-auto object-contain"
                        loading="eager"
                        decoding="async"
                    />
                </Link>

                <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.en}
                            href={item.href}
                            className="text-sm font-medium text-tgray transition-colors hover:text-tblack"
                        >
                            <TransText en={item.en} fr={item.fr} ar={item.ar} />
                        </Link>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-3">
                    <LanguageSwitcher className="hidden md:flex" />
                    {auth?.user ? (
                        <Link href={dashboard()} className={authButtonClass}>
                            <TransText en="Dashboard" fr="Tableau de bord" ar="لوحة التحكم" />
                        </Link>
                    ) : null}
                </div>

                <div className="ml-auto flex md:hidden">
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-tblack transition-colors hover:bg-alpha-blue/40"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav-menu"
                        aria-label={
                            mobileOpen ? t('nav.mobileCloseMenuAria') : t('nav.mobileOpenMenuAria')
                        }
                        onClick={() => setMobileOpen((open) => !open)}
                    >
                        {mobileOpen ? (
                            <X className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Menu className="h-6 w-6" strokeWidth={2} />
                        )}
                    </button>
                </div>
            </div>

            {mobileOpen ? (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-tblack/10 md:hidden"
                        onClick={closeMobile}
                        aria-hidden="true"
                    />
                    <div
                        id="mobile-nav-menu"
                        ref={mobileMenuRef}
                        className="fixed inset-x-0 top-0 z-50 bg-background md:hidden"
                    >
                        <div className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
                            <div className="mx-auto flex h-16 max-w-7xl items-center justify-end px-4">
                                <button
                                    type="button"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-tblack transition-colors hover:bg-alpha-blue/40"
                                    aria-label={t('nav.mobileCloseMenuAria')}
                                    onClick={closeMobile}
                                >
                                    <X className="h-6 w-6" strokeWidth={2} />
                                </button>
                            </div>
                        </div>
                        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-3 pt-20">
                            <div className="pb-2">
                                <LanguageSwitcher className="w-fit" />
                            </div>
                        {navItems.map((item) => (
                            <Link
                                key={item.en}
                                href={item.href}
                                className="rounded-lg px-3 py-2.5 text-sm font-medium text-tgray transition-colors hover:bg-alpha-blue/30 hover:text-tblack"
                                onClick={closeMobile}
                            >
                                <TransText en={item.en} fr={item.fr} ar={item.ar} />
                            </Link>
                        ))}
                        <div className="my-2 border-t border-border" />
                        {auth?.user ? (
                            <Link
                                href={dashboard()}
                                className={`${authButtonClass} justify-center`}
                                onClick={closeMobile}
                            >
                                <TransText en="Dashboard" fr="Tableau de bord" ar="لوحة التحكم" />
                            </Link>
                        ) : (
                            <div className="flex flex-col gap-2 pb-1">
                                <Link
                                    href={login()}
                                    className={`${authButtonClass} justify-center`}
                                    onClick={closeMobile}
                                >
                                    <TransText en="Login" fr="Connexion" ar="تسجيل الدخول" />
                                </Link>
                                <Link
                                    href={register()}
                                    className={`${registerButtonClass} justify-center`}
                                    onClick={closeMobile}
                                >
                                    <TransText en="Register" fr="S’inscrire" ar="إنشاء حساب" />
                                </Link>
                            </div>
                        )}
                        </nav>
                    </div>
                </>
            ) : null}
        </header>
    );
}

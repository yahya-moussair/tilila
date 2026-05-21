import { Head, router, setLayoutProps } from '@inertiajs/react';
import {
    Briefcase,
    Calendar,
    CheckCircle2,
    ExternalLink,
    FileText,
    Globe2,
    Instagram,
    Languages,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    User,
    XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { useTranslation } from '@/contexts/TranslationContext';
import { buildLanguageOptions } from '@/components/helpers/expert-form-options';
import { cn } from '@/lib/utils';

function InfoItem({ icon: Icon, label, value, className = '' }) {
    return (
        <div className={cn('flex gap-3', className)}>
            {Icon ? (
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-beta-blue/10 text-beta-blue">
                    <Icon className="size-4" />
                </span>
            ) : null}
            <div className="min-w-0">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {label}
                </p>
                <p className="mt-0.5 text-sm wrap-break-word text-foreground">
                    {value || '—'}
                </p>
            </div>
        </div>
    );
}

function SectionCard({ title, description, children, className = '' }) {
    return (
        <section
            className={cn(
                'rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6',
                className,
            )}
        >
            <div className="mb-4">
                <h2 className="text-base font-semibold text-tblack">{title}</h2>
                {description ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                ) : null}
            </div>
            {children}
        </section>
    );
}

function TagList({ items, variant = 'default' }) {
    if (!items?.length) {
        return <span className="text-sm text-muted-foreground">—</span>;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <span
                    key={item}
                    className={cn(
                        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
                        variant === 'expertise'
                            ? 'border-beta-blue/25 bg-beta-blue/10 text-beta-blue'
                            : 'border-border/70 bg-background text-foreground',
                    )}
                >
                    {item}
                </span>
            ))}
        </div>
    );
}

function LangBlock({ lang, name, title, expertise, bio }) {
    return (
        <div className="rounded-xl border border-border/70 bg-background p-4">
            <div className="mb-3 inline-flex items-center rounded-full border border-border/70 bg-card px-2.5 py-0.5 text-xs font-bold tracking-wide text-beta-blue">
                {lang}
            </div>
            <div className="space-y-3">
                <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Name
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                        {name || '—'}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Title
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                        {title || '—'}
                    </p>
                </div>
                {expertise ? (
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Expertise
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground">
                            {expertise}
                        </p>
                    </div>
                ) : null}
                {bio ? (
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Bio
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {bio}
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function statusClass(status) {
    switch (status) {
        case 'accepted':
            return 'border-alpha-green/40 bg-beta-green text-alpha-green';
        case 'denied':
            return 'border-alpha-danger/40 bg-beta-danger text-alpha-danger';
        default:
            return 'border-alpha-yellow/50 bg-beta-yellow text-alpha-yellow';
    }
}

function getCityLabel(application) {
    return (
        application?.city_i18n?.en ||
        application?.city_i18n?.fr ||
        application?.city_i18n?.ar ||
        ''
    );
}

function getI18nValue(value) {
    if (Array.isArray(value)) {
        return value
            .map((item) => item?.fr || item?.en || item?.ar || '')
            .filter(Boolean)
            .join(', ');
    }

    return value?.en || value?.fr || value?.ar || '';
}

function expertiseTags(value, lang = 'fr') {
    if (Array.isArray(value)) {
        return value
            .map((item) => item?.[lang] || item?.fr || item?.en || '')
            .filter(Boolean);
    }

    const raw = value?.[lang] ?? value?.fr ?? '';
    if (!raw) {
        return [];
    }

    return raw
        .split(/[,;\n]+/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function expertiseForLang(value, lang) {
    if (Array.isArray(value)) {
        return value
            .map((item) => item?.[lang] || '')
            .filter(Boolean)
            .join(', ');
    }

    return value?.[lang] ?? '';
}

function regionLabel(scope) {
    switch (scope) {
        case 'maroc':
            return 'Morocco';
        case 'afrique':
            return 'Africa';
        case 'diaspora':
            return 'Diaspora';
        default:
            return scope || '—';
    }
}

function SocialLink({ href, label, icon: Icon }) {
    const url = (href ?? '').trim();
    if (!url) {
        return null;
    }

    const external = /^https?:\/\//i.test(url) ? url : `https://${url}`;

    return (
        <a
            href={external}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:border-beta-blue hover:bg-beta-blue/5 hover:text-beta-blue"
        >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{label}</span>
            <ExternalLink className="size-3.5 shrink-0 opacity-60" />
        </a>
    );
}

export default function AdminExpertApplicationShow({ application }) {
    const { locale } = useTranslation();
    const a = application ?? {};
    const [denyOpen, setDenyOpen] = useState(false);
    const [denyNote, setDenyNote] = useState('');
    const languageCodes = Array.isArray(a.languages) ? a.languages : [];
    const languageOptions = useMemo(
        () => buildLanguageOptions(locale),
        [locale],
    );
    const languageLabels = useMemo(() => {
        const byValue = new Map(
            languageOptions.map((option) => [option.value, option.label]),
        );

        return languageCodes.map((code) => byValue.get(code) ?? code);
    }, [languageCodes, languageOptions]);
    const expertiseChips = expertiseTags(a.expertise_i18n, 'fr');
    const displayName = getI18nValue(a.name_i18n) || 'Application';
    const displayTitle = getI18nValue(a.title_i18n);

    const submittedAt = a.created_at
        ? new Date(a.created_at).toLocaleString()
        : '—';
    const reviewedAt = a.reviewed_at
        ? new Date(a.reviewed_at).toLocaleString()
        : '—';

    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/admin/dashboard' },
            {
                title: 'Expert Applications',
                href: '/admin/expert-applications',
            },
            { title: `#${a.id ?? ''}`, href: '#' },
        ],
        title: displayName,
        description: 'Review this application and accept or deny it.',
    });

    const review = (decision) => {
        if (decision === 'denied') {
            setDenyOpen(true);
            return;
        }

        router.patch(`/admin/expert-applications/${a.id}/review`, {
            decision,
        });
    };

    const submitDeny = () => {
        router.patch(
            `/admin/expert-applications/${a.id}/review`,
            {
                decision: 'denied',
                admin_notes: denyNote,
            },
            {
                onSuccess: () => {
                    setDenyOpen(false);
                    setDenyNote('');
                },
            },
        );
    };

    return (
        <>
            <Head title={`Expert Application #${a.id ?? ''}`} />

            <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
                <div className="grid gap-6 lg:grid-cols-12">
                    <aside className="space-y-6 lg:col-span-4">
                        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
                            <div className="p-5">
                                <div className="mx-auto size-32 overflow-hidden rounded-2xl border-4 border-card bg-muted shadow-md">
                                    {a.image_url ? (
                                        <img
                                            src={a.image_url}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-beta-blue/10 text-2xl font-bold text-beta-blue">
                                            {displayName
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 text-center">
                                    <h1 className="text-lg font-extrabold text-tblack">
                                        {displayName}
                                    </h1>
                                    {displayTitle ? (
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {displayTitle}
                                        </p>
                                    ) : null}
                                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                                        <span
                                            className={cn(
                                                'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
                                                statusClass(a.status),
                                            )}
                                        >
                                            {a.status || 'pending'}
                                        </span>
                                        {a.region_scope ? (
                                            <span className="inline-flex rounded-full border border-border/70 bg-background px-2.5 py-0.5 text-xs font-medium text-foreground">
                                                {regionLabel(a.region_scope)}
                                            </span>
                                        ) : null}
                                        {a.expert_id ? (
                                            <span className="inline-flex rounded-full border border-alpha-green/40 bg-beta-green px-2.5 py-0.5 text-xs font-medium text-alpha-green">
                                                Published
                                            </span>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="mt-5 space-y-3 border-t border-border/70 pt-5">
                                    <InfoItem
                                        icon={Mail}
                                        label="Email"
                                        value={a.email}
                                    />
                                    <InfoItem
                                        icon={Phone}
                                        label="Phone"
                                        value={a.phone}
                                    />
                                    <InfoItem
                                        icon={MapPin}
                                        label="Location"
                                        value={[getCityLabel(a), a.country]
                                            .filter(Boolean)
                                            .join(', ')}
                                    />
                                    <InfoItem
                                        icon={Calendar}
                                        label="Submitted"
                                        value={submittedAt}
                                    />
                                </div>

                                <div className="mt-5 flex flex-col gap-2">
                                    {a.cv_url ? (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full gap-2"
                                            onClick={() =>
                                                window.open(
                                                    a.cv_url,
                                                    '_blank',
                                                    'noopener,noreferrer',
                                                )
                                            }
                                        >
                                            <FileText className="size-4" />
                                            Open CV
                                        </Button>
                                    ) : null}

                                    {a.status === 'pending' ? (
                                        <>
                                            <Button
                                                type="button"
                                                className="w-full gap-2 bg-alpha-green text-twhite hover:bg-alpha-green/90"
                                                onClick={() =>
                                                    review('accepted')
                                                }
                                            >
                                                <CheckCircle2 className="size-4" />
                                                Accept application
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                className="w-full gap-2"
                                                onClick={() =>
                                                    setDenyOpen(true)
                                                }
                                            >
                                                <XCircle className="size-4" />
                                                Deny application
                                            </Button>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <SectionCard
                            title="Application meta"
                            description="Locale and submission context."
                        >
                            <div className="space-y-4">
                                <InfoItem
                                    icon={Globe2}
                                    label="Form locale"
                                    value={a.locale}
                                />
                                <InfoItem
                                    icon={Briefcase}
                                    label="Region scope"
                                    value={regionLabel(a.region_scope)}
                                />
                                <InfoItem
                                    icon={User}
                                    label="Application ID"
                                    value={`#${a.id}`}
                                />
                            </div>
                        </SectionCard>

                        <SectionCard
                            title="Review"
                            description="Decision history and internal notes."
                        >
                            <div className="space-y-4">
                                <InfoItem
                                    label="Reviewed at"
                                    value={reviewedAt}
                                />
                                <InfoItem
                                    label="Reviewed by"
                                    value={
                                        a.reviewed_by
                                            ? `${a.reviewed_by.name ?? ''} (${a.reviewed_by.email ?? ''})`
                                            : ''
                                    }
                                />
                                {a.status !== 'pending' ? (
                                    <InfoItem
                                        label="Featured on front"
                                        value={
                                            a.expert?.on_front ? 'Yes' : 'No'
                                        }
                                    />
                                ) : null}
                                {a.admin_notes ? (
                                    <div className="rounded-lg border border-border/70 bg-background p-3">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                                            Admin notes
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-foreground">
                                            {a.admin_notes}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </SectionCard>
                    </aside>

                    <div className="space-y-6 lg:col-span-8">
                        {expertiseChips.length > 0 ? (
                            <SectionCard
                                title="Areas of expertise"
                                description="Domains selected from the official list."
                            >
                                <TagList
                                    items={expertiseChips}
                                    variant="expertise"
                                />
                            </SectionCard>
                        ) : null}

                        <SectionCard
                            title="Profile information"
                            description="Name, title, expertise and bio per locale."
                        >
                            <div className="flex flex-col gap-4">
                                <LangBlock
                                    lang="FR"
                                    name={a.name_i18n?.fr}
                                    title={a.title_i18n?.fr}
                                    expertise={expertiseForLang(
                                        a.expertise_i18n,
                                        'fr',
                                    )}
                                    bio={a.bio_i18n?.fr}
                                />
                                <LangBlock
                                    lang="EN"
                                    name={a.name_i18n?.en}
                                    title={a.title_i18n?.en}
                                    expertise={expertiseForLang(
                                        a.expertise_i18n,
                                        'en',
                                    )}
                                    bio={a.bio_i18n?.en}
                                />
                                <LangBlock
                                    lang="AR"
                                    name={a.name_i18n?.ar}
                                    title={a.title_i18n?.ar}
                                    expertise={expertiseForLang(
                                        a.expertise_i18n,
                                        'ar',
                                    )}
                                    bio={a.bio_i18n?.ar}
                                />
                            </div>
                        </SectionCard>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <SectionCard
                                title="Languages"
                                description="Languages declared by the applicant."
                            >
                                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                    <Languages className="size-4 text-beta-blue" />
                                    <TagList items={languageLabels} />
                                </div>
                            </SectionCard>

                            <SectionCard
                                title="Social links"
                                description="Public profiles shared by the applicant."
                            >
                                <div className="grid gap-2 sm:grid-cols-2">
                                    <SocialLink
                                        href={a.socials?.linkedin}
                                        label="LinkedIn"
                                        icon={Linkedin}
                                    />
                                    <SocialLink
                                        href={a.socials?.twitter}
                                        label="X (Twitter)"
                                        icon={ExternalLink}
                                    />
                                    <SocialLink
                                        href={a.socials?.instagram}
                                        label="Instagram"
                                        icon={Instagram}
                                    />
                                    <SocialLink
                                        href={a.socials?.portfolio}
                                        label="Portfolio"
                                        icon={ExternalLink}
                                    />
                                </div>
                                {!a.socials?.linkedin &&
                                !a.socials?.twitter &&
                                !a.socials?.instagram &&
                                !a.socials?.portfolio ? (
                                    <p className="mt-3 text-sm text-muted-foreground">
                                        No social links provided.
                                    </p>
                                ) : null}
                            </SectionCard>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={denyOpen}
                onOpenChange={(open) => {
                    setDenyOpen(open);
                    if (!open) {
                        setDenyNote('');
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deny expert application</DialogTitle>
                        <DialogDescription>
                            Add an optional note that will be saved with this
                            decision.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2">
                        <label
                            htmlFor="deny-note"
                            className="text-sm font-medium text-foreground"
                        >
                            Admin note
                        </label>
                        <textarea
                            id="deny-note"
                            value={denyNote}
                            onChange={(e) => setDenyNote(e.target.value)}
                            placeholder="Reason for denial (optional)..."
                            className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDenyOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={submitDeny}
                        >
                            Confirm deny
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

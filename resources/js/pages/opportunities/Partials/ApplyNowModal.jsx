import React, { useId, useMemo, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from '@/contexts/TranslationContext';
import { pickLocalized } from '@/lib/pickLocalized';
import { useForm } from '@inertiajs/react';

function formatFileSize(bytes) {
    if (typeof bytes !== 'number' || Number.isNaN(bytes)) return '';
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
}

function Field({ label, children, htmlFor, hint }) {
    return (
        <div className="space-y-1.5">
            <label
                htmlFor={htmlFor}
                className="text-[11px] font-extrabold tracking-wide text-muted-foreground uppercase"
            >
                {label}
            </label>
            {children}
            {hint ? (
                <div className="text-xs text-muted-foreground">{hint}</div>
            ) : null}
        </div>
    );
}

function Input({
    id,
    name,
    type = 'text',
    placeholder,
    autoComplete,
    value,
    onChange,
}) {
    return (
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
    );
}

function Textarea({ id, name, placeholder, rows = 4, value, onChange }) {
    return (
        <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange={onChange}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
    );
}

function UploadBox({ id, name, title, subtitle, onFile }) {
    return (
        <label
            htmlFor={id}
            className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-6 text-center shadow-sm transition hover:bg-accent/40"
        >
            <div className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                Upload
            </div>
            <div className="text-sm font-extrabold text-foreground">
                {title}
            </div>
            <div className="text-xs text-muted-foreground">{subtitle}</div>
            <input
                id={id}
                name={name}
                type="file"
                className="sr-only"
                onChange={(e) => onFile?.(e.target.files?.[0] ?? null)}
            />
        </label>
    );
}

function FilePreview({ file, onClear }) {
    if (!file) return null;
    return (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left shadow-sm">
            <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">
                    {file.name}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                    {file.type || 'file'} • {formatFileSize(file.size)}
                </div>
            </div>
            <button
                type="button"
                onClick={onClear}
                className="shrink-0 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
                Remove
            </button>
        </div>
    );
}

function SectionCard({ title, description, children }) {
    return (
        <section className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:grid-cols-12">
            <div className="md:col-span-4">
                <div className="text-sm font-extrabold text-beta-blue">
                    {title}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {description}
                </div>
            </div>
            <div className="md:col-span-8">{children}</div>
        </section>
    );
}

export default function ApplyNowModal({
    isOpen,
    onClose,
    opportunityTitle,
    opportunitySlug,
    applyPathPrefix = '/opportunities',
}) {
    const { locale, t } = useTranslation();
    const formId = useId();
    const fullNameId = `${formId}-full-name`;
    const emailId = `${formId}-email`;
    const phoneId = `${formId}-phone`;
    const countryId = `${formId}-country`;
    const roleId = `${formId}-role`;
    const orgId = `${formId}-org`;
    const motivationId = `${formId}-motivation`;
    const resumeId = `${formId}-resume`;
    const portfolioId = `${formId}-portfolio`;

    const experienceOptions = useMemo(
        () => [
            { value: '1-3', label: '1-3 Years' },
            { value: '4-7', label: '4-7 Years' },
            { value: '8+', label: '8+ Years' },
        ],
        [],
    );

    const [experience, setExperience] = useState(experienceOptions[0]?.value);
    const [agreedCharter, setAgreedCharter] = useState(false);
    const [agreedPrivacy, setAgreedPrivacy] = useState(false);

    const canSubmit = agreedCharter && agreedPrivacy;

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            full_name: '',
            email: '',
            phone: '',
            country: '',
            current_role: '',
            organization: '',
            years_experience: experienceOptions[0]?.value ?? '',
            motivation: '',
            resume: null,
            portfolio_link: '',
            locale,
        });

    const modalTitle =
        pickLocalized(opportunityTitle, locale) ||
        t('opportunities.detail.fallbackHeadTitle');

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[85vh] overflow-y-auto p-0 sm:max-w-5xl">
                <div className="border-b border-border bg-background px-6 py-5 sm:px-8">
                    <DialogHeader className="space-y-2 text-left">
                        <div className="text-[11px] font-extrabold tracking-wide text-muted-foreground uppercase">
                            Application Form
                        </div>
                        <DialogTitle className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                            {modalTitle}
                        </DialogTitle>
                        <DialogDescription className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                            Complete the form below to apply. All fields should
                            be accurate and up to date.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form
                    className="space-y-6 bg-background px-6 py-6 sm:px-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!canSubmit) return;
                        if (!opportunitySlug) return;
                        clearErrors();
                        post(
                            `${applyPathPrefix.replace(/\/$/, '')}/${encodeURIComponent(opportunitySlug)}/apply`,
                            {
                                forceFormData: true,
                                preserveScroll: true,
                                onSuccess: () => {
                                    reset();
                                    setExperience(experienceOptions[0]?.value);
                                    setAgreedCharter(false);
                                    setAgreedPrivacy(false);
                                    onClose();
                                },
                            },
                        );
                    }}
                >
                    <SectionCard
                        title="Identity & Contact"
                        description="Essential details for your candidate profile and communication."
                    >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Field label="Full Name" htmlFor={fullNameId}>
                                <Input
                                    id={fullNameId}
                                    name="full_name"
                                    placeholder="Your full name"
                                    autoComplete="name"
                                    value={data.full_name}
                                    onChange={(e) =>
                                        setData('full_name', e.target.value)
                                    }
                                />
                                {errors.full_name ? (
                                    <div className="text-xs text-alpha-danger">
                                        {errors.full_name}
                                    </div>
                                ) : null}
                            </Field>
                            <Field label="Email Address" htmlFor={emailId}>
                                <Input
                                    id={emailId}
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                {errors.email ? (
                                    <div className="text-xs text-alpha-danger">
                                        {errors.email}
                                    </div>
                                ) : null}
                            </Field>
                            <Field label="Phone Number" htmlFor={phoneId}>
                                <Input
                                    id={phoneId}
                                    name="phone"
                                    type="tel"
                                    placeholder="+212 6xx xxx xxx"
                                    autoComplete="tel"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                />
                            </Field>
                            <Field
                                label="Country of Residence"
                                htmlFor={countryId}
                            >
                                <select
                                    id={countryId}
                                    name="country"
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                    value={data.country}
                                    onChange={(e) =>
                                        setData('country', e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Select Country
                                    </option>
                                    <option value="MA">Morocco</option>
                                    <option value="TN">Tunisia</option>
                                    <option value="DZ">Algeria</option>
                                    <option value="EG">Egypt</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </Field>
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="Expertise"
                        description="Tell us about your current standing and impact in the media industry."
                    >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Field label="Current Role" htmlFor={roleId}>
                                <Input
                                    id={roleId}
                                    name="current_role"
                                    placeholder="e.g., Senior Journalist"
                                    autoComplete="organization-title"
                                    value={data.current_role}
                                    onChange={(e) =>
                                        setData('current_role', e.target.value)
                                    }
                                />
                            </Field>
                            <Field label="Organization" htmlFor={orgId}>
                                <Input
                                    id={orgId}
                                    name="organization"
                                    placeholder="e.g., Independent Media Hub"
                                    autoComplete="organization"
                                    value={data.organization}
                                    onChange={(e) =>
                                        setData('organization', e.target.value)
                                    }
                                />
                            </Field>
                        </div>

                        <div className="mt-5">
                            <div className="text-[11px] font-extrabold tracking-wide text-muted-foreground uppercase">
                                Years of Experience
                            </div>
                            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {experienceOptions.map((option) => {
                                    const selected =
                                        experience === option.value;
                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => {
                                                setExperience(option.value);
                                                setData(
                                                    'years_experience',
                                                    option.value,
                                                );
                                            }}
                                            className={[
                                                'rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition',
                                                selected
                                                    ? 'border-beta-blue bg-alpha-blue/30 text-beta-blue'
                                                    : 'border-border bg-background text-foreground hover:bg-accent/40',
                                            ].join(' ')}
                                            aria-pressed={selected}
                                        >
                                            {option.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="Vision & Intent"
                        description="Why do you want to join this specific leadership cohort?"
                    >
                        <Field
                            label="Motivation Statement (max 500 words)"
                            htmlFor={motivationId}
                        >
                            <Textarea
                                id={motivationId}
                                name="motivation"
                                rows={5}
                                placeholder="Describe your career goals and how this program aligns with your vision for the future of media..."
                                value={data.motivation}
                                onChange={(e) =>
                                    setData('motivation', e.target.value)
                                }
                            />
                        </Field>
                    </SectionCard>

                    <SectionCard
                        title="Portfolio"
                        description="Upload evidence of your work and your professional journey."
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <UploadBox
                                    id={resumeId}
                                    name="resume"
                                    title="Upload CV/Resume"
                                    subtitle="PDF/DOC (Max 5MB)"
                                    onFile={(file) => setData('resume', file)}
                                />
                                <FilePreview
                                    file={data.resume}
                                    onClear={() => setData('resume', null)}
                                />
                                {errors.resume ? (
                                    <div className="mt-2 text-xs text-alpha-danger">
                                        {errors.resume}
                                    </div>
                                ) : null}
                            </div>

                            <Field
                                label="Portfolio link"
                                htmlFor={portfolioId}
                                hint="Paste a public URL (Drive, Notion, website, etc.)"
                            >
                                <Input
                                    id={portfolioId}
                                    name="portfolio_link"
                                    type="url"
                                    placeholder="https://…"
                                    autoComplete="url"
                                    value={data.portfolio_link}
                                    onChange={(e) =>
                                        setData(
                                            'portfolio_link',
                                            e.target.value,
                                        )
                                    }
                                />
                                {errors.portfolio_link ? (
                                    <div className="text-xs text-alpha-danger">
                                        {errors.portfolio_link}
                                    </div>
                                ) : null}
                            </Field>
                        </div>
                    </SectionCard>

                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-start gap-3 text-sm">
                                <input
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-border text-beta-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                    checked={agreedCharter}
                                    onChange={(e) =>
                                        setAgreedCharter(e.target.checked)
                                    }
                                />
                                <span className="text-muted-foreground">
                                    I have read and agree to the{' '}
                                    <span className="font-semibold text-beta-blue">
                                        Tilila Quality Charter
                                    </span>
                                    . I commit to maintaining the editorial
                                    standards and professional ethics outlined.
                                </span>
                            </label>

                            <label className="flex cursor-pointer items-start gap-3 text-sm">
                                <input
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-border text-beta-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                    checked={agreedPrivacy}
                                    onChange={(e) =>
                                        setAgreedPrivacy(e.target.checked)
                                    }
                                />
                                <span className="text-muted-foreground">
                                    I consent to the processing of my personal
                                    data for the purpose of this application as
                                    described in the{' '}
                                    <span className="font-semibold text-beta-blue">
                                        Data Privacy Policy
                                    </span>
                                    .
                                </span>
                            </label>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={!canSubmit || processing}
                                className={[
                                    'inline-flex items-center justify-center rounded-md px-6 py-2.5 text-sm font-semibold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                                    canSubmit && !processing
                                        ? 'bg-beta-blue text-white hover:opacity-90'
                                        : 'cursor-not-allowed bg-muted text-muted-foreground',
                                ].join(' ')}
                            >
                                {processing
                                    ? 'Submitting…'
                                    : 'Submit Application'}
                            </button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

import React, { useId, useMemo, useState } from 'react';

import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';
import { useForm } from '@inertiajs/react';

const STEPS = [
    { id: 'profile', number: 1 },
    { id: 'expertise', number: 2 },
    { id: 'review', number: 3 },
];

function Stepper({ activeStepId }) {
    const activeIndex = Math.max(
        0,
        STEPS.findIndex((s) => s.id === activeStepId),
    );

    return (
        <div className="mt-7">
            <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between gap-3">
                    {STEPS.map((step, idx) => {
                        const isActive = idx === activeIndex;
                        const isDone = idx < activeIndex;

                        const circleClassName = isActive
                            ? 'bg-beta-blue text-white ring-beta-blue'
                            : isDone
                              ? 'bg-beta-blue/10 text-beta-blue ring-beta-blue/20'
                              : 'bg-secondary text-muted-foreground ring-border';

                        return (
                            <React.Fragment key={step.id}>
                                <div className="flex flex-1 flex-col items-center">
                                    <div
                                        className={[
                                            'grid h-9 w-9 place-items-center rounded-full text-sm font-extrabold ring-1',
                                            circleClassName,
                                        ].join(' ')}
                                        aria-current={
                                            isActive ? 'step' : undefined
                                        }
                                    >
                                        {step.number}
                                    </div>
                                    <div className="mt-2 text-center text-xs font-semibold text-muted-foreground">
                                        {step.id === 'profile' ? (
                                            <TransText
                                                en="Profile"
                                                fr="Profil"
                                                ar="الملف"
                                            />
                                        ) : step.id === 'expertise' ? (
                                            <TransText
                                                en="Expertise"
                                                fr="Expertise"
                                                ar="الخبرة"
                                            />
                                        ) : (
                                            <TransText
                                                en="Review"
                                                fr="Vérification"
                                                ar="مراجعة"
                                            />
                                        )}
                                    </div>
                                </div>

                                {idx < STEPS.length - 1 ? (
                                    <div className="hidden flex-1 items-center px-2 sm:flex">
                                        <div
                                            className={[
                                                'h-px w-full',
                                                idx < activeIndex
                                                    ? 'bg-beta-blue/30'
                                                    : 'bg-border',
                                            ].join(' ')}
                                            aria-hidden="true"
                                        />
                                    </div>
                                ) : null}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function Field({ label, required, children }) {
    return (
        <label className="space-y-2">
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                <span>{label}</span>
                {required ? (
                    <span className="text-beta-blue" aria-hidden="true">
                        *
                    </span>
                ) : null}
            </div>
            {children}
        </label>
    );
}

function Input({ ...props }) {
    return (
        <input
            {...props}
            className={[
                'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none',
                'placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                props.className ?? '',
            ].join(' ')}
        />
    );
}

function Select({ ...props }) {
    return (
        <select
            {...props}
            className={[
                'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                props.className ?? '',
            ].join(' ')}
        />
    );
}

function Textarea({ ...props }) {
    return (
        <textarea
            {...props}
            className={[
                'min-h-28 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none',
                'placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                props.className ?? '',
            ].join(' ')}
        />
    );
}

function Card({ title, icon, children }) {
    return (
        <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-alpha-blue text-beta-blue ring-1 ring-border">
                    <span aria-hidden="true">{icon}</span>
                </div>
                <div className="text-sm font-extrabold text-foreground">
                    {title}
                </div>
            </div>
            <div className="mt-4">{children}</div>
        </div>
    );
}

export default function FormOFInscription() {
    const { locale, t } = useTranslation();
    const [activeStepId, setActiveStepId] = useState('profile');
    const [submitted, setSubmitted] = useState(false);
    const formId = useId();

    const cityOptions = useMemo(
        () => [
            { value: '', key: 'Select' },
            { value: 'casablanca', key: 'Casablanca' },
            { value: 'rabat', key: 'Rabat' },
            { value: 'tangier', key: 'Tangier' },
            { value: 'marrakesh', key: 'Marrakesh' },
        ],
        [],
    );

    const countryOptions = useMemo(
        () => [
            { value: 'ma', key: 'Morocco' },
            { value: 'sn', key: 'Senegal' },
        ],
        [],
    );

    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            job_title: '',
            organization: '',
            city: '',
            country: 'ma',
            bio: '',
            original_video: null,
            original_video_link: '',
            locale,
        });

    const bioCount = (data.bio ?? '').length;
    const canContinueProfile =
        data.first_name.trim() !== '' &&
        data.last_name.trim() !== '' &&
        data.email.trim() !== '' &&
        data.job_title.trim() !== '' &&
        data.organization.trim() !== '' &&
        (data.city ?? '') !== '' &&
        (data.country ?? '') !== '';

    const canSubmitExpertise =
        Boolean(data.original_video) ||
        (data.original_video_link ?? '').trim() !== '';

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    <TransText
                        en="Join Tililab Connect"
                        fr="Rejoindre Tililab Connect"
                        ar="انضم إلى Tililab Connect"
                    />
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <TransText
                        en="Become part of the premier network of women experts driving diversity in Moroccan and African media."
                        fr="Rejoignez le réseau de référence des expertes qui font avancer la diversité dans les médias marocains et africains."
                        ar="كوني جزءًا من شبكة رائدة للخبيرات تدفع التنوع في الإعلام المغربي والإفريقي."
                    />
                </p>
            </div>

            <Stepper activeStepId={activeStepId} />

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                        {activeStepId === 'profile' ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <div className="grid h-9 w-9 place-items-center rounded-md bg-alpha-blue text-beta-blue ring-1 ring-border">
                                        <span aria-hidden="true">👤</span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-foreground">
                                            <TransText
                                                en="Personal & Professional Profile"
                                                fr="Profil personnel & professionnel"
                                                ar="الملف الشخصي والمهني"
                                            />
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            <TransText
                                                en="We only use this information to match you with relevant opportunities."
                                                fr="Nous utilisons ces informations uniquement pour vous associer à des opportunités pertinentes."
                                                ar="نستخدم هذه المعلومات فقط لربطك بالفرص المناسبة."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <form className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Field
                                        label={
                                            <TransText
                                                en="First Name"
                                                fr="Prénom"
                                                ar="الاسم الأول"
                                            />
                                        }
                                        required
                                    >
                                        <Input
                                            id={`${formId}-first-name`}
                                            value={data.first_name}
                                            onChange={(e) =>
                                                setData(
                                                    'first_name',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={t(
                                                'firstNamePlaceholder',
                                            )}
                                            autoComplete="given-name"
                                        />
                                        {errors.first_name ? (
                                            <div className="text-xs text-alpha-danger">
                                                {errors.first_name}
                                            </div>
                                        ) : null}
                                    </Field>
                                    <Field
                                        label={
                                            <TransText
                                                en="Last Name"
                                                fr="Nom"
                                                ar="اسم العائلة"
                                            />
                                        }
                                        required
                                    >
                                        <Input
                                            id={`${formId}-last-name`}
                                            value={data.last_name}
                                            onChange={(e) =>
                                                setData(
                                                    'last_name',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={t(
                                                'lastNamePlaceholder',
                                            )}
                                            autoComplete="family-name"
                                        />
                                        {errors.last_name ? (
                                            <div className="text-xs text-alpha-danger">
                                                {errors.last_name}
                                            </div>
                                        ) : null}
                                    </Field>

                                    <div className="sm:col-span-2">
                                        <Field
                                            label={
                                                <TransText
                                                    en="Professional Email"
                                                    fr="E-mail professionnel"
                                                    ar="البريد المهني"
                                                />
                                            }
                                            required
                                        >
                                            <Input
                                                id={`${formId}-email`}
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={t(
                                                    'emailPlaceholder',
                                                )}
                                                type="email"
                                                autoComplete="email"
                                            />
                                            {errors.email ? (
                                                <div className="text-xs text-alpha-danger">
                                                    {errors.email}
                                                </div>
                                            ) : null}
                                            <div className="mt-2 text-xs text-muted-foreground">
                                                <TransText
                                                    en="We’ll never send spam using your professional email address."
                                                    fr="Nous n’enverrons jamais de spam via votre e-mail professionnel."
                                                    ar="لن نرسل بريدًا عشوائيًا إلى بريدك المهني."
                                                />
                                            </div>
                                        </Field>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <Field
                                            label={
                                                <TransText
                                                    en="Phone Number"
                                                    fr="Numéro de téléphone"
                                                    ar="رقم الهاتف"
                                                />
                                            }
                                        >
                                            <Input
                                                id={`${formId}-phone`}
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        'phone',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={t(
                                                    'phonePlaceholder',
                                                )}
                                                autoComplete="tel"
                                            />
                                            {errors.phone ? (
                                                <div className="text-xs text-alpha-danger">
                                                    {errors.phone}
                                                </div>
                                            ) : null}
                                        </Field>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 sm:col-span-2 sm:grid-cols-2">
                                        <Field
                                            label={
                                                <TransText
                                                    en="Current Job Title"
                                                    fr="Poste actuel"
                                                    ar="المسمى الوظيفي الحالي"
                                                />
                                            }
                                            required
                                        >
                                            <Input
                                                id={`${formId}-job-title`}
                                                value={data.job_title}
                                                onChange={(e) =>
                                                    setData(
                                                        'job_title',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={t(
                                                    'jobTitlePlaceholder',
                                                )}
                                                autoComplete="organization-title"
                                            />
                                            {errors.job_title ? (
                                                <div className="text-xs text-alpha-danger">
                                                    {errors.job_title}
                                                </div>
                                            ) : null}
                                        </Field>
                                        <Field
                                            label={
                                                <TransText
                                                    en="Organization / Company"
                                                    fr="Organisation / Entreprise"
                                                    ar="المنظمة / الشركة"
                                                />
                                            }
                                            required
                                        >
                                            <Input
                                                id={`${formId}-org`}
                                                value={data.organization}
                                                onChange={(e) =>
                                                    setData(
                                                        'organization',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={t(
                                                    'organizationPlaceholder',
                                                )}
                                                autoComplete="organization"
                                            />
                                            {errors.organization ? (
                                                <div className="text-xs text-alpha-danger">
                                                    {errors.organization}
                                                </div>
                                            ) : null}
                                        </Field>
                                    </div>

                                    <Field
                                        label={
                                            <TransText
                                                en="City"
                                                fr="Ville"
                                                ar="المدينة"
                                            />
                                        }
                                        required
                                    >
                                        <Select
                                            value={data.city}
                                            onChange={(e) =>
                                                setData('city', e.target.value)
                                            }
                                        >
                                            {cityOptions.map((opt) => (
                                                <option
                                                    key={opt.value}
                                                    value={opt.value}
                                                >
                                                    {t(opt.key)}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.city ? (
                                            <div className="text-xs text-alpha-danger">
                                                {errors.city}
                                            </div>
                                        ) : null}
                                    </Field>

                                    <Field
                                        label={
                                            <TransText
                                                en="Country"
                                                fr="Pays"
                                                ar="البلد"
                                            />
                                        }
                                        required
                                    >
                                        <Select
                                            value={data.country}
                                            onChange={(e) =>
                                                setData(
                                                    'country',
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            {countryOptions.map((opt) => (
                                                <option
                                                    key={opt.value}
                                                    value={opt.value}
                                                >
                                                    {t(opt.key)}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.country ? (
                                            <div className="text-xs text-alpha-danger">
                                                {errors.country}
                                            </div>
                                        ) : null}
                                    </Field>

                                    <div className="sm:col-span-2">
                                        <Field
                                            label={
                                                <TransText
                                                    en="Short Biography"
                                                    fr="Courte biographie"
                                                    ar="نبذة قصيرة"
                                                />
                                            }
                                        >
                                            <Textarea
                                                value={data.bio}
                                                onChange={(e) =>
                                                    setData(
                                                        'bio',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={t(
                                                    'bioPlaceholder',
                                                )}
                                                maxLength={300}
                                            />
                                            {errors.bio ? (
                                                <div className="text-xs text-alpha-danger">
                                                    {errors.bio}
                                                </div>
                                            ) : null}
                                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                                <TransText
                                                    en="Briefly describe your background and areas of interest."
                                                    fr="Décrivez brièvement votre parcours et vos centres d’intérêt."
                                                    ar="صِف باختصار خلفيتك ومجالات اهتمامك."
                                                />
                                                <span>{bioCount}/300</span>
                                            </div>
                                        </Field>
                                    </div>

                                    <div className="mt-2 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                clearErrors();
                                                reset();
                                                setSubmitted(false);
                                                setActiveStepId('profile');
                                            }}
                                            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-secondary"
                                        >
                                            <TransText
                                                en="Reset"
                                                fr="Réinitialiser"
                                                ar="إعادة ضبط"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            disabled={!canContinueProfile}
                                            onClick={() => {
                                                clearErrors();
                                                setActiveStepId('expertise');
                                            }}
                                            className={[
                                                'inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold shadow-sm',
                                                canContinueProfile
                                                    ? 'bg-beta-blue text-white hover:opacity-90'
                                                    : 'cursor-not-allowed bg-muted text-muted-foreground',
                                            ].join(' ')}
                                        >
                                            <TransText
                                                en="Continue to Expertise"
                                                fr="Continuer vers l’expertise"
                                                ar="المتابعة إلى الخبرة"
                                            />
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : activeStepId === 'expertise' ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <div className="grid h-9 w-9 place-items-center rounded-md bg-alpha-blue text-beta-blue ring-1 ring-border">
                                        <span aria-hidden="true">🎬</span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-foreground">
                                            <TransText
                                                en="Expertise"
                                                fr="Expertise"
                                                ar="الخبرة"
                                            />
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            <TransText
                                                en="Upload an original video created by the candidate."
                                                fr="Uploader une vidéo originale réalisée par le/la candidat(e)."
                                                ar="ارفعي فيديو أصلي من إعداد المرشحة."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <form
                                    className="mt-6 space-y-5"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (!canSubmitExpertise) return;
                                        clearErrors();
                                        post('/tililab/form', {
                                            preserveScroll: true,
                                            forceFormData: true,
                                            onSuccess: () => {
                                                setSubmitted(true);
                                                setActiveStepId('review');
                                            },
                                        });
                                    }}
                                >
                                    <div className="rounded-xl bg-background p-4 ring-1 ring-border">
                                        <Field
                                            label={
                                                <TransText
                                                    en="Original video (upload)"
                                                    fr="Vidéo originale (upload)"
                                                    ar="الفيديو الأصلي (رفع)"
                                                />
                                            }
                                            required
                                        >
                                            <Input
                                                id={`${formId}-original-video`}
                                                type="file"
                                                accept="video/*"
                                                onChange={(e) =>
                                                    setData(
                                                        'original_video',
                                                        e.target.files?.[0] ??
                                                            null,
                                                    )
                                                }
                                            />
                                            <Input
                                                id={`${formId}-original-video-link`}
                                                value={data.original_video_link}
                                                onChange={(e) =>
                                                    setData(
                                                        'original_video_link',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="https://swisstransfer.com/…"
                                                type="url"
                                                inputMode="url"
                                                autoComplete="url"
                                            />
                                            <div className="mt-2 text-xs text-muted-foreground">
                                                <TransText
                                                    en="Upload your video (recommended). If needed, you can also paste a link (SwissTransfer, Google Drive, WeTransfer, Dropbox, etc.)."
                                                    fr="Téléversez la vidéo (recommandé). Si besoin, vous pouvez aussi coller un lien (SwissTransfer, Google Drive, WeTransfer, Dropbox, etc.)."
                                                    ar="ارفعي الفيديو مباشرة (موصى به). وإذا لزم الأمر يمكنك لصق رابط (SwissTransfer أو Google Drive أو WeTransfer أو Dropbox...)."
                                                />
                                            </div>
                                        </Field>

                                        {errors.original_video ? (
                                            <div className="mt-2 text-xs text-alpha-danger">
                                                {errors.original_video}
                                            </div>
                                        ) : null}

                                        {errors.original_video_link ? (
                                            <div className="mt-2 text-xs text-alpha-danger">
                                                {errors.original_video_link}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                clearErrors();
                                                setActiveStepId('profile');
                                            }}
                                            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-secondary"
                                        >
                                            <TransText
                                                en="Back"
                                                fr="Retour"
                                                ar="رجوع"
                                            />
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={
                                                !canSubmitExpertise ||
                                                processing
                                            }
                                            className={[
                                                'inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow-sm',
                                                canSubmitExpertise &&
                                                !processing
                                                    ? 'bg-beta-blue hover:opacity-90'
                                                    : 'cursor-not-allowed bg-muted text-muted-foreground',
                                            ].join(' ')}
                                        >
                                            <TransText
                                                en={
                                                    processing
                                                        ? 'Submitting…'
                                                        : 'Continue to Review'
                                                }
                                                fr={
                                                    processing
                                                        ? 'Envoi…'
                                                        : 'Continuer vers la vérification'
                                                }
                                                ar={
                                                    processing
                                                        ? 'جارٍ الإرسال…'
                                                        : 'المتابعة إلى المراجعة'
                                                }
                                            />
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="grid h-9 w-9 place-items-center rounded-md bg-alpha-blue text-beta-blue ring-1 ring-border">
                                        <span aria-hidden="true">✅</span>
                                    </div>
                                    <div>
                                        <div className="text-base font-extrabold text-foreground">
                                            <TransText
                                                en="Review"
                                                fr="Vérification"
                                                ar="مراجعة"
                                            />
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            <TransText
                                                en="Your inscription has been submitted."
                                                fr="Votre inscription a été envoyée."
                                                ar="تم إرسال تسجيلك."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-background p-4 ring-1 ring-border">
                                    <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                                        <div className="font-semibold text-muted-foreground">
                                            <TransText
                                                en="Name"
                                                fr="Nom"
                                                ar="الاسم"
                                            />
                                            <div className="mt-1 font-extrabold text-foreground">
                                                {data.first_name}{' '}
                                                {data.last_name}
                                            </div>
                                        </div>
                                        <div className="font-semibold text-muted-foreground">
                                            <TransText
                                                en="Email"
                                                fr="E-mail"
                                                ar="البريد"
                                            />
                                            <div className="mt-1 font-extrabold text-foreground">
                                                {data.email}
                                            </div>
                                        </div>
                                        <div className="font-semibold text-muted-foreground">
                                            <TransText
                                                en="Organization"
                                                fr="Organisation"
                                                ar="المنظمة"
                                            />
                                            <div className="mt-1 font-extrabold text-foreground">
                                                {data.organization}
                                            </div>
                                        </div>
                                        <div className="font-semibold text-muted-foreground">
                                            <TransText
                                                en="Video"
                                                fr="Vidéo"
                                                ar="الفيديو"
                                            />
                                            <div className="mt-1 font-extrabold text-foreground">
                                                {submitted ? (
                                                    <TransText
                                                        en="Uploaded"
                                                        fr="Téléversée"
                                                        ar="تم الرفع"
                                                    />
                                                ) : (
                                                    <TransText
                                                        en="Pending"
                                                        fr="En attente"
                                                        ar="قيد الانتظار"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        clearErrors();
                                        reset();
                                        setSubmitted(false);
                                        setActiveStepId('profile');
                                    }}
                                    className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-secondary"
                                >
                                    <TransText
                                        en="Start a new inscription"
                                        fr="Faire une nouvelle inscription"
                                        ar="بدء تسجيل جديد"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6 lg:col-span-4">
                    <Card
                        title={
                            <TransText
                                en="New Member FAQ"
                                fr="FAQ nouveaux membres"
                                ar="أسئلة شائعة للمشتركين الجدد"
                            />
                        }
                        icon="❓"
                    >
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <span
                                    className="mt-1 text-beta-blue"
                                    aria-hidden="true"
                                >
                                    •
                                </span>
                                <div>
                                    <div className="font-semibold text-foreground">
                                        <TransText
                                            en="Who can join Tililab?"
                                            fr="Qui peut rejoindre Tililab ?"
                                            ar="من يمكنه الانضمام إلى تيليلا؟"
                                        />
                                    </div>
                                    <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                        <TransText
                                            en="Women experts from Morocco and Africa across disciplines."
                                            fr="Des expertes du Maroc et d’Afrique, toutes disciplines confondues."
                                            ar="خبيرات من المغرب وإفريقيا في مختلف التخصصات."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <span
                                    className="mt-1 text-beta-blue"
                                    aria-hidden="true"
                                >
                                    •
                                </span>
                                <div>
                                    <div className="font-semibold text-foreground">
                                        <TransText
                                            en="Is membership free?"
                                            fr="L’adhésion est-elle gratuite ?"
                                            ar="هل العضوية مجانية؟"
                                        />
                                    </div>
                                    <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                        <TransText
                                            en="Yes. Tililab Connect is a community initiative."
                                            fr="Oui. Tililab Connect est une initiative communautaire."
                                            ar="نعم. Tililab Connect مبادرة مجتمعية."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <span
                                    className="mt-1 text-beta-blue"
                                    aria-hidden="true"
                                >
                                    •
                                </span>
                                <div>
                                    <div className="font-semibold text-foreground">
                                        <TransText
                                            en="How is my data used?"
                                            fr="Comment mes données sont-elles utilisées ?"
                                            ar="كيف تُستخدم بياناتي؟"
                                        />
                                    </div>
                                    <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                        <TransText
                                            en="Only to match you with opportunities and improve the network."
                                            fr="Uniquement pour vous associer à des opportunités et améliorer le réseau."
                                            ar="فقط لربطك بالفرص وتحسين الشبكة."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card
                        title={
                            <TransText
                                en="Code of Conduct"
                                fr="Code de conduite"
                                ar="مدونة السلوك"
                            />
                        }
                        icon="🛡"
                    >
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            <TransText
                                en="Tililab Connect is a professional community based on mutual respect and integrity."
                                fr="Tililab Connect est une communauté professionnelle fondée sur le respect mutuel et l’intégrité."
                                ar="Tililab Connect مجتمع مهني قائم على الاحترام المتبادل والنزاهة."
                            />
                        </p>

                        <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                            {[
                                {
                                    en: 'Professionalism in all interactions.',
                                    fr: 'Professionnalisme dans toutes les interactions.',
                                    ar: 'الاحترافية في جميع التعاملات.',
                                },
                                {
                                    en: 'Respect for diversity and inclusion.',
                                    fr: 'Respect de la diversité et de l’inclusion.',
                                    ar: 'احترام التنوع والشمول.',
                                },
                                {
                                    en: 'Accuracy and expertise presented responsibly.',
                                    fr: 'Exactitude et expertise présentées de manière responsable.',
                                    ar: 'تقديم الخبرة والمعلومات بدقة ومسؤولية.',
                                },
                            ].map((item) => (
                                <li key={item.en} className="flex gap-2">
                                    <span
                                        className="mt-0.5 text-beta-blue"
                                        aria-hidden="true"
                                    >
                                        ✓
                                    </span>
                                    <span>
                                        <TransText
                                            en={item.en}
                                            fr={item.fr}
                                            ar={item.ar}
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <button
                            type="button"
                            className="mt-4 text-xs font-semibold text-beta-blue hover:underline"
                        >
                            <TransText
                                en="Read full charter"
                                fr="Lire la charte complète"
                                ar="اقرأ الميثاق الكامل"
                            />
                        </button>

                        <div className="mt-5 rounded-xl bg-background p-4 ring-1 ring-border">
                            <div className="text-xs font-semibold text-muted-foreground">
                                <TransText
                                    en="Need assistance?"
                                    fr="Besoin d’aide ?"
                                    ar="هل تحتاج مساعدة؟"
                                />
                            </div>
                            <div className="mt-1 text-sm font-extrabold text-foreground">
                                support@Tililab.ma
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}

import React, { useMemo, useState } from 'react';

import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';

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
                                        aria-current={isActive ? 'step' : undefined}
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
                <div className="text-sm font-extrabold text-foreground">{title}</div>
            </div>
            <div className="mt-4">{children}</div>
        </div>
    );
}

export default function FormOFInscription() {
    const { t } = useTranslation();
    const [activeStepId] = useState('profile');

    const cityOptions = useMemo(
        () => [
            { value: '', key: 'tililaConnect.form.citySelect' },
            { value: 'casablanca', key: 'tililaConnect.form.cityCasablanca' },
            { value: 'rabat', key: 'tililaConnect.form.cityRabat' },
            { value: 'tangier', key: 'tililaConnect.form.cityTangier' },
            { value: 'marrakesh', key: 'tililaConnect.form.cityMarrakesh' },
        ],
        [],
    );

    const countryOptions = useMemo(
        () => [
            { value: 'ma', key: 'tililaConnect.form.countryMorocco' },
            { value: 'sn', key: 'tililaConnect.form.countrySenegal' },
        ],
        [],
    );

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    <TransText
                        en="Join Tilila Connect"
                        fr="Rejoindre Tilila Connect"
                        ar="انضم إلى Tilila Connect"
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
                                label={<TransText en="First Name" fr="Prénom" ar="الاسم الأول" />}
                                required
                            >
                                <Input placeholder={t('tililaConnect.form.firstNamePlaceholder')} />
                            </Field>
                            <Field
                                label={<TransText en="Last Name" fr="Nom" ar="اسم العائلة" />}
                                required
                            >
                                <Input placeholder={t('tililaConnect.form.lastNamePlaceholder')} />
                            </Field>

                            <div className="sm:col-span-2">
                                <Field
                                    label={<TransText en="Professional Email" fr="E-mail professionnel" ar="البريد المهني" />}
                                    required
                                >
                                    <Input placeholder={t('tililaConnect.form.emailPlaceholder')} type="email" />
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
                                    label={<TransText en="Phone Number" fr="Numéro de téléphone" ar="رقم الهاتف" />}
                                >
                                    <Input placeholder={t('tililaConnect.form.phonePlaceholder')} />
                                </Field>
                            </div>

                            <div className="sm:col-span-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Field
                                    label={<TransText en="Current Job Title" fr="Poste actuel" ar="المسمى الوظيفي الحالي" />}
                                    required
                                >
                                    <Input placeholder={t('tililaConnect.form.jobTitlePlaceholder')} />
                                </Field>
                                <Field
                                    label={<TransText en="Organization / Company" fr="Organisation / Entreprise" ar="المنظمة / الشركة" />}
                                    required
                                >
                                    <Input placeholder={t('tililaConnect.form.organizationPlaceholder')} />
                                </Field>
                            </div>

                            <Field label={<TransText en="City" fr="Ville" ar="المدينة" />} required>
                                <Select defaultValue="">
                                    {cityOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {t(opt.key)}
                                        </option>
                                    ))}
                                </Select>
                            </Field>

                            <Field label={<TransText en="Country" fr="Pays" ar="البلد" />} required>
                                <Select defaultValue="ma">
                                    {countryOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {t(opt.key)}
                                        </option>
                                    ))}
                                </Select>
                            </Field>

                            <div className="sm:col-span-2">
                                <Field
                                    label={<TransText en="Short Biography" fr="Courte biographie" ar="نبذة قصيرة" />}
                                >
                                    <Textarea
                                        placeholder={t('tililaConnect.form.bioPlaceholder')}
                                        maxLength={300}
                                    />
                                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                        <TransText
                                            en="Briefly describe your background and areas of interest."
                                            fr="Décrivez brièvement votre parcours et vos centres d’intérêt."
                                            ar="صِف باختصار خلفيتك ومجالات اهتمامك."
                                        />
                                        <span>0/300</span>
                                    </div>
                                </Field>
                            </div>

                            <div className="sm:col-span-2">
                                <div className="text-sm font-semibold text-foreground">
                                    <TransText
                                        en="Profile Picture"
                                        fr="Photo de profil"
                                        ar="الصورة الشخصية"
                                    />
                                </div>
                                <div className="mt-3 flex flex-col gap-4 rounded-xl bg-background p-4 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-muted-foreground ring-1 ring-border">
                                            <span aria-hidden="true">📷</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            <TransText
                                                en="JPG, PNG, or WEBP. Max 2MB."
                                                fr="JPG, PNG ou WEBP. 2 Mo max."
                                                ar="JPG أو PNG أو WEBP. حد أقصى 2MB."
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md bg-beta-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                                    >
                                        <TransText
                                            en="Upload Photo"
                                            fr="Téléverser une photo"
                                            ar="رفع صورة"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="sm:col-span-2 mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-secondary"
                                >
                                    <TransText en="Cancel" fr="Annuler" ar="إلغاء" />
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md bg-beta-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                                >
                                    <TransText
                                        en="Continue to Expertise"
                                        fr="Continuer vers l’expertise"
                                        ar="المتابعة إلى الخبرة"
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="space-y-6 lg:col-span-4">
                    <Card
                        title={<TransText en="New Member FAQ" fr="FAQ nouveaux membres" ar="أسئلة شائعة للمشتركين الجدد" />}
                        icon="❓"
                    >
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <span className="mt-1 text-beta-blue" aria-hidden="true">
                                    •
                                </span>
                                <div>
                                    <div className="font-semibold text-foreground">
                                        <TransText
                                            en="Who can join Tilila?"
                                            fr="Qui peut rejoindre Tilila ?"
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
                                <span className="mt-1 text-beta-blue" aria-hidden="true">
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
                                            en="Yes. Tilila Connect is a community initiative."
                                            fr="Oui. Tilila Connect est une initiative communautaire."
                                            ar="نعم. Tilila Connect مبادرة مجتمعية."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <span className="mt-1 text-beta-blue" aria-hidden="true">
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
                        title={<TransText en="Code of Conduct" fr="Code de conduite" ar="مدونة السلوك" />}
                        icon="🛡"
                    >
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            <TransText
                                en="Tilila Connect is a professional community based on mutual respect and integrity."
                                fr="Tilila Connect est une communauté professionnelle fondée sur le respect mutuel et l’intégrité."
                                ar="Tilila Connect مجتمع مهني قائم على الاحترام المتبادل والنزاهة."
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
                                    <span className="mt-0.5 text-beta-blue" aria-hidden="true">
                                        ✓
                                    </span>
                                    <span>
                                        <TransText en={item.en} fr={item.fr} ar={item.ar} />
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
                                support@tilila.ma
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}


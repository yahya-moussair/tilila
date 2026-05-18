import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Award, CheckCircle2, ClipboardList } from 'lucide-react';

import TransText from '@/components/TransText';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function Field({ label, children, error }) {
    return (
        <div className="space-y-2">
            <div className="text-sm font-semibold text-foreground">{label}</div>
            {children}
            {error ? (
                <div className="text-xs text-alpha-danger">{error}</div>
            ) : null}
        </div>
    );
}

export default function ParticipateSection() {
    const flash = usePage().props?.flash ?? {};
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            city: '',
            country: 'ma',
            submission_title: '',
            submission_description: '',
            submission_link: '',
            submission_video: null,
            accepted_rules: false,
        });

    useEffect(() => {
        clearErrors();
    }, [clearErrors]);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        post('/tilila/participate', {
            preserveScroll: false,
            forceFormData: true,
            onSuccess: () => {
                reset();
                requestAnimationFrame(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            },
            onError: () => {
                requestAnimationFrame(() => {
                    const el = document.getElementById(
                        'tilila-participate-scroll',
                    );
                    if (el) el.scrollTop = 0;
                });
            },
        });
    };

    return (
        <section
            id="tilila-participate-section"
            className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-10"
        >
            <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-linear-to-b from-gold/10 via-beta-blue/5 to-transparent blur-2xl" />
            {flash?.success ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
                    {flash.success}
                </div>
            ) : null}

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-5">
                    <div className="rounded-3xl border border-border bg-white shadow-sm">
                        <div className="px-6 pt-6 pb-4">
                            <div className="text-xs font-semibold tracking-widest text-beta-blue uppercase">
                                <TransText en="Notes" fr="Notes" ar="ملاحظات" />
                            </div>
                            <div className="mt-2 text-2xl font-semibold tracking-tight text-tblack">
                                <TransText
                                    en="Everything you need to know"
                                    fr="Tout ce qu’il faut savoir"
                                    ar="كل ما تحتاج معرفته"
                                />
                            </div>
                            <div className="mt-2 text-sm leading-6 text-tgray">
                                <TransText
                                    en="Conditions, steps, and reward — explained clearly before you submit."
                                    fr="Conditions, étapes et récompense — expliquées clairement avant de soumettre."
                                    ar="الشروط والخطوات والمكافأة — شرح واضح قبل الإرسال."
                                />
                            </div>
                        </div>

                        <div className="space-y-3 px-4 pb-5 sm:px-6">
                            <div className="rounded-2xl border border-border bg-beta-white p-5">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-beta-blue/10 p-2 text-beta-blue">
                                        <ClipboardList className="size-5" />
                                    </div>
                                    <div className="text-sm font-bold tracking-wide text-tblack uppercase">
                                        Conditions
                                    </div>
                                </div>
                                <ul className="mt-4 space-y-2 text-sm leading-6 text-tgray">
                                    <li className="flex gap-2">
                                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-beta-blue/60" />
                                        <span>
                                            La participation pour l’édition en cours est ouverte
                                            jusqu’à la date de clôture annoncée.
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-beta-blue/60" />
                                        <span>
                                            Les publicités télévisuelles en concours doivent impérativement
                                            avoir été diffusées (ou avoir une diffusion programmée) sur 2M
                                            durant la période d’éligibilité.
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-beta-blue/60" />
                                        <span>Les campagnes digitales sont également éligibles.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-beta-blue/60" />
                                        <span>
                                            Un comité de sélection présélectionne des spots inscrits et en retient
                                            10 (dix) à soumettre à l’évaluation du jury.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-border bg-beta-white p-5">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-gold/15 p-2 text-gold">
                                        <CheckCircle2 className="size-5" />
                                    </div>
                                    <div className="text-sm font-bold tracking-wide text-tblack uppercase">
                                        Étapes
                                    </div>
                                </div>
                                <ul className="mt-4 space-y-2 text-sm leading-6 text-tgray">
                                    {[
                                        'Remplir le formulaire de participation.',
                                        'Accepter le règlement du concours.',
                                        'Un accusé de réception sera envoyé à l’adresse e-mail.',
                                        'Les gagnants seront annoncés lors de la cérémonie Trophée Tilila.',
                                    ].map((txt) => (
                                        <li key={txt} className="flex gap-2">
                                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold/70" />
                                            <span>{txt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-border bg-beta-white p-5">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-700">
                                        <Award className="size-5" />
                                    </div>
                                    <div className="text-sm font-bold tracking-wide text-tblack uppercase">
                                        Récompense
                                    </div>
                                </div>
                                <ul className="mt-4 space-y-2 text-sm leading-6 text-tgray">
                                    {[
                                        'Le Trophée Tilila récompense les spots publicitaires les plus égalitaires et inclusifs.',
                                        'Les annonceurs gagnants remporteront un trophée et un prix.',
                                        'Les agences auteures des spots gagnants recevront un trophée.',
                                    ].map((txt) => (
                                        <li key={txt} className="flex gap-2">
                                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500/60" />
                                            <span>{txt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <div className="rounded-3xl border border-border bg-background shadow-sm">
                <div className="border-b border-border bg-background/95 px-6 py-5 backdrop-blur supports-backdrop-filter:bg-background/80">
                    <div className="space-y-2">
                        <div className="text-xl font-semibold text-foreground">
                            <TransText
                                en="Participate in the Trophée Tilila"
                                fr="Participer au Trophée Tilila"
                                ar="المشاركة في جائزة تيليلا"
                            />
                        </div>
                        <div className="text-sm text-muted-foreground">
                            <TransText
                                en="Fill in the participation form, accept the contest rules, and receive an acknowledgment by email."
                                fr="Remplir le formulaire de participation, accepter le règlement du concours, puis recevoir un accusé de réception par e-mail."
                                ar="املأ استمارة المشاركة، اقبل نظام المسابقة، وستصلك رسالة تأكيد عبر البريد الإلكتروني."
                            />
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    id="tilila-participate-scroll"
                    className="px-6 py-6"
                >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field
                            label={
                                <TransText
                                    en="First name"
                                    fr="Prénom"
                                    ar="الاسم الأول"
                                />
                            }
                            error={errors.first_name}
                        >
                            <Input
                                value={data.first_name}
                                onChange={(e) =>
                                    setData('first_name', e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label={
                                <TransText
                                    en="Last name"
                                    fr="Nom"
                                    ar="اسم العائلة"
                                />
                            }
                            error={errors.last_name}
                        >
                            <Input
                                value={data.last_name}
                                onChange={(e) =>
                                    setData('last_name', e.target.value)
                                }
                            />
                        </Field>

                        <div className="sm:col-span-2">
                            <Field
                                label={
                                    <TransText
                                        en="Email"
                                        fr="E-mail"
                                        ar="البريد الإلكتروني"
                                    />
                                }
                                error={errors.email}
                            >
                                <Input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                            </Field>
                        </div>

                        <Field
                            label={
                                <TransText
                                    en="Phone"
                                    fr="Téléphone"
                                    ar="الهاتف"
                                />
                            }
                            error={errors.phone}
                        >
                            <Input
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label={
                                <TransText en="Country" fr="Pays" ar="البلد" />
                            }
                            error={errors.country}
                        >
                            <Input
                                value={data.country}
                                onChange={(e) =>
                                    setData('country', e.target.value)
                                }
                                placeholder="ma"
                            />
                        </Field>

                        <div className="sm:col-span-2">
                            <Field
                                label={
                                    <TransText
                                        en="City"
                                        fr="Ville"
                                        ar="المدينة"
                                    />
                                }
                                error={errors.city}
                            >
                                <Input
                                    value={data.city}
                                    onChange={(e) =>
                                        setData('city', e.target.value)
                                    }
                                />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Field
                                label={
                                    <TransText
                                        en="Submission title"
                                        fr="Titre de la candidature"
                                        ar="عنوان المشاركة"
                                    />
                                }
                                error={errors.submission_title}
                            >
                                <Input
                                    value={data.submission_title}
                                    onChange={(e) =>
                                        setData(
                                            'submission_title',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Field
                                label={
                                    <TransText
                                        en="Short description"
                                        fr="Description (courte)"
                                        ar="وصف مختصر"
                                    />
                                }
                                error={errors.submission_description}
                            >
                                <textarea
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                    value={data.submission_description}
                                    onChange={(e) =>
                                        setData(
                                            'submission_description',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Field
                                label={
                                    <TransText
                                        en="Submission video (upload)"
                                        fr="Vidéo de soumission (upload)"
                                        ar="فيديو المشاركة (رفع)"
                                    />
                                }
                                error={errors.submission_video}
                            >
                                <Input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) =>
                                        setData(
                                            'submission_video',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                                {/* <Input
                                    type="url"
                                    placeholder="https://wetransfer.com/…"
                                    value={data.submission_link}
                                    onChange={(e) =>
                                        setData(
                                            'submission_link',
                                            e.target.value,
                                        )
                                    }
                                /> */}
                                <div className="mt-2 text-xs text-muted-foreground">
                                    <TransText
                                        en="Upload your video (recommended). If you prefer, you can still paste a link (Drive, SwissTransfer, WeTransfer, Dropbox…)."
                                        fr="Téléversez votre vidéo (recommandé). Sinon, vous pouvez aussi coller un lien (Drive, SwissTransfer, WeTransfer, Dropbox…)."
                                        ar="ارفعي الفيديو مباشرة (موصى به). أو يمكنك لصق رابط (Drive أو SwissTransfer أو WeTransfer أو Dropbox...)."
                                    />
                                </div>
                            </Field>
                        </div>

                        <div className="rounded-xl bg-background p-4 ring-1 ring-border sm:col-span-2">
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id="accepted_rules"
                                    checked={Boolean(data.accepted_rules)}
                                    onCheckedChange={(v) =>
                                        setData('accepted_rules', Boolean(v))
                                    }
                                />
                                <div className="min-w-0">
                                    <Label
                                        htmlFor="accepted_rules"
                                        className="text-sm font-semibold text-foreground"
                                    >
                                        <TransText
                                            en="I accept the contest rules"
                                            fr="J’accepte le règlement du concours"
                                            ar="أوافق على نظام المسابقة"
                                        />
                                    </Label>
                                    <div className="mt-1 text-xs text-muted-foreground">
                                        <TransText
                                            en="You must accept the rules to submit."
                                            fr="Vous devez accepter le règlement pour soumettre."
                                            ar="يجب قبول النظام للإرسال."
                                        />
                                    </div>
                                    {errors.accepted_rules ? (
                                        <div className="mt-2 text-xs text-alpha-danger">
                                            {errors.accepted_rules}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2 sm:col-span-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className={[
                                    'inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white shadow-sm',
                                    !processing
                                        ? 'bg-beta-blue hover:opacity-90'
                                        : 'cursor-not-allowed bg-muted text-muted-foreground',
                                ].join(' ')}
                            >
                                <TransText
                                    en={
                                        processing
                                            ? 'Submitting…'
                                            : 'Submit participation'
                                    }
                                    fr={
                                        processing
                                            ? 'Envoi…'
                                            : 'Envoyer la participation'
                                    }
                                    ar={
                                        processing
                                            ? 'جارٍ الإرسال…'
                                            : 'إرسال المشاركة'
                                    }
                                />
                            </button>
                        </div>
                    </div>
                </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

export default function ExpandedSections() {
    return (
        <div className="space-y-0">
            <section className="bg-beta-white py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-2xl font-extrabold text-tblack">
                        <TransText
                            en="SOREAD 2M"
                            fr="SOREAD 2M"
                            ar="SOREAD 2M"
                        />
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-tgray">
                        <TransText
                            en="Citizen-facing media group: editorial independence, societal commitments, and the Parity & Diversity committee anchoring Tilila."
                            fr="Groupe média citoyen : indépendance éditoriale, engagements sociétaux, et le comité Parité & Diversité qui porte Tilila."
                            ar="مجموعة إعلام مواطنة: استقلالية تحريرية والتزامات مجتمعية ولجنة التكافؤ والتنوع التي ترتكز عليها تيليلا."
                        />
                    </p>
                </div>
            </section>

            <section className="bg-twhite py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-2xl font-extrabold text-tblack">
                        <TransText
                            en="EDI Programme Tilila — 2026"
                            fr="Programme EDI Tilila — 2026"
                            ar="برنامج EDI تيليلا — 2026"
                        />
                    </h2>
                    <ul className="mt-4 list-disc space-y-2 ps-5 text-sm text-tgray">
                        <li>
                            <TransText
                                en="Strategic axes: parity in editorial voices, inclusive sourcing, and measurable KPIs."
                                fr="Axes : parité des voix éditoriales, sourcing inclusif, KPIs mesurables."
                                ar="محاور: تكافؤ الأصوات التحريرية، وتنويع المصادر، ومؤشرات قابلة للقياس."
                            />
                        </li>
                        <li>
                            <TransText
                                en="Internal actions: training, editorial guidelines, partner protocols."
                                fr="Actions internes : formations, chartes éditoriales, protocoles partenaires."
                                ar="إجراءات داخلية: تدريب، ومواثيق تحريرية، وبروتوكولات شركاء."
                            />
                        </li>
                        <li>
                            <TransText
                                en="External actions: Awards, Tililab, public conversations, expert visibility."
                                fr="Actions externes : Awards, Tililab, conversations publiques, visibilité des expertes."
                                ar="إجراءات خارجية: الجوائز وتيليلاب والحوارات العامة وإبراز الخبيرات."
                            />
                        </li>
                    </ul>
                </div>
            </section>

            <section className="bg-beta-white py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-2xl font-extrabold text-tblack">
                        <TransText
                            en="Governance"
                            fr="Gouvernance"
                            ar="الحوكمة"
                        />
                    </h2>
                    <p className="mt-4 text-sm text-tgray">
                        <TransText
                            en="Presidency, CPD bureau, permanent members, partners, and contacts — detailed view:"
                            fr="Présidence, bureau CPD, membres permanents, partenaires et contacts — vue détaillée :"
                            ar="الرئاسة ومكتب CPD والأعضاء الدائمون والشركاء وجهات الاتصال — العرض التفصيلي:"
                        />{' '}
                        <Link
                            href="/gouvernance"
                            className="font-semibold text-beta-blue hover:underline"
                        >
                            <TransText
                                en="Open governance page"
                                fr="Ouvrir la page gouvernance"
                                ar="صفحة الحوكمة"
                            />
                        </Link>
                    </p>
                </div>
            </section>

            <section className="bg-twhite py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-2xl font-extrabold text-tblack">
                        <TransText
                            en="Press & contact"
                            fr="Presse & contact"
                            ar="الصحافة والاتصال"
                        />
                    </h2>
                    <p className="mt-4 text-sm text-tgray">
                        <TransText
                            en="Press kit, logos, media contact — reach us via the contact page or email shown in the footer."
                            fr="Dossier de presse, logos, contact média — via la page contact ou l’email en pied de page."
                            ar="حزمة صحافية وشعارات واتصال إعلامي — عبر صفحة الاتصال أو البريد في التذييل."
                        />
                    </p>
                </div>
            </section>

            <section className="bg-beta-white py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-2xl font-extrabold text-tblack">
                        <TransText
                            en="References & compliance"
                            fr="Références & conformité"
                            ar="مراجع وامتثال"
                        />
                    </h2>
                    <p className="mt-4 text-sm text-tgray">
                        <TransText
                            en="Studies, EDI / ESG / CSR charters, gender monitoring barometer, media kit, RGPD / CNDP — consolidated on the legal page."
                            fr="Études, chartes EDI/ESG/RSE, baromètre, kit média, RGPD / CNDP — synthèse sur la page mentions légales."
                            ar="دراسات ومواثيق EDI/ESG/RSE ومؤشرات النوع ومجموعة إعلامية وRGPD/CNDP — ملخص في صفحة الإشعارات القانونية."
                        />{' '}
                        <Link
                            href="/mentions-legales"
                            className="font-semibold text-beta-blue hover:underline"
                        >
                            <TransText
                                en="Legal notices"
                                fr="Mentions légales"
                                ar="إشعارات قانونية"
                            />
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}

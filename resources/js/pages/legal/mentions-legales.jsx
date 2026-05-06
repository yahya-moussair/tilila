import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';

export default function MentionsLegales() {
    return (
        <>
            <Head title="Mentions légales" />
            <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold">
                    <TransText
                        en="Legal notices & privacy"
                        fr="Mentions légales & confidentialité"
                        ar="إشعارات قانونية وخصوصية"
                    />
                </h1>
                <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <p>
                        <TransText
                            en="This page summarizes publisher information, editorial responsibility, and data processing principles aligned with Moroccan law, RGPD where applicable, and CNDP guidance."
                            fr="Cette page résume l’éditeur, la responsabilité éditoriale et les principes de traitement des données (RGPD / CNDP selon le cas)."
                            ar="تلخص هذه الصفحة معلومات الناشر والمسؤولية التحريرية ومبادئ معالجة البيانات بما يتوافق مع القانون المغربي والإطار الأوروبي عند الحاجة وتوجيهات الهيئة."
                        />
                    </p>
                    <p>
                        <TransText
                            en="For media kit, institutional charts, and studies, see the About section."
                            fr="Pour le kit média, les chartes et les études : rubrique À propos."
                            ar="لحزمة الإعلام والمواثيق والدراسات راجع قسم حول."
                        />
                    </p>
                </div>
            </div>
        </>
    );
}

MentionsLegales.layout = (page) => <AppLayout>{page}</AppLayout>;

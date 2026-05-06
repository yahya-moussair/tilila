import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';

export default function LearnAcademy() {
    return (
        <>
            <Head title="Tilila Academy" />
            <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
                <Link
                    href="/learn"
                    className="text-sm font-semibold text-beta-blue hover:underline"
                >
                    ← Learn
                </Link>
                <h1 className="mt-6 text-3xl font-extrabold">
                    <TransText
                        en="Tilila Academy"
                        fr="Tilila Academy"
                        ar="أكاديمية تيليلا"
                    />
                </h1>
                <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <p>
                        <TransText
                            en="Media training, personal branding, broadcast presence, inclusive leadership, and diversity & inclusion tracks — with certificates for completed sessions."
                            fr="Formation médias, personal branding, prise de parole TV/radio, leadership inclusif et D&amp;I — avec certificats pour les parcours complétés."
                            ar="تدريب إعلامي، وهوية شخصية، وحضور إعلامي، وقيادة شاملة، ومسارات التنوع والإدماج — مع شهادات للجلسات المكتملة."
                        />
                    </p>
                </div>
            </div>
        </>
    );
}

LearnAcademy.layout = (page) => <AppLayout>{page}</AppLayout>;

import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';

export default function LearnResources() {
    return (
        <>
            <Head title="Learn · Resources" />
            <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
                <Link
                    href="/learn"
                    className="text-sm font-semibold text-beta-blue hover:underline"
                >
                    ← Learn
                </Link>
                <h1 className="mt-6 text-3xl font-extrabold">
                    <TransText
                        en="Pedagogical resources"
                        fr="Ressources pédagogiques"
                        ar="موارد تعليمية"
                    />
                </h1>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                    <TransText
                        en="Practical guides, media toolkits, webinar replays, and CV / bio / pitch templates."
                        fr="Guides pratiques, boîte à outils médias, replays webinaires et modèles CV / bio / pitch."
                        ar="أدلة عملية، وحزم أدوات إعلامية، وإعادة عرض ندوات، وقوالب السيرة والسيرة القصيرة والعرض."
                    />
                </p>
            </div>
        </>
    );
}

LearnResources.layout = (page) => <AppLayout>{page}</AppLayout>;

import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TransText from '@/components/TransText';

export default function LearnOffers() {
    return (
        <>
            <Head title="Learn · Offers" />
            <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
                <Link
                    href="/learn"
                    className="text-sm font-semibold text-beta-blue hover:underline"
                >
                    ← Learn
                </Link>
                <h1 className="mt-6 text-3xl font-extrabold">
                    <TransText
                        en="Institutional offers"
                        fr="Offres institutionnelles"
                        ar="عروض مؤسسية"
                    />
                </h1>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                    <TransText
                        en="Programs for enterprises, institutions, universities, NGOs, and sponsored editorial partnerships."
                        fr="Programmes entreprises, institutions, universités, ONG et partenariats éditoriaux sponsorisés."
                        ar="برامج للشركات والمؤسسات والجامعات والمنظمات وشراكات تحريرية موضوعة."
                    />
                </p>
            </div>
        </>
    );
}

LearnOffers.layout = (page) => <AppLayout>{page}</AppLayout>;

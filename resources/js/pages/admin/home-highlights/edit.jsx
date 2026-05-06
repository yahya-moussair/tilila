import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import HomeHighlightForm from '@/pages/admin/home-highlights/partials/HomeHighlightForm';

export default function AdminHomeHighlightsEdit({
    highlight,
    cardTypes = [],
}) {
    const { data, setData, errors, setError, clearErrors } = useForm({
        title: highlight?.title ?? { en: '', fr: '', ar: '' },
        card_type: highlight?.card_type ?? 'event',
        link_url: highlight?.link_url ?? '',
        highlight_date: highlight?.highlight_date ?? '',
        is_active: Boolean(highlight?.is_active),
        sort_order: highlight?.sort_order ?? 0,
    });

    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        router.put(
            `/admin/home-highlights/${highlight.id}`,
            data,
            {
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onError: (serverErrors) => setError(serverErrors),
            },
        );
    };

    return (
        <>
            <Head title="Edit home highlight" />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-start sm:justify-between sm:pb-8">
                    <div>
                        <p className="text-sm font-medium text-tgray">
                            Home highlights
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-tblack">
                            Edit highlight
                        </h1>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/admin/home-highlights" className="gap-2">
                            <ChevronLeft className="size-4" />
                            Back
                        </Link>
                    </Button>
                </div>

                <HomeHighlightForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    cardTypes={cardTypes}
                    submitLabel="Save changes"
                    processing={processing}
                    onSubmit={submit}
                />
            </div>
        </>
    );
}

AdminHomeHighlightsEdit.layout = (page) => (
    <AppLayout>{page}</AppLayout>
);

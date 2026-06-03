import { Head, Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import AppLayout from '@/layouts/app-layout';

export default function AccessRequestPending() {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('accessRequest.pending.headTitle')} />

            <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
                <span className="flex size-16 items-center justify-center rounded-full bg-beta-yellow/30 text-alpha-yellow">
                    <Clock className="size-8" aria-hidden />
                </span>

                <header className="space-y-3">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        {t('accessRequest.pending.title')}
                    </h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        {t('accessRequest.pending.description')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {t('accessRequest.pending.emailNotice')}
                    </p>
                </header>

                <Button asChild variant="outline">
                    <Link href="/">{t('accessRequest.common.goHome')}</Link>
                </Button>
            </div>
        </>
    );
}

AccessRequestPending.layout = (page) => <AppLayout>{page}</AppLayout>;

import { Head, Link } from '@inertiajs/react';
import { CircleX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';
import AppLayout from '@/layouts/app-layout';

const primaryButtonClass =
    'rounded-full bg-beta-blue text-twhite hover:bg-beta-blue/90';

export default function AccessRequestRejected() {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('accessRequest.rejected.headTitle')} />

            <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
                <span className="flex size-16 items-center justify-center rounded-full bg-beta-danger/30 text-alpha-danger">
                    <CircleX className="size-8" aria-hidden />
                </span>

                <header className="space-y-3">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        {t('accessRequest.rejected.title')}
                    </h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        {t('accessRequest.rejected.description')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {t('accessRequest.rejected.reapplyHint')}
                    </p>
                </header>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild className={primaryButtonClass}>
                        <Link href="/access-request/create">
                            {t('accessRequest.rejected.reapply')}
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/">{t('accessRequest.common.goHome')}</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}

AccessRequestRejected.layout = (page) => <AppLayout>{page}</AppLayout>;

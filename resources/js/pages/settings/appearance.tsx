import { Head, setLayoutProps } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import { useTranslation } from '@/contexts/TranslationContext';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    const { t } = useTranslation();

    setLayoutProps({
        breadcrumbs: [
            {
                title: t('settings.appearance.breadcrumbTitle'),
                href: editAppearance(),
            },
        ],
    });

    return (
        <>
            <Head title={t('settings.appearance.headTitle')} />

            <h1 className="sr-only">{t('settings.appearance.srTitle')}</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title={t('settings.appearance.headingTitle')}
                    description={t('settings.appearance.headingDescription')}
                />
                <AppearanceTabs />
            </div>
        </>
    );
}

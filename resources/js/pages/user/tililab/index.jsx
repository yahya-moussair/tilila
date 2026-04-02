import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import GuidelinesSection from '@/pages/user/tililab/partials/GuidelinesSection';
import HeroSection from '@/pages/user/tililab/partials/HeroSection';
import KeyDatesSection from '@/pages/user/tililab/partials/KeyDatesSection';
import MissionSection from '@/pages/user/tililab/partials/MissionSection';
import PastWinnersSection from '@/pages/user/tililab/partials/PastWinnersSection';
import { useTranslation } from '@/contexts/TranslationContext';

export default function TililabIndex() {
    return (
        <>
            <TililabHead />
            <div>
                <div className="bg-beta-white py-8">
                    <HeroSection />
                </div>

                <div className="bg-twhite py-8">
                    <section className="mx-auto max-w-7xl px-4 pb-12">
                        <div className="grid gap-6 lg:grid-cols-12">
                            <div className="lg:col-span-7">
                                <MissionSection />
                                <GuidelinesSection />
                            </div>
                            <div className="lg:col-span-5">
                                <KeyDatesSection />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="bg-beta-white py-8">
                    <PastWinnersSection />
                </div>
            </div>
        </>
    );
}

TililabIndex.layout = (page) => <AppLayout>{page}</AppLayout>;

function TililabHead() {
    const { t } = useTranslation();
    return <Head title={t('tililab.headTitle')} />;
}
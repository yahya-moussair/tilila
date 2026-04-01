import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ArchiveSection from '@/pages/user/tilila/partials/ArchiveSection';
import CtaSection from '@/pages/user/tilila/partials/CtaSection';
import FeaturedLaureatesSection from '@/pages/user/tilila/partials/FeaturedLaureatesSection';
import HeroSection from '@/pages/user/tilila/partials/HeroSection';

export default function TililaIndex() {
    return (
        <>
            <Head title="Tilila" />
            <div>
                <div className="pb-8">
                    <HeroSection />
                </div>
                <div className="bg-twhite px-8 py-10">
                    <FeaturedLaureatesSection />
                </div>
                <div className="bg-beta-white py-10">
                    <ArchiveSection />
                </div>
                <div className="bg-twhite py-10">
                    <CtaSection />
                </div>
            </div>
        </>
    );
}

TililaIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import CommitteeSection from '@/pages/user/about/partials/CommitteeSection';
import ContactSection from '@/pages/user/about/partials/ContactSection';
import HeroSection from '@/pages/user/about/partials/HeroSection';
import MissionSection from '@/pages/user/about/partials/MissionSection';
import PartnersSection from '@/pages/user/about/partials/PartnersSection';
import TililabCtaSection from '@/pages/user/about/partials/TililabCtaSection';

export default function About() {
    return (
        <>
            <Head title="About" />
            <div>
                <div className="bg-beta-white py-8">
                    <HeroSection />
                </div>
                <div className="bg-twhite py-8">
                    <MissionSection />
                </div>
                <div className="bg-beta-white py-8">
                    <CommitteeSection />
                </div>
                <div className="bg-twhite py-8">
                    <PartnersSection />
                </div>
                <div className="bg-beta-white py-8">
                    <TililabCtaSection />
                </div>
                <div className="bg-twhite py-8">
                    <ContactSection />
                </div>
            </div>
        </>
    );
}

About.layout = (page) => <AppLayout>{page}</AppLayout>;

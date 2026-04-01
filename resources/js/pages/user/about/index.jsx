import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import CommitteeSection from '@/pages/user/about/partials/CommitteeSection';
import ContactSection from '@/pages/user/about/partials/ContactSection';
import HeroSection from '@/pages/user/about/partials/HeroSection';
import MissionSection from '@/pages/user/about/partials/MissionSection';
import PartnersSection from '@/pages/user/about/partials/PartnersSection';

export default function About() {
    return (
        <>
            <Head title="About" />
            <div className="bg-background">
                <HeroSection />
                <MissionSection />
                <CommitteeSection />
                <PartnersSection />
                <ContactSection />
            </div>
        </>
    );
}

About.layout = (page) => <AppLayout>{page}</AppLayout>;

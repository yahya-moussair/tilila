import React from 'react';
import { Head } from '@inertiajs/react';
import Hero from '@/pages/home/Partials/Hero';
import ImpactStats from '@/pages/home/Partials/ImpactStats';
import AudienceCards from '@/pages/home/Partials/AudienceCards';
import Highlights from '@/pages/home/Partials/Highlights';

export default function HomeIndex({ canRegister = true }) {
    const heroImageSrc = '/assets/hero.png';
    const tropheeImageSrc = '/assets/trophee.png';
    const talkImageSrc = '/assets/talk.png';

    return (
        <>
            <Head title="Tilila">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <Hero imageSrc={heroImageSrc} />
            <ImpactStats />
            <AudienceCards />
            <Highlights
                tropheeImageSrc={tropheeImageSrc}
                talkImageSrc={talkImageSrc}
            />

            {/* kept for future auth-related CTA wiring */}
            <div className="sr-only" data-can-register={canRegister ? '1' : '0'} />
        </>
    );
}


import React from 'react';

import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/TranslationContext';

const languages = [
    { id: 'en', label: 'EN' },
    { id: 'fr', label: 'FR' },
    { id: 'ar', label: 'AR' },
];

export default function LanguageSwitcher({ className = '' }) {
    const { locale, setLocale } = useTranslation();

    return (
        <div
            className={[
                'flex items-center gap-1 rounded-full bg-alpha-blue p-1',
                className,
            ].join(' ')}
        >
            {languages.map((language) => {
                const isActive = locale === language.id;

                return (
                    <Button
                        key={language.id}
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setLocale(language.id)}
                        className={[
                            'h-8 rounded-full px-3 text-xs font-bold tracking-widest',
                            isActive
                                ? 'bg-twhite text-beta-blue shadow-sm hover:bg-twhite'
                                : 'text-tgray hover:bg-twhite/70 hover:text-tblack',
                        ].join(' ')}
                    >
                        {language.label}
                    </Button>
                );
            })}
        </div>
    );
}


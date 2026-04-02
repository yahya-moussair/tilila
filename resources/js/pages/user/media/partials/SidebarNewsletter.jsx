import React from 'react';

import TransText from '@/components/TransText';
import { useTranslation } from '@/contexts/TranslationContext';

export default function SidebarNewsletter() {
    const { t } = useTranslation();

    return (
        <aside className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="text-sm font-extrabold text-foreground">
                <TransText en="Stay informed" fr="Restez informée" ar="ابقَ على اطلاع" />
            </div>
            <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                <TransText
                    en="Get the latest media highlights and Tilila insights delivered weekly to your inbox."
                    fr="Recevez chaque semaine les temps forts médias et les insights Tilila dans votre boîte mail."
                    ar="احصل على أبرز المحتويات الإعلامية ورؤى تيليلا أسبوعيًا عبر بريدك الإلكتروني."
                />
            </div>

            <div className="mt-4 space-y-3">
                <input
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder={t('media.newsletter.emailPlaceholder')}
                    type="email"
                />
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-beta-blue px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                >
                    <TransText en="Subscribe" fr="S’abonner" ar="اشترك" />
                </button>
            </div>

            <div className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                <TransText
                    en="No spam. Unsubscribe anytime."
                    fr="Pas de spam. Désinscription à tout moment."
                    ar="لا رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت."
                />
            </div>
        </aside>
    );
}


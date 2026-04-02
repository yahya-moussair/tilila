import React from 'react';

import TransText from '@/components/TransText';

export default function MediaDetailsContent({ item, locale }) {
    const resolvedMeta = locale === 'ar' ? item.meta.ar : locale === 'fr' ? item.meta.fr : item.meta.en;

    return (
        <article className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
            <div className="text-xs font-semibold text-muted-foreground">{resolvedMeta}</div>

            <div className="prose prose-sm mt-6 max-w-none text-foreground prose-headings:font-extrabold prose-headings:text-foreground prose-p:text-muted-foreground">
                <h2>
                    <TransText
                        en="Key takeaways"
                        fr="Points clés"
                        ar="أبرز النقاط"
                    />
                </h2>
                <p>
                    <TransText
                        en={item.excerpt.en}
                        fr={item.excerpt.fr}
                        ar={item.excerpt.ar}
                    />
                </p>

                <h2>
                    <TransText
                        en="The economic importance of inclusion"
                        fr="L’importance économique de l’inclusion"
                        ar="الأهمية الاقتصادية للشمول"
                    />
                </h2>
                <p>
                    <TransText
                        en="When diverse voices are visible, audiences trust institutions more—and innovation follows. Tilila highlights practical actions: set measurable targets, diversify experts, and publish progress publicly."
                        fr="Quand les voix diverses sont visibles, le public fait davantage confiance aux institutions — et l’innovation suit. Tilila met en avant des actions concrètes : fixer des objectifs mesurables, diversifier les expertes et publier les progrès."
                        ar="عندما تصبح الأصوات المتنوعة مرئية، تزداد ثقة الجمهور بالمؤسسات — وتتبعه الابتكارات. تسلط تيليلا الضوء على خطوات عملية: وضع أهداف قابلة للقياس، تنويع الخبيرات، ونشر التقدم بشفافية."
                    />
                </p>

                <figure className="my-6 overflow-hidden rounded-2xl ring-1 ring-border">
                    <img
                        src={item.imageSrc}
                        alt=""
                        className="h-64 w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                    />
                </figure>

                <h2>
                    <TransText
                        en="Building long-term momentum"
                        fr="Construire une dynamique durable"
                        ar="بناء زخم طويل الأمد"
                    />
                </h2>
                <p>
                    <TransText
                        en="Progress accelerates when editorial guidelines, sourcing practices, and mentorship programs reinforce each other. Small operational changes—like widening expert databases—compound over time."
                        fr="Les progrès s’accélèrent lorsque les lignes éditoriales, les pratiques de sourcing et les programmes de mentorat se renforcent mutuellement. De petits changements opérationnels — comme élargir les bases d’expertes — ont un effet cumulatif."
                        ar="يتسارع التقدم عندما تتكامل الإرشادات التحريرية وممارسات الاستضافة وبرامج الإرشاد. التغييرات التشغيلية الصغيرة — مثل توسيع قاعدة بيانات الخبيرات — تتراكم آثارها مع الوقت."
                    />
                </p>
            </div>
        </article>
    );
}


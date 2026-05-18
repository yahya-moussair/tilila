/**
 * Zone A — Hero: featured video + institutional message (no CTAs in this zone per v2 IA).
 * Set VITE_HOME_HERO_VIDEO_EMBED_URL to a full embed URL (YouTube embed iframe src).
 */
export const HERO_ZONE_A = {
    /** Full iframe src URL, e.g. https://www.youtube-nocookie.com/embed/VIDEO_ID */
    videoEmbedUrl:
        typeof import.meta.env.VITE_HOME_HERO_VIDEO_EMBED_URL === 'string'
            ? import.meta.env.VITE_HOME_HERO_VIDEO_EMBED_URL.trim()
            : '',
    posterSrc: '/assets/hero.png',
    badge: {
        en: 'Programme EDI Tilila · SOREAD 2M',
        fr: 'Programme EDI Tilila · SOREAD 2M',
        ar: 'برنامج EDI تيليلا · SOREAD 2M',
    },
    cardKicker: {
        en: 'Voices of change',
        fr: 'Voix du changement',
        ar: 'أصوات التغيير',
    },
    titleBefore: {
        en: 'Empowering Women Experts,',
        fr: 'Valoriser les expertes,',
        ar: 'تمكين الخبيرات،',
    },
    titleAccent: {
        en: 'Shaping the Future',
        fr: 'façonner l’avenir',
        ar: 'وصناعة المستقبل',
    },
    description: {
        en: 'Connecting Moroccan and African women experts with media and institutions to drive parity, inclusion, and diversity in public discourse.',
        fr: 'Relier les expertes marocaines et africaines aux médias et aux institutions pour promouvoir la parité, l’inclusion et la diversité dans le débat public.',
        ar: 'ربط الخبيرات المغربيات والإفريقيات بوسائل الإعلام والمؤسسات لتعزيز المساواة والإدماج والتنوع في الخطاب العام.',
    },
    cardLine: {
        en: 'Bridging expertise and visibility.',
        fr: 'Lier expertise et visibilité.',
        ar: 'ربط الخبرة بالظهور.',
    },
};

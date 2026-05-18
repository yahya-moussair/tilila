<?php

namespace Database\Seeders;

use App\Models\TililaEdition;
use Illuminate\Database\Seeder;

class TililaEditionSeeder extends Seeder
{
    public function run(): void
    {
        $galleryPool = [
            'tilila-editions/gallery/6P4gPWju8RsOG7rfRUf2uOR8QYDOBVP8IsUsTvWZ.png',
            'tilila-editions/gallery/9CHyL864iE3mpHOthSvs5J5OFvdirn71ePnCjCHm.png',
            'tilila-editions/gallery/9WySHXN6CrnxgQ8X1VR7fm8XfDDD7QRxlXyi9eBy.png',
            'tilila-editions/gallery/AclWOpfQw9ogGMqauzyLgUZNddUS8X42L6vrQhlK.png',
            'tilila-editions/gallery/f7FyYoqAmOqG6fceJnMuFRE7HToFlxLTm3WnfKV8.png',
            'tilila-editions/gallery/fesZB4AUPcBz9ZLIHIJrNT28USSLxZJJLO3A09qg.jpg',
            'tilila-editions/gallery/HJOnErM6vFf7YZj8KWCiKAPYASTMKFrlRR3vBQXb.png',
            'tilila-editions/gallery/J97DRsT99c3m0pizeRqoIfeCAFtsYsFfTjLTEI7t.jpg',
            'tilila-editions/gallery/pHxNRRk9vsQ3XY8dsFzYVntTuE7Qou3GyDIIxoky.png',
            'tilila-editions/gallery/wwGxdt0DatYtNlTdF4nXiHiS2Uu85gxovb4fTT9U.png',
            'tilila-editions/gallery/wZrsUiu4ncitg6cW7q6V8iWVltD14WXUOYhsasuM.png',
            'tilila-editions/gallery/XZbOmwUaiwNqGQtuwgY62hbW4RqInzotIcIeK16c.png',
        ];

        $winnerPhoto = 'tilila-editions/winners/ZEYpQ499OJUEt0TBzCVEnkfN7U9cVbWwYNxC9OHF.png';
        $juryPhoto = 'tilila-editions/jury/lGfhkbWsJ48Jgkk2yGPKNrycQj4pDr9Wh2K8BWol.png';

        $themes = [
            2018 => ['en' => 'Brave Voices', 'fr' => 'Voix courageuses', 'ar' => 'أصوات شجاعة'],
            2019 => ['en' => 'Change Makers', 'fr' => 'Actrices du changement', 'ar' => 'صانعات التغيير'],
            2020 => ['en' => 'Resilience & Hope', 'fr' => 'Résilience & espoir', 'ar' => 'الصمود والأمل'],
            2021 => ['en' => 'New Narratives', 'fr' => 'Nouveaux récits', 'ar' => 'سرديات جديدة'],
            2022 => ['en' => 'Impact Stories', 'fr' => 'Histoires d’impact', 'ar' => 'قصص الأثر'],
            2023 => ['en' => 'Women in Spotlight', 'fr' => 'Femmes sous les projecteurs', 'ar' => 'نساء تحت الأضواء'],
            2024 => ['en' => 'Future is Inclusive', 'fr' => 'L’avenir est inclusif', 'ar' => 'المستقبل شامل'],
            2025 => ['en' => 'Bold by Design', 'fr' => 'Audacieuses par nature', 'ar' => 'جريئات بالتصميم'],
        ];

        $idx = 0;
        foreach (range(2018, 2025) as $year) {
            $label = [
                'en' => "Tilila Edition $year",
                'fr' => "Édition Tilila $year",
                'ar' => "دورة تيليلا $year",
            ];

            $images = [
                $galleryPool[$idx % count($galleryPool)],
                $galleryPool[($idx + 3) % count($galleryPool)],
                $galleryPool[($idx + 7) % count($galleryPool)],
            ];

            TililaEdition::query()->updateOrCreate(
                ['year' => (string) $year],
                [
                    'edition_label' => $label,
                    'theme' => $themes[$year] ?? ['en' => '', 'fr' => '', 'ar' => ''],
                    'winners' => [
                        [
                            'full_name' => 'Salma El Idrissi',
                            'bio' => [
                                'en' => 'Awarded for a powerful documentary short.',
                                'fr' => 'Récompensée pour un court-métrage documentaire marquant.',
                                'ar' => 'حصلت على الجائزة عن فيلم وثائقي قصير مؤثر.',
                            ],
                            'photo_path' => $winnerPhoto,
                        ],
                    ],
                    'jury' => [
                        [
                            'full_name' => 'Nadia Aït Lhaj',
                            'bio' => [
                                'en' => 'Producer and mentor, jury president.',
                                'fr' => 'Productrice et mentor, présidente du jury.',
                                'ar' => 'منتجة ومرشدة، رئيسة لجنة التحكيم.',
                            ],
                            'photo_path' => $juryPhoto,
                        ],
                        [
                            'full_name' => 'Omar El Kettani',
                            'bio' => [
                                'en' => 'Festival programmer and cultural curator.',
                                'fr' => 'Programmateur de festival et commissaire culturel.',
                                'ar' => 'مُبرمج مهرجانات وقيّم ثقافي.',
                            ],
                            'photo_path' => $juryPhoto,
                        ],
                    ],
                    'gallery_images' => $images,
                    'has_gallery' => true,
                    'winners_url' => null,
                    'jury_url' => null,
                    'gallery_url' => null,
                    'sort' => 0,
                ],
            );

            $idx++;
        }
    }
}


<?php

namespace Database\Seeders;

use App\Models\HomeHighlight;
use Illuminate\Database\Seeder;

class HomeHighlightSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $eventId = (int) (config('demo.home_highlights.event_id') ?? 1);
        $expertId = (int) (config('demo.home_highlights.expert_id') ?? 1);
        $tililaEditionId = (int) (config('demo.home_highlights.tilila_edition_id') ?? 1);
        $tililabEditionId = (int) (config('demo.home_highlights.tililab_edition_id') ?? 1);
        $opportunitySlug = (string) (config('demo.home_highlights.opportunity_slug') ?? 'women-in-tech-breaking-barriers');

        $rows = [
            [
                'title' => [
                    'en' => 'Upcoming TiliTalk: Women Leading Tech Innovation',
                    'fr' => 'Prochain TiliTalk : Femmes et innovation tech',
                    'ar' => 'TiliTalk القادم: نساء يقدن الابتكار التقني',
                ],
                'card_type' => 'event',
                'link_url' => "/events/{$eventId}",
                'highlight_date' => now()->subDays(2)->toDateString(),
                'is_active' => true,
                'sort_order' => 0,
            ],
            [
                'title' => [
                    'en' => 'Open call: Women in Tech panel (apply now)',
                    'fr' => 'Appel ouvert : panel Femmes & Tech (candidater)',
                    'ar' => 'دعوة مفتوحة: ندوة النساء في التكنولوجيا (قدّمي الآن)',
                ],
                'card_type' => 'press_release',
                'link_url' => "/learn/opportunities/{$opportunitySlug}",
                'highlight_date' => now()->subDays(1)->toDateString(),
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => [
                    'en' => 'Expert spotlight: Dr. Sarah Amiami',
                    'fr' => 'Focus experte : Dr Sarah Amiami',
                    'ar' => 'تسليط الضوء على خبيرة: د. سارة أميامي',
                ],
                'card_type' => 'expert_spotlight',
                'link_url' => "/experts/{$expertId}",
                'highlight_date' => now()->toDateString(),
                'is_active' => true,
                'sort_order' => 2,
            ],
        ];

        // Keep the demo list deterministic and within the MAX_ACTIVE=3 rule.
        HomeHighlight::query()->delete();
        foreach ($rows as $row) {
            HomeHighlight::query()->create($row);
        }
    }
}

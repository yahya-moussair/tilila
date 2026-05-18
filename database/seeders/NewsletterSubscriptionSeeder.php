<?php

namespace Database\Seeders;

use App\Models\NewsletterSubscription;
use Illuminate\Database\Seeder;

class NewsletterSubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            [
                'email' => 'newsletter.fr@example.org',
                'locale' => 'fr',
                'subscribed_at' => now()->subDays(30),
            ],
            [
                'email' => 'newsletter.en@example.org',
                'locale' => 'en',
                'subscribed_at' => now()->subDays(7),
            ],
            [
                'email' => 'newsletter.ar@example.org',
                'locale' => 'ar',
                'subscribed_at' => now()->subHours(1),
            ],
        ];

        foreach ($rows as $row) {
            NewsletterSubscription::query()->updateOrCreate(
                ['email' => $row['email']],
                $row
            );
        }
    }
}

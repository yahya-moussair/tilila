<?php

namespace Database\Seeders;

use App\Models\TililaConnectRequest;
use Illuminate\Database\Seeder;

class TililaConnectRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            [
                'request_type' => 'interview',
                'full_name' => 'Oumaima El Fassi',
                'email' => 'oumaima.elfassi@example.org',
                'phone' => '+212 6 00 00 00 00',
                'organization' => '2M (Editorial)',
                'message' => 'We would like to book an interview with an expert on women leadership & innovation. Please share 2-3 profiles available this week.',
                'locale' => 'fr',
                'ip' => '127.0.0.1',
                'user_agent' => 'Seeder',
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ],
            [
                'request_type' => 'speaker_panel',
                'full_name' => 'Sarah Benali',
                'email' => 'sarah.benali@example.org',
                'phone' => null,
                'organization' => 'University Club',
                'message' => 'We’re organizing a panel on inclusive governance and would love a Tilila expert speaker. Event date: next month.',
                'locale' => 'en',
                'ip' => '127.0.0.1',
                'user_agent' => 'Seeder',
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],
            [
                'request_type' => 'network',
                'full_name' => 'Khadija A.',
                'email' => 'khadija.network@example.org',
                'phone' => '+33 6 00 00 00 00',
                'organization' => 'Diaspora Network',
                'message' => 'Interested in joining the Tilila network and getting introduced to experts for upcoming collaborations.',
                'locale' => 'ar',
                'ip' => '127.0.0.1',
                'user_agent' => 'Seeder',
                'created_at' => now()->subHours(2),
                'updated_at' => now()->subHours(2),
            ],
        ];

        TililaConnectRequest::query()->delete();
        foreach ($rows as $row) {
            TililaConnectRequest::query()->create($row);
        }
    }
}

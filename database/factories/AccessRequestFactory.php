<?php

namespace Database\Factories;

use App\Enums\AccessRequestStatus;
use App\Models\AccessRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AccessRequest>
 */
class AccessRequestFactory extends Factory
{
    protected $model = AccessRequest::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'status' => AccessRequestStatus::Pending,
            'reason' => fake()->paragraph(),
            'organization' => fake()->optional()->company(),
            'profession' => fake()->jobTitle(),
            'reviewed_at' => null,
            'reviewed_by' => null,
            'resubmitted_at' => null,
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => AccessRequestStatus::Pending,
            'reviewed_at' => null,
            'reviewed_by' => null,
        ]);
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => AccessRequestStatus::Approved,
            'reviewed_at' => now(),
            'reviewed_by' => User::factory()->create(['role' => 'admin']),
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => AccessRequestStatus::Rejected,
            'reviewed_at' => now(),
            'reviewed_by' => User::factory()->create(['role' => 'admin']),
        ]);
    }

    public function revoked(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => AccessRequestStatus::Revoked,
            'reviewed_at' => now(),
            'reviewed_by' => User::factory()->create(['role' => 'admin']),
        ]);
    }
}

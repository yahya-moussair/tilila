<?php

use App\Enums\AccessRequestStatus;
use App\Mail\NewAccessRequestSubmitted;
use App\Models\AccessRequest;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

test('valid access request submission creates pending record', function () {
    Mail::fake();

    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);

    $response = $this->actingAs($user)->post(route('access-request.store'), [
        'reason' => 'I need access for media research.',
        'organization' => 'Test Media',
        'profession' => 'Journalist',
    ]);

    $response->assertRedirect(route('access-request.pending'));

    $this->assertDatabaseHas('access_requests', [
        'user_id' => $user->id,
        'status' => 'pending',
        'organization' => 'Test Media',
    ]);

    Mail::assertSent(NewAccessRequestSubmitted::class);
});

test('duplicate pending submission redirects with warning and does not error', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    AccessRequest::factory()->pending()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->post(route('access-request.store'), [
        'reason' => 'Another attempt',
        'profession' => 'Journalist',
    ]);

    $response->assertRedirect(route('access-request.pending'));
    $response->assertSessionHas('warning', 'Your access request is already under review.');
    expect($response->status())->not->toBe(500);

    expect(AccessRequest::query()->where('user_id', $user->id)->count())->toBe(1);
});

test('rapid duplicate submissions never return server error and create one record', function () {
    Mail::fake();

    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);

    $payload = [
        'reason' => 'I need access for media research.',
        'organization' => 'Test Media',
        'profession' => 'Journalist',
    ];

    $first = $this->actingAs($user)->post(route('access-request.store'), $payload);
    $second = $this->actingAs($user)->post(route('access-request.store'), $payload);

    $first->assertRedirect(route('access-request.pending'));
    $second->assertRedirect(route('access-request.pending'));
    $second->assertSessionHas('warning', 'Your access request is already under review.');
    expect($first->status())->not->toBe(500);
    expect($second->status())->not->toBe(500);
    expect(AccessRequest::query()->where('user_id', $user->id)->count())->toBe(1);
});

test('approved user duplicate submission redirects with access message', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    AccessRequest::factory()->approved()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->post(route('access-request.store'), [
        'reason' => 'Trying again',
        'profession' => 'Journalist',
    ]);

    $response->assertRedirect(route('experts.index'));
    $response->assertSessionHas('warning', 'You already have access to expert profiles.');
    expect($response->status())->not->toBe(500);
});

test('rejected user can re-apply and record resets to pending', function () {
    Mail::fake();

    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);

    $existing = AccessRequest::factory()->rejected()->create([
        'user_id' => $user->id,
        'reason' => 'Old reason',
        'organization' => 'Old Org',
        'profession' => 'Old Job',
    ]);

    $response = $this->actingAs($user)->post(route('access-request.store'), [
        'reason' => 'Updated reason for access.',
        'organization' => 'New Org',
        'profession' => 'Researcher',
    ]);

    $response->assertRedirect(route('access-request.pending'));
    $response->assertSessionHas('success');

    $existing->refresh();

    expect($existing->status)->toBe(AccessRequestStatus::Pending)
        ->and($existing->reason)->toBe('Updated reason for access.')
        ->and($existing->organization)->toBe('New Org')
        ->and($existing->profession)->toBe('Researcher')
        ->and($existing->reviewed_at)->toBeNull()
        ->and($existing->reviewed_by)->toBeNull()
        ->and($existing->resubmitted_at)->not->toBeNull();

    expect(AccessRequest::query()->where('user_id', $user->id)->count())->toBe(1);

    Mail::assertSent(NewAccessRequestSubmitted::class);
});

test('rejected user visiting create page receives prefilled form props', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);

    AccessRequest::factory()->rejected()->create([
        'user_id' => $user->id,
        'reason' => 'Prior reason text',
        'organization' => 'Prior Org',
        'profession' => 'Prior Profession',
    ]);

    $response = $this->actingAs($user)->get(route('access-request.create'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('access-request/create')
        ->where('isReapplication', true)
        ->where('prefill.reason', 'Prior reason text')
        ->where('prefill.organization', 'Prior Org')
        ->where('prefill.profession', 'Prior Profession')
    );
});

test('guest cannot access access request routes', function () {
    $this->get(route('access-request.create'))->assertRedirect(route('login'));
    $this->post(route('access-request.store'), ['reason' => 'test'])->assertRedirect(route('login'));
    $this->get(route('access-request.pending'))->assertRedirect(route('login'));
    $this->get(route('access-request.rejected'))->assertRedirect(route('login'));
});

test('missing reason fails validation', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);

    $response = $this->actingAs($user)->post(route('access-request.store'), [
        'reason' => '',
        'profession' => 'Journalist',
    ]);

    $response->assertSessionHasErrors('reason');
});

test('missing profession fails validation', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);

    $response = $this->actingAs($user)->post(route('access-request.store'), [
        'reason' => 'I need access for media research.',
        'profession' => '',
    ]);

    $response->assertSessionHasErrors('profession');
});

test('guest expert profile visit stores intended url for post login redirect', function () {
    $expert = createPublishedExpert();

    $response = $this->get(route('experts.show', $expert));

    $response->assertRedirect(route('login'));
    $response->assertSessionHas('url.intended', route('experts.show', $expert));
});

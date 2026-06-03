<?php

use App\Enums\AccessRequestStatus;
use App\Models\AccessRequest;
use App\Models\User;

test('guest visiting expert profile is redirected to login', function () {
    $expert = createPublishedExpert();

    $response = $this->get(route('experts.show', $expert));

    $response->assertRedirect(route('login'));
});

test('authenticated user without request is redirected to create form', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    $expert = createPublishedExpert();

    $response = $this->actingAs($user)->get(route('experts.show', $expert));

    $response->assertRedirect(route('access-request.create'));
});

test('authenticated user with pending request is redirected to pending page', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    AccessRequest::factory()->pending()->create(['user_id' => $user->id]);
    $expert = createPublishedExpert();

    $response = $this->actingAs($user)->get(route('experts.show', $expert));

    $response->assertRedirect(route('access-request.pending'));
});

test('authenticated user with rejected request is redirected to rejected page', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    AccessRequest::factory()->rejected()->create(['user_id' => $user->id]);
    $expert = createPublishedExpert();

    $response = $this->actingAs($user)->get(route('experts.show', $expert));

    $response->assertRedirect(route('access-request.rejected'));
});

test('authenticated user with approved request can view expert profile', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    AccessRequest::factory()->approved()->create(['user_id' => $user->id]);
    $expert = createPublishedExpert();

    $response = $this->actingAs($user)->get(route('experts.show', $expert));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('experts/[id]'));
});

test('authenticated user with revoked request is redirected to create form', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    AccessRequest::factory()->revoked()->create(['user_id' => $user->id]);
    $expert = createPublishedExpert();

    $response = $this->actingAs($user)->get(route('experts.show', $expert));

    $response->assertRedirect(route('access-request.create'));
});

test('middleware redirects to create when access request has corrupt status', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    $accessRequest = AccessRequest::factory()->approved()->create(['user_id' => $user->id]);
    $accessRequest->setRawAttributes(array_merge($accessRequest->getAttributes(), ['status' => 'corrupt']));
    $user->setRelation('accessRequest', $accessRequest);
    $expert = createPublishedExpert();

    $response = $this->actingAs($user)->get(route('experts.show', $expert));

    $response->assertRedirect(route('access-request.create'));
});

test('admin user can view expert profile without access request', function () {
    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    $expert = createPublishedExpert();

    $response = $this->actingAs($admin)->get(route('experts.show', $expert));

    $response->assertOk();
});

test('expert role user can view expert profile without access request', function () {
    $expertUser = User::factory()->create(['role' => 'expert', 'email_verified_at' => now()]);
    $expert = createPublishedExpert();

    $response = $this->actingAs($expertUser)->get(route('experts.show', $expert));

    $response->assertOk();
});

test('unpublished expert profile returns 404', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    AccessRequest::factory()->approved()->create(['user_id' => $user->id]);
    $expert = createPublishedExpert(['status' => 'draft']);

    $response = $this->actingAs($user)->get(route('experts.show', $expert));

    $response->assertNotFound();
});

test('after admin reaccepts rejected request middleware allows expert profile access', function () {
    Mail::fake();

    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    $accessRequest = AccessRequest::factory()->rejected()->create(['user_id' => $user->id]);
    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    $expert = createPublishedExpert();

    $this->actingAs($admin)->patch(route('admin.access-requests.reaccept', $accessRequest));

    $accessRequest->refresh();
    expect($accessRequest->status)->toBe(AccessRequestStatus::Approved);

    $response = $this->actingAs($user)->get(route('experts.show', $expert));

    $response->assertOk();
});

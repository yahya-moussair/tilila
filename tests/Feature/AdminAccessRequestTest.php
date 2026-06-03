<?php

use App\Enums\AccessRequestStatus;
use App\Mail\AccessRequestApproved;
use App\Mail\AccessRequestRejected;
use App\Models\AccessRequest;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

test('admin can approve pending access request', function () {
    Mail::fake();

    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    $request = AccessRequest::factory()->pending()->create();

    $response = $this->actingAs($admin)->patch(
        route('admin.access-requests.approve', $request),
    );

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $request->refresh();

    expect($request->status)->toBe(AccessRequestStatus::Approved)
        ->and($request->reviewed_at)->not->toBeNull()
        ->and($request->reviewed_by)->toBe($admin->id);

    Mail::assertQueued(AccessRequestApproved::class);
});

test('admin can reject pending access request', function () {
    Mail::fake();

    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    $request = AccessRequest::factory()->pending()->create();

    $response = $this->actingAs($admin)->patch(
        route('admin.access-requests.reject', $request),
    );

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $request->refresh();

    expect($request->status)->toBe(AccessRequestStatus::Rejected)
        ->and($request->reviewed_at)->not->toBeNull()
        ->and($request->reviewed_by)->toBe($admin->id);

    Mail::assertSent(AccessRequestRejected::class);
});

test('admin can reaccept rejected access request', function () {
    Mail::fake();

    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    $request = AccessRequest::factory()->rejected()->create([
        'reason' => 'Original reason',
        'organization' => 'Original Org',
        'profession' => 'Original Profession',
    ]);

    $response = $this->actingAs($admin)->patch(
        route('admin.access-requests.reaccept', $request),
    );

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Request re-accepted — activation link sent to applicant');

    $request->refresh();

    expect($request->status)->toBe(AccessRequestStatus::Approved)
        ->and($request->token)->not->toBeNull()
        ->and($request->expires_at)->not->toBeNull()
        ->and($request->reviewed_at)->not->toBeNull()
        ->and($request->reviewed_by)->toBe($admin->id)
        ->and($request->reason)->toBe('Original reason')
        ->and($request->organization)->toBe('Original Org')
        ->and($request->profession)->toBe('Original Profession');

    Mail::assertQueued(AccessRequestApproved::class, function (AccessRequestApproved $mail) use ($request) {
        return $mail->hasTo($request->user->email);
    });
});

test('admin cannot reaccept pending access request', function () {
    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    $request = AccessRequest::factory()->pending()->create();

    $response = $this->actingAs($admin)->patch(
        route('admin.access-requests.reaccept', $request),
    );

    $response->assertForbidden();
});

test('admin cannot reaccept approved access request', function () {
    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    $request = AccessRequest::factory()->approved()->create();

    $response = $this->actingAs($admin)->patch(
        route('admin.access-requests.reaccept', $request),
    );

    $response->assertForbidden();
});

test('non admin cannot reaccept access request', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    $request = AccessRequest::factory()->rejected()->create();

    $response = $this->actingAs($user)->patch(
        route('admin.access-requests.reaccept', $request),
    );

    $response->assertForbidden();
});

test('non admin cannot access admin access requests index', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);

    $response = $this->actingAs($user)->get(route('admin.access-requests.index'));

    $response->assertForbidden();
});

test('admin index filters by pending status', function () {
    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    AccessRequest::factory()->pending()->count(2)->create();
    AccessRequest::factory()->approved()->create();

    $response = $this->actingAs($admin)->get(route('admin.access-requests.index', ['status' => 'pending']));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/access-requests/index')
        ->has('requests.data', 2)
    );
});

test('admin index filters by approved status', function () {
    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    AccessRequest::factory()->pending()->create();
    AccessRequest::factory()->approved()->count(2)->create();

    $response = $this->actingAs($admin)->get(route('admin.access-requests.index', ['status' => 'approved']));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/access-requests/index')
        ->has('requests.data', 2)
    );
});

test('admin index ignores unknown status filter', function () {
    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    AccessRequest::factory()->pending()->create();
    AccessRequest::factory()->approved()->create();

    $response = $this->actingAs($admin)->get(route('admin.access-requests.index', ['status' => 'bogus']));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/access-requests/index')
        ->has('requests.data', 2)
    );
});

test('approved user can view expert profile after admin approval', function () {
    $user = User::factory()->create(['role' => 'user', 'email_verified_at' => now()]);
    $request = AccessRequest::factory()->pending()->create(['user_id' => $user->id]);
    $admin = User::factory()->create(['role' => 'admin', 'email_verified_at' => now()]);
    $expert = createPublishedExpert();

    Mail::fake();

    $this->actingAs($admin)->patch(route('admin.access-requests.approve', $request));

    $response = $this->actingAs($user)->get(route('experts.show', $expert));

    $response->assertOk();
});

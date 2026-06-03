<?php

use App\Models\AccessRequest;
use App\Models\User;
use Illuminate\Database\QueryException;

test('access request status helpers return correct values', function () {
    $pending = AccessRequest::factory()->pending()->make();
    $approved = AccessRequest::factory()->approved()->make();
    $rejected = AccessRequest::factory()->rejected()->make();
    $revoked = AccessRequest::factory()->revoked()->make();

    expect($pending->isPending())->toBeTrue()
        ->and($pending->isApproved())->toBeFalse()
        ->and($pending->isRejected())->toBeFalse()
        ->and($pending->isRevoked())->toBeFalse();

    expect($approved->isApproved())->toBeTrue()
        ->and($approved->isPending())->toBeFalse();

    expect($rejected->isRejected())->toBeTrue()
        ->and($rejected->isPending())->toBeFalse();

    expect($revoked->isRevoked())->toBeTrue()
        ->and($revoked->isApproved())->toBeFalse();
});

test('user accessRequest relationship returns the correct record', function () {
    $user = User::factory()->create();
    $request = AccessRequest::factory()->create(['user_id' => $user->id]);

    expect($user->accessRequest?->id)->toBe($request->id);
});

test('assigning an invalid status value throws ValueError', function () {
    AccessRequest::factory()->create(['status' => 'bogus']);
})->throws(ValueError::class);

test('database rejects invalid status values', function () {
    $user = User::factory()->create();

    expect(fn () => AccessRequest::query()->insert([
        'user_id' => $user->id,
        'status' => 'bogus',
        'reason' => 'Test',
        'profession' => 'Journalist',
        'created_at' => now(),
        'updated_at' => now(),
    ]))->toThrow(QueryException::class);
});

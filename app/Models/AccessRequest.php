<?php

namespace App\Models;

use App\Enums\AccessRequestStatus;
use Database\Factories\AccessRequestFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccessRequest extends Model
{
    /** @use HasFactory<AccessRequestFactory> */
    use HasFactory;

    public const ACTIVATION_EXPIRY_DAYS = 7;

    protected $fillable = [
        'user_id',
        'status',
        'reason',
        'organization',
        'profession',
        'reviewed_at',
        'reviewed_by',
        'resubmitted_at',
        'token',
        'expires_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => AccessRequestStatus::class,
            'reviewed_at' => 'datetime',
            'resubmitted_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    public function activationUrl(): string
    {
        if (! $this->token) {
            return url('/experts');
        }

        return url('/access-request/activate/'.$this->token);
    }

    public function isPending(): bool
    {
        return $this->status === AccessRequestStatus::Pending;
    }

    public function isApproved(): bool
    {
        return $this->status === AccessRequestStatus::Approved;
    }

    public function isRejected(): bool
    {
        return $this->status === AccessRequestStatus::Rejected;
    }

    public function isRevoked(): bool
    {
        return $this->status === AccessRequestStatus::Revoked;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ExpertApplication extends Model
{
    protected $fillable = [
        'full_name',
        'name_i18n',
        'email',
        'phone',
        'country',
        'city',
        'city_i18n',
        'industries',
        'languages',
        'current_title',
        'title_i18n',
        'expertise',
        'expertise_i18n',
        'bio',
        'bio_i18n',
        'quote_i18n',
        'socials',
        'linkedin_url',
        'portfolio_url',
        'cv_path',
        'locale',
        'ip',
        'user_agent',
        'status',
        'admin_notes',
        'reviewed_at',
        'reviewed_by_id',
        'expert_id',
    ];

    protected $appends = ['cv_url'];

    protected function casts(): array
    {
        return [
            'name_i18n' => 'array',
            'title_i18n' => 'array',
            'expertise_i18n' => 'array',
            'bio_i18n' => 'array',
            'city_i18n' => 'array',
            'industries' => 'array',
            'languages' => 'array',
            'quote_i18n' => 'array',
            'socials' => 'array',
            'reviewed_at' => 'datetime',
        ];
    }

    public function reviewedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by_id');
    }

    public function expert(): BelongsTo
    {
        return $this->belongsTo(Expert::class);
    }

    public function getCvUrlAttribute(): ?string
    {
        if (! $this->cv_path) {
            return null;
        }

        return Storage::url($this->cv_path);
    }
}

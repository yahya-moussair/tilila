<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Expert extends Model
{
    protected $fillable = [
        'user_id',
        'slug',
        'name',
        'title',
        'tags',
        'location',
        'city_i18n',
        'country',
        'industries',
        'languages',
        'badge',
        'status',
        'email',
        'image',
        'details',
        'last_activity_at',
    ];

    /**
     * Storage path is internal; public consumers use `image_url`.
     *
     * @var list<string>
     */
    protected $hidden = ['image'];

    /**
     * @var list<string>
     */
    protected $appends = ['image_url'];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'name' => 'array',
            'title' => 'array',
            'tags' => 'array',
            'city_i18n' => 'array',
            'industries' => 'array',
            'languages' => 'array',
            'details' => 'array',
            'last_activity_at' => 'datetime',
        ];
    }

    public function isPublished(): bool
    {
        return $this->status === 'published';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Single-line location for directory / cards (legacy JSON rows are normalized).
     */
    protected function locationPlain(): string
    {
        $city = $this->cityI18nPlain();
        if ($city !== '') {
            return $city;
        }

        $v = $this->location;

        if ($v === null || $v === '') {
            return '';
        }

        if (is_string($v)) {
            return $v;
        }

        if (is_array($v)) {
            return (string) ($v['en'] ?? $v['fr'] ?? $v['ar'] ?? '');
        }

        return '';
    }

    protected function cityI18nPlain(): string
    {
        $city = $this->city_i18n;
        if (! is_array($city)) {
            return '';
        }

        return trim((string) ($city['en'] ?? $city['fr'] ?? $city['ar'] ?? ''));
    }

    /**
     * Public URL for the stored profile image (`image` = relative path on the public disk).
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: function (): ?string {
                $path = $this->attributes['image'] ?? null;
                if (! is_string($path) || $path === '' || ! Storage::disk('public')->exists($path)) {
                    return null;
                }

                $path = str_replace('\\', '/', $path);

                return '/storage/'.ltrim($path, '/');
            }
        );
    }

    protected static function booted(): void
    {
        static::deleting(function (Expert $expert): void {
            $path = $expert->getAttributes()['image'] ?? null;
            if (is_string($path) && $path !== '') {
                Storage::disk('public')->delete($path);
            }
        });
    }

    /**
     * Shape expected by public React experts directory.
     *
     * @return array<string, mixed>
     */
    public function toDirectoryArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'title' => $this->title,
            'tags' => $this->tags ?? [],
            'location' => $this->locationPlain(),
            'city_i18n' => $this->city_i18n,
            'country' => $this->country,
            'industries' => $this->industries ?? [],
            'languages' => $this->languages ?? [],
            'badge' => $this->badge,
            'image' => $this->image_url,
            'email' => $this->email,
        ];
    }
}

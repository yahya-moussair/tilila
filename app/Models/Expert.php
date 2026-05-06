<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'country',
        'region_scope',
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
            'country' => $this->country,
            'region_scope' => $this->region_scope,
            'industries' => $this->industries ?? [],
            'languages' => $this->languages ?? [],
            'badge' => $this->badge,
            'image' => $this->image_url,
            'email' => $this->email,
        ];
    }
}

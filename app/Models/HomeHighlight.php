<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class HomeHighlight extends Model
{
    /**
     * @var list<string>
     */
    public const CARD_TYPES = [
        'event',
        'press_release',
        'expert_spotlight',
        'partner_initiative',
    ];

    protected $fillable = [
        'title',
        'card_type',
        'link_url',
        'highlight_date',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'title' => 'array',
            'highlight_date' => 'date',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * @param  Builder<HomeHighlight>  $query
     * @return Builder<HomeHighlight>
     */
    public function scopeActiveOrdered(Builder $query): Builder
    {
        return $query
            ->where('is_active', true)
            ->orderByDesc('highlight_date')
            ->orderBy('sort_order')
            ->orderByDesc('id');
    }

    /**
     * @return array{title: array{en?: string, fr?: string, ar?: string}, card_type: string, link_url: string, highlight_date: string}
     */
    public function toPublicArray(): array
    {
        return [
            'title' => is_array($this->title) ? $this->title : ['en' => '', 'fr' => '', 'ar' => ''],
            'card_type' => $this->card_type,
            'link_url' => $this->link_url,
            'highlight_date' => $this->highlight_date?->format('Y-m-d') ?? '',
        ];
    }
}

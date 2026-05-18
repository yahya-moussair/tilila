<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class TililaContestParticipant extends Model
{
    protected $table = 'tilila_contest_participants';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'city',
        'country',
        'submission_title',
        'submission_description',
        'submission_link',
        'submission_video_path',
        'accepted_rules',
        'locale',
        'ip',
        'user_agent',
    ];

    protected $casts = [
        'accepted_rules' => 'boolean',
    ];

    protected $appends = ['submission_video_url'];

    public function getSubmissionVideoUrlAttribute(): ?string
    {
        if (! $this->submission_video_path) {
            return null;
        }

        return Storage::url($this->submission_video_path);
    }
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TililaConnectRequest extends Model
{
    protected $fillable = [
        'request_type',
        'full_name',
        'email',
        'phone',
        'organization',
        'message',
        'locale',
        'ip',
        'user_agent',
    ];
}

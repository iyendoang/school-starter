<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Token extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'token_access',
        'application_id',
        'expired_at',
        'status',
        'school_id'
    ];

    protected $casts = [
        'expired_at' => 'datetime',
    ];

    public function application()
    {
        return $this->belongsTo(Application::class, 'application_id', 'id');
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }
}

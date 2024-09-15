<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Token extends Model
{
    use HasFactory;

    protected $fillable = [
        'token_access', // Ensure this matches the database schema
        'application_id',
        'expired_at',
        'status',
        'school_id' // Ensure this matches the database schema
    ];

    protected $casts = [
        'expired_at' => 'datetime',
    ];

    // Define the relationship with Application model
    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    // Define the relationship with School model
    public function school()
    {
        return $this->belongsTo(School::class);
    }
}

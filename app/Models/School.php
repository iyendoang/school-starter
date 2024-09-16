<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'npsn'];

    // Define the one-to-many relationship with Token model
   public function tokens()
{
    return $this->hasMany(Token::class, 'school_id', 'id');
}
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name'];
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public function tokens()
    {
        return $this->hasMany(Token::class, 'application_id', 'id');
    }
}

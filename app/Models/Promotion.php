<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $primaryKey = 'code';
    protected $keyType = 'string';

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}

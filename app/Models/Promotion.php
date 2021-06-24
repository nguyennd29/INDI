<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    const SERVICE_FEE = 1;
    const DIRECT_DISCOUNT = 2;
    const PERCENT_DISCOUNT = 3;

    protected $primaryKey = 'code';
    protected $keyType = 'string';

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}

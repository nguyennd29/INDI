<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtraService extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'service_name',
        'price'
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}

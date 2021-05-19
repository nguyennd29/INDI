<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'store_id',
        'user_name',
        'user_phone',
        'file_list',
        'note',
        'rating',
        'comment',
        'cost',
        'status',
        'canceled_at',
        'printed_at',
        'picked_at'
    ];
}

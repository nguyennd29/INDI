<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    const CREATED = 'CREATED';
    const RECEIVED = 'RECEIVED';
    const PROCESSING = 'PROCESSING';
    const PRINTING_DONE = 'PRINTING_DONE';
    const PICKED = 'PICKED';
    const CANCELED = 'CANCELED';
    const DENIED = 'DENIED';

    protected $fillable = [
        'user_id',
        'store_id',
        'user_name',
        'user_phone',
        'note',
        'rating',
        'comment',
        'cost',
        'status',
        'received_at',
        'canceled_at',
        'printing_done_at',
        'picked_at'
    ];

    public function extraServices()
    {
        return $this->belongsToMany(ExtraService::class)->withPivot('type');
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }
}

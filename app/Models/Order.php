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
    const PRINTED = 'PRINTED';
    const PICKED = 'PICKED';
    const CANCELED = 'CANCELED';

    protected $fillable = [
        'id',
        'user_id',
        'store_id',
        'user_name',
        'user_phone',
        'user_mail',
        'note',
        'rating',
        'comment',
        'cost',
        'code',
        'status',
        'due_at',
        'received_at',
        'canceled_at',
        'printed_at',
        'picked_at'
    ];

    public $incrementing = false;

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

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Store extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'store_name',
        'address',
        'introduction',
        'logo_image',
        'owner_id'
    ];


    public function extraServices()
    {
        return $this->hasMany(ExtraService::class);
    }

    public function printServices()
    {
        return $this->hasMany(PrintService::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }
}

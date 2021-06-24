<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class File extends Model
{
    use HasFactory;

    const UPLOADED = 1;
    const DELETED = 2;

    protected $fillable = [
        'order_id',
        'file_name',
        'url',
        'page_count',
        'print_service_id',
        'copy_num',
        'status',
    ];

    public function printService()
    {
        return $this->belongsTo(PrintService::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}

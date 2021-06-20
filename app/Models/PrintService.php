<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrintService extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'print_type',
        'page_type',
        'color_type',
        'paper_size',
        'price_per_page'
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}

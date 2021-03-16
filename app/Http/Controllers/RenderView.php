<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RenderView extends Controller
{
    public function __invoke()
    {
        return view('spa');
    }
}

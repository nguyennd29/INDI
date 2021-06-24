<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    public function getPromotionByCode($code)
    {
        $promotion = Promotion::find($code);
        if ($promotion) {
            return response()->json($promotion, 200);
        }

        return response()->json(['error' => 'Áp dụng mã thất bại'], 400);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $promotion = Promotion::create($data);

        return response()->json([
            'promotion' => $promotion,
            'message' => 'Tạo mã thành công',
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\ExtraService;
use App\Models\Order;
use App\Models\PrintService;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class StoreController extends Controller
{
    public function index()
    {
        $stores = Store::with(['printServices', 'extraServices', 'owner'])->get();

        foreach ($stores as $store) {
            $avg_rating = Order::where('store_id', $store->id)->avg('rating');

            $store['rating'] = $avg_rating;

            $orders = $store->orders->filter(function ($value, $key) {
                return $value->rating != null;
            });

            $store['feedback_count'] = $orders->count();
        }
        return response()->json($stores, 200);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $ownerData = $request->only([
                'email',
                'password',
                'phone',
            ]);

            $ownerData['role'] = 'store';
            $ownerData['user_name'] = $request->owner_name;
            $ownerData['password'] = Hash::make($request->password);
            $owner = User::create($ownerData);

            if ($owner) {
                $storeData = $request->only([
                    'store_name',
                    'address',
                    'introduction',
                    'logo_image'
                ]);

                $storeData['owner_id'] = $owner->id;
                $store = Store::create($storeData);

                $printServices = $request->print_services;
                $extraServices = $request->extra_services;


                foreach($printServices as $printService) {
                    if ($printService['price_per_page']) {
                        $printService['store_id'] = $store->id;
                        PrintService::create($printService);
                    }
                }

                foreach($extraServices as $extraService) {
                    if ($extraService['price']) {
                        $extraService['store_id'] = $store->id;
                        ExtraService::create($extraService);
                    }
                }
            }


            DB::commit();

            return response()->json($store, 200);
        }
        catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => $e,
                'message' => 'Tạo cửa hàng thất bại'
            ], 400);

        }
    }

    public function getStoreById($store_id)
    {
        $store = Store::find($store_id);
        if ($store) {
            $store->load('orders', 'owner');

            $avg_rating = Order::where('store_id', $store->id)->avg('rating');

            $store['rating'] = $avg_rating;

            return response()->json($store, 200);
        }

        return response()->json(['error' => 'Lấy thông tin cửa hàng thất bại'], 400);
    }

//    public function update(Request $request, Store $store)
//    {
//        $data = $request->all();
//        $store->update($data);
//
//        return response()->json($store, 200);
//    }

//    public function delete(Store $store)
//    {
//        $store->delete();
//        $stores = Store::orderBy('id', 'desc')->get();
//
//        return response()->json($stores, 200);
//    }
}

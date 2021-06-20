<?php

namespace App\Http\Controllers;

use App\Models\ExtraService;
use App\Models\File;
use App\Models\Order;
use App\Models\PrintService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'store_id' => 'required',
            'user_name' => 'required',
            'user_phone' => 'required',
            'files' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $orderData = $request->only([
                'store_id',
                'note',
                'user_name',
                'user_phone'
            ]);

            $order = Order::create($orderData);
            if ($order) {
                $order->update(['status' => Order::CREATED]);
            }

            if ($request->user_id) {
                $order->user_id = $request->user_id;
                $order->save();
            }

            foreach($request->filesData as $fileData) {

                $fileItem = File::find($fileData['file_id']);
                if ($fileItem) {
                    $fileItem->print_service_id = $fileData['print_service_id'];
                    $fileItem->copy_num = $fileData['copy_num'];
                    $fileItem->order_id = $order->id;
                    $fileItem->save();
                }
            }

            if ($request->extra_services) {
                $extra_type = $request->extra_type ? $request->extra_type :'EACH';
                foreach($request->extra_services as $extra_service) {
                    $order->extraServices()->attach($extra_service, ['type' => $extra_type]);
                }
            }

            $order->load('extraServices', 'files.printService', 'store');

            DB::commit();
            return response()->json($order, 200);
        }
        catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => $e,
                'message' => 'Tạo cửa hàng thất bại'
            ], 400);

        }

    }
}

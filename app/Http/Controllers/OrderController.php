<?php

namespace App\Http\Controllers;

use App\Models\ExtraService;
use App\Models\File;
use App\Models\Order;
use App\Models\PrintService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function getOrdersByStore($store_id) {
        $orders = Order::with('extraServices', 'files.printService')->where('store_id', $store_id)->get();

        return response()->json($orders, 200);
    }

    public function receive($order_id) {
        $order = Order::find($order_id);
        if ($order && $order->status === 'CREATED') {
            $order->status = 'RECEIVED';
            $order->received_at = now();
            $order->save();

            return response()->json($order, 200);
        }

        return response()->json(['error' => 'Action Error'], 400);
    }

    public function process($order_id) {
        $order = Order::find($order_id);
        if ($order && $order->status === 'RECEIVED') {
            $order->status = 'PROCESSING';
//            $order->processed_at = now();
            $order->save();

            return response()->json($order, 200);
        }

        return response()->json(['error' => 'Action Error'], 400);
    }

    public function printed($order_id) {
        $order = Order::find($order_id);
        if ($order && $order->status === 'PROCESSING') {
            $order->status = 'PRINTED';
            $order->printed_at = now();
            $order->save();

            return response()->json($order, 200);
        }

        return response()->json(['error' => 'Action Error'], 400);
    }

    public function pick($order_id) {
        $order = Order::find($order_id);
        if ($order && $order->status === 'PRINTED') {
            $order->status = 'PICKED';
            $order->picked_at = now();
            $order->save();

            return response()->json($order, 200);
        }

        return response()->json(['error' => 'Action Error'], 400);
    }

    public function cancel($order_id) {
        $order = Order::find($order_id);
        if ($order) {
            $order->status = 'CANCELED';
            $order->canceled_at = now();
            $order->save();

            return response()->json($order, 200);
        }

        return response()->json(['error' => 'Action Error'], 400);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'store_id' => 'required',
            'user_name' => 'required',
            'user_phone' => 'required',
            'files' => 'required',
            'due_at' => 'required',
        ]);

        DB::beginTransaction();
        try {
            $orderData = $request->only([
                'store_id',
                'note',
                'user_name',
                'user_phone',
                'code'
            ]);

            $order = Order::create($orderData);
            if ($order) {
                $due = new Carbon($request->due_at);

                $order->update([
                    'status' => Order::CREATED,
                    'due_at' => $due,
                ]);
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

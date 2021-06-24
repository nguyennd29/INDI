<?php

namespace App\Http\Controllers;

use App\Models\ExtraService;
use App\Models\File;
use App\Models\Order;
use App\Models\PrintService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    public function getOrderById($order_id)
    {
        $order = Order::find($order_id);
        if ($order) {
            $order->load('extraServices', 'files.printService', 'store');

            return response()->json($order, 200);
        }

        return response()->json(['error' => 'Lấy thông tin đơn hàng thất bại'], 400);

    }

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
            $order->processed_at = now();
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
        try {
            DB::beginTransaction();

            $order = Order::find($order_id);
            if ($order && $order->status === 'PRINTED') {
                $order->status = 'PICKED';
                $order->picked_at = now();
                $order->save();

                foreach ($order->files as $file) {
                    if (Storage::disk('public')->exists('/files/'.$file->file_name)){
                        Storage::disk('public')->delete('/files/'.$file->file_name);
                        $file->status = File::DELETED;
                        $file->save();
                    }
                }

                DB::commit();
                return response()->json($order, 200);
            }
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Action Error'], 400);
        }
    }

    public function cancel($order_id) {
        try {
            DB::beginTransaction();

            $order = Order::find($order_id);
            if ($order) {
                $order->status = 'CANCELED';
                $order->canceled_at = now();
                $order->save();

                foreach ($order->files as $file) {
                    if (Storage::disk('public')->exists('/files/'.$file->file_name)){
                        Storage::disk('public')->delete('/files/'.$file->file_name);
                        $file->status = File::DELETED;
                        $file->save();
                    }
                }

                DB::commit();
                return response()->json($order, 200);
            }
        }
        catch (\Exception $e) {
            DB::rollBack();

            return response()->json(['error' => 'Action Error'], 400);
        }
    }

    function generateBarcodeNumber() {
        $number = mt_rand(10000000, 99999999);

        // call the same function if the barcode exists already
        if ($this->barcodeNumberExists($number)) {
            return $this->generateBarcodeNumber();
        }

        // otherwise, it's valid and can be used
        return $number;
    }

    function barcodeNumberExists($number) {
        // query the database and return a boolean
        return Order::find($number) != null;
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
            $orderData['id'] = $this->generateBarcodeNumber();
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

            dd($e);
            return response()->json([
                'error' => $e,
                'message' => 'Tạo cửa hàng thất bại'
            ], 400);
        }

    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index()
    {
        $stores = Store::orderBy('id', 'desc')->get();

        return response()->json($stores, 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $store = Store::create($data);

        return response()->json($store, 200);
    }

    public function show(Store $store)
    {
        return response()->json($store, 200);
    }

    public function update(Request $request, Store $store)
    {
        $data = $request->all();
        $store->update($data);

        return response()->json($store, 200);
    }

    public function delete(Store $store)
    {
        $store->delete();
        $stores = Store::orderBy('id', 'desc')->get();

        return response()->json($stores, 200);
    }
}

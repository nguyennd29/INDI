<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

 Route::prefix('stores')->name('stores.')->group(function () {
     Route::get('', 'StoreController@index')->name('index');
     Route::post('', 'StoreController@store')->name('store');
     Route::get('{store}', 'StoreController@show')->name('show');
     Route::post('{store}', 'StoreController@update')->name('update');
     Route::post('delete/{store}', 'StoreController@delete')->name('delete');
 });

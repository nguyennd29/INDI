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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

 Route::prefix('stores')->name('stores.')->group(function () {
     Route::get('', 'App\Http\Controllers\StoreController@index')->name('index');
     Route::post('', 'App\Http\Controllers\StoreController@store')->name('store');
//     Route::get('{store}', 'StoreController@show')->name('show');
//     Route::post('{store}', 'StoreController@update')->name('update');
//     Route::post('delete/{store}', 'StoreController@delete')->name('delete');
 });


Route::prefix('auth')->name('auth.')->group(function () {
//    Route::get('', 'AuthController@index')->name('index');
    Route::post('/login', 'App\Http\Controllers\AuthController@authenticate')->name('login');
    Route::post('/register', 'App\Http\Controllers\AuthController@register')->name('register');
    Route::any('/logout', 'App\Http\Controllers\AuthController@logout')->name('logout');

});

Route::post('/file','App\Http\Controllers\FileController@store')->name('upload');
Route::get('/file/download/{file_id}','App\Http\Controllers\FileController@download')->name('download');

Route::post('/logo','App\Http\Controllers\FileController@storeLogo')->name('uploadLogo');
Route::post('/file/delete','App\Http\Controllers\FileController@delete')->name('delete');

Route::prefix('order')->name('order.')->group(function () {
    Route::post('','App\Http\Controllers\OrderController@store')->name('store');
    Route::get('{order_id}','App\Http\Controllers\OrderController@getOrderById')->name('show');
    Route::post('update/{order_id}', 'App\Http\Controllers\OrderController@update')->name('update');
    Route::post('cancel/{order_id}', 'App\Http\Controllers\OrderController@cancel')->name('cancel');
    Route::post('receive/{order_id}', 'App\Http\Controllers\OrderController@receive')->name('receive');
    Route::post('process/{order_id}', 'App\Http\Controllers\OrderController@process')->name('process');
    Route::post('printed/{order_id}', 'App\Http\Controllers\OrderController@printed')->name('printed');
    Route::post('pick/{order_id}', 'App\Http\Controllers\OrderController@pick')->name('pick');
    Route::post('feedback', 'App\Http\Controllers\OrderController@feedback')->name('feedback');

    Route::get('/order-store/{store_id}','App\Http\Controllers\OrderController@getOrdersByStore')->name('get-orders-by-store');
});

Route::post('feedback', 'App\Http\Controllers\FeedbackController@store')->name('feedback');
Route::get('/promotion/{code}','App\Http\Controllers\PromotionController@getPromotionByCode')->name('get-promotion');

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

Route::prefix('orders')->name('orders.')->group(function () {
    Route::get('', 'OrderController@index')->name('index');
    Route::post('', 'OrderController@store')->name('store');
    Route::get('{order}', 'OrderController@show')->name('show');
    Route::post('{order}', 'OrderController@update')->name('update');
    Route::post('delete/{order}', 'OrderController@delete')->name('delete');
});

Route::prefix('auth')->name('auth.')->group(function () {
//    Route::get('', 'AuthController@index')->name('index');
    Route::post('/login', 'App\Http\Controllers\AuthController@authenticate')->name('login');
    Route::post('/register', 'App\Http\Controllers\AuthController@register')->name('register');
    Route::any('/logout', 'App\Http\Controllers\AuthController@logout')->name('logout');

});

Route::post('/file','App\Http\Controllers\FileController@store')->name('upload');
Route::post('/logo','App\Http\Controllers\FileController@storeLogo')->name('uploadLogo');
Route::post('/file/delete','App\Http\Controllers\FileController@delete')->name('delete');

Route::post('/order','App\Http\Controllers\OrderController@store')->name('create-order');

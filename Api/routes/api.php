<?php

use App\Http\Controllers\CustomerController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Customer Apis
Route::group(['prefix' => 'customers'], function() {
    Route::get('/', [CustomerController::class, 'index'])->name('customers.all');
    Route::post('/store', [CustomerController::class, 'store'])->name('customers.store');
    Route::patch('/update/{customer}', [CustomerController::class, 'update'])->name('customers.update');
    Route::delete('/destroy/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');
});


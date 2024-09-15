<?php

use App\Http\Controllers\Api\SchoolController;
use App\Http\Controllers\Api\TokenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/schools', [SchoolController::class, 'index']);
Route::get('/tokens', [TokenController::class, 'index']);
Route::post('/verify-token', [TokenController::class, 'verifyToken']);
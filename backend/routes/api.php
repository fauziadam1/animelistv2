<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [UserController::class, 'me']);
    Route::put('/update', [UserController::class, 'update']);
    Route::patch('/role-admin/{id}', [UserController::class, 'handleAdmin']);
    Route::patch('/role-user/{id}', [UserController::class, 'handleUser']);

    Route::post('/anime', [AnimeController::class, 'store']);
    Route::put('/anime/{id}', [AnimeController::class, 'update']);
    Route::delete('/anime/{id}', [AnimeController::class, 'delete']);

    Route::post('/genre', [GenreController::class, 'store']);
    Route::put('/genre/{id}', [GenreController::class, 'update']);
    Route::delete('/genre/{id}', [GenreController::class, 'delete']);

    Route::post('/author', [AuthorController::class, 'store']);
    Route::put('/author/{id}', [AuthorController::class, 'update']);
    Route::delete('/author/{id}', [AuthorController::class, 'delete']);
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/create-admin', [UserController::class, 'admin']);

Route::get('/genres', [GenreController::class, 'index']);
Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/animes', [AnimeController::class, 'index']);

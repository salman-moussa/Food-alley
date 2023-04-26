<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IngredientController;



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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();

});
Route::controller(RecipeController::class)->group(function (){
Route::get('/recipes',  'index');
Route::post('/recipes',  'store');
Route::get('/recipes/{id}',  'show');
Route::put('/recipes/{id}',  'update');
Route::delete('/recipes/{id}',  'destroy');
});
Route::resource('kitchens', 'App\Http\Controllers\KitchenController')->middleware('auth:api');

Route::get('/ingredients', [IngredientController::class, 'index']);
Route::post('/ingredients', [IngredientController::class, 'store']);
Route::delete('/ingredients/{id}', [IngredientController::class, 'destroy']);
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdministrativeDocController;
use App\Http\Controllers\ScientificBodyDocController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubcategoryController;

use App\Http\Controllers\UserController;
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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/signIn' , [UserController::class , 'signIn']);
Route::get('/signOut' , [UserController::class , 'signOut'])->middleware('auth:api');
Route::get('/authUserInfo', [UserController::class,'getUserInfo'])->middleware('auth:api');
Route::put('/users/{id}' , [UserController::class , 'update'])->middleware('auth:api');
Route::post('/register' , [UserController::class , 'register'])->middleware('auth:api');
Route::post('/users/delete' , [UserController::class , 'destroy'])->middleware('auth:api');
Route::group(['middleware' => 'auth:api'], function () {
    Route::apiResources(['categories.subcategories.administrativeDocs'=>AdministrativeDocController::Class,

    'categories.subcategories.scientificBodyDocs'=>ScientificBodyDocController::class
]);
});



Route::get('/categories' , [CategoryController::class , 'index'])->middleware('auth:api');

Route::get('/categories/{catId}/subcategories' , [SubcategoryController::class , 'getSpecSubcats'])->middleware('auth:api');
Route::get('/categories/{catId}/subcategories/{subcatId}/administrativeDocs/{docId}/view',
            [AdministrativeDocController::class , 'viewDoc'])->middleware('auth:api');

Route::get('/categories/{catId}/subcategories/{subcatId}/scientificBodyDocs/{docId}/view',
            [ScientificBodyDocController::class , 'viewDoc'])->middleware('auth:api');

Route::get('/administrativeDocs/search' , [AdministrativeDocController::class , 'search'])->middleware('auth:api');
Route::get('/scientificBodyDocs/search' , [ScientificBodyDocController::class , 'search'])->middleware('auth:api');
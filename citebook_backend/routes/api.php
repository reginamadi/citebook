<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostInteractionsController;
use App\Http\Controllers\VerificationController;
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


Log::debug('Some message.');
//Route::post('register',[UserController::class,'register']);
Route::post('register',[UserController::class,'register']);
Route::post('reset_pass',[UserController::class,'reset_pass']);
Route::post('reset_pass2',[UserController::class,'reset_pass2']);
Route::get('email/verify/{id}',[VerificationController::class,'verify'])->name('verification.verify');
Route::post('login',[UserController::class,'login']);
Route::post('addpost',[PostController::class,'addpost']);
Route::post('/add_post_scholar',[PostController::class,'add_post_scholar']);

Route::get('feed_posts/{id}',[PostController::class,'feed_posts']);
Route::get('get_all_posts/{id}',[PostController::class,'get_all_posts']);
Route::get('my_posts/{id}',[PostController::class,'my_posts']);
Route::get('profile_posts/{id}',[PostController::class,'profile_posts']);

Route::get('/user_info/{id}',[UserController::class,'get_info']);
Route::get('/user_profile/{id}',[UserController::class,'get_user_profile']);

Route::post('like_post',[PostController::class,'like_post']);
Route::get('its_liked/{user_id}/{post_id}',[PostController::class,'its_liked']);

Route::post('user_viewed_post',[PostController::class,'user_viewed_post']);
Route::get('user_already_viewed/{user_id}/{post_id}',[PostController::class,'user_already_viewed']);

Route::get('get_file/{post_id}',[PostController::class,'get_file']);
Route::delete('delete_post/{post_id}',[PostController::class,'delete_post']);
Route::get('/recent_likes/{user_id}',[PostController::class,'recent_likes']);

Route::post('test',[PostController::class,'test']);
Route::get('/personalized_feed/{user_id}', [PostInteractionsController::class, 'createPersonalizedFeed']);
Route::get('/content-based-matrix/{post_id}', [PostInteractionsController::class, 'createContentBasedMatrix']);


Route::post('upload_picture',[UserController::class,'upload_picture']);
Route::get('/picture_url/{user_id}',[PostController::class,'picture_url']);
Route::get('/usernames/{user_id}',[UserController::class,'get_usernames']);
Route::post('follow_user',[UserController::class,'follow_user']);
Route::delete('unfollow_user/{user_id}/{follow_id}',[UserController::class,'unfollow_user']);
Route::get('/check_file/{post_id}',[PostController::class,'check_file']);
Route::post('edit_post',[PostController::class,'edit_post']);
Route::post('edit_account',[UserController::class,'edit_account']);
Route::post('change_password',[UserController::class,'change_password']);
Route::get('/get_followers/{user_id}',[UserController::class,'get_followers']);
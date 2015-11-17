<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'api'], function () {
    Route::post('auth/signin', 'AuthController@signIn');

    Route::get('user/emailexist/{email}', 'UserController@isEmailExisting');
    Route::get('user/usernameexist/{username}', 'UserController@isUsernameExisting');

    Route::resource('user', 'UserController',
        ['only' => ['store']]);

    Route::resource('news', 'NewsController');
});

Route::get('/{slug}', function () {
    return view('bootstrap.index');
})->where('slug', '([A-z\d-\/_.]+)?');;
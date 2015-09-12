<?php
namespace LegendsRising\Http\Controllers;

use Illuminate\Http\Request;
use LegendsRising\Models\User;
use LegendsRising\Http\Requests;
use Log;

class UserController extends Controller
{
    public function isEmailExisting($email)
    {
        $user = User::where('email', $email)->get();

        return $user;
    }

    public function isUsernameExisting($username)
    {
        $user = User::where('username', $username)->get();

        return $user;
    }
}
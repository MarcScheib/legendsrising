<?php
namespace LegendsRising\Http\Controllers;

use Event;
use Illuminate\Http\Request;
use LegendsRising\Events\User\UserRegistered;
use LegendsRising\Http\Requests;
use LegendsRising\Models\User;

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

    public function store(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|unique:users,username|between:3,25',
            'email' => 'required|unique:users,email|email',
            'password' => 'required|between:8,32',
            'password_repeat' => 'same:password',
        ]);

        $user = new User;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();

        Event::fire(new UserRegistered($user));

        return $user;
    }
}
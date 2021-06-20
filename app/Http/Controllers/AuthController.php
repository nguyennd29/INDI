<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
//use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    public function register(Request $request)
    {
        $data = $request->all();
        $data['role'] = 'user';
        $data['password'] = Hash::make($request->password);
        $user = User::create($data);

        return response()->json([
            'user' => $user,
            'message' => 'Đăng ký thành công',
        ], 200);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, true)) {
            $request->session()->regenerate();
            $user = Auth::user();

            return response()->json([
                'user' => $user,
                'message' => 'Đăng nhập thành công',
            ], 200);
        }

        return response()->json([
            'message' => 'Đăng nhập thất bại',
        ], 400);
    }

    public function authenticateStore(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, true)) {
            $request->session()->regenerate();
            $user = Auth::user();

            return response()->json([
                'user' => $user,
                'message' => 'Đăng nhập thành công',
            ], 200);
        }

        return response()->json([
            'message' => 'Đăng nhập thất bại',
        ], 400);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Đăng xuất thành công',
        ], 200);
    }
}


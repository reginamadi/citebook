<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class VerificationController extends Controller
{
    public function verify($user_id, Request $request) {
        if(!$request->hasValidSignature()) {
            return response()->json([ " msg" => "Invalid/Expired url provided. "], status: 401);
        }
        $user = User :: findorFail($user_id);
        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }else{
        return response()->json([
            "status" => 400,
            "message" => "Email already verified"
            ], status: 400);
        }
        return response()->json([
            "status" => 200,
            "message" => "Your email $user->email successfully verified"
            ], status: 200);
    }
}

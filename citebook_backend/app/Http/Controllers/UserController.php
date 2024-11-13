<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Http\Requests\ResetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Models\Follower;
use App\Mail\UserVerification;
use DB;
class UserController extends Controller
{
    //
    function register(Request $request){
        $validator = Validator :: make($request->all(), [
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'fname' => 'required',
            'lname' => 'required',
            'interests'=>'required'
            ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ], status: 200);
        }
            $user = User :: create([
                'fname' => $request->fname,
                'lname' => $request->lname,
                'email' => $request->email,
                'password' => Hash :: make($request->password),
                'interests'=>$request->input("interests"),
                'file_path'=>"posts_pdf/profile_pic.jpg",
                'affiliations'=>""
            ]);
            
            if($user) {
                try{
                    Mail :: mailer( name: 'smtp')->to($user->email)->send( new UserVerification($user));
                    return response()->json([
                    'status' => 200,
                    'message' => "Registered, verify your email address to login",
                    ], status: 200);
                    }catch (Exception $err) {
                    $user->delete();
                    return response()->json([
                        'status' => 500,
                        'errors' => "could not send email verification, please try again",
                        ], status: 200);
            }
        }
            return response()->json([
                'status' => 500,
                'errors' => ' Failed to create'
            ]);
    }
    function reset_pass(Request $req){
        
        $user = DB::table('users')->where('email',$req->input('email'))->first();
       $email=$req->email;
        if($user==null){
            return response([
                'message'=>"Email doesnt exist"]);
        }
        $token= Str::random(10);
         DB::table('forgotpass')->insert([
            'email'=> $req->email,
            'token'=>$token
        ]);
 
        Mail::send('mail.forgot', ['token'=>$token], function ($message) use ($email){
            $message->from(env(key:'MAIL_USERNAME'),name:'citebook');
            $message->to($email);
            $message->subject("Reset your password");
        });
    }
    function reset_pass2(ResetRequest $request){
        $token=$request->token;
        if(!$passwordResets=DB::table('forgotpass')->where('token',$token)->first()){
            return response([
                'message'=>'Invalid token!'
            ]);
        }
        if(!$user= User::where('email',$passwordResets->email)->first()){
            return response ([
                'message'=> 'User doesnt exist'
            ]);
        }
        $user->password= Hash::make($request->password);
        $user->save();
        DB::table('forgotpass')->where('token',$token)->delete();
        return $user;
        
    }
    function login(Request $req){
        $user=User::where("email",$req->email)->first();
        if(!$user || !Hash::check($req->password,$user->password)){
            return["error"=>"Email or password is not matched"];
        }
        else if($user && !$user->email_verified_at){
            return["error"=>"Email is not verified"];
        }
        return $user;
    }
   function get_info($id){
        $followers= DB::table('followers')
                    ->where('accept_user_id',$id)
                    ->count();
        $papers=DB::table('posts')
                    ->where('users_id',$id)
                    ->count();
        return [$followers,$papers];
   }
   function get_user_profile($user_id){
    return DB::table("users")
        ->select("users.*")
        ->where("users.id",$user_id)
        ->get();
   }
   
   function upload_picture(Request $req){
   $a=$req->file("file")->store("posts_pdf");
     DB::table('users')
        ->where('id',$req->input('user_id'))
        ->update(["file_path"=>$a]);
        return $a;
    }
    function get_usernames($user_id){
        $users=DB::table('users')
        ->where('id','<>',$user_id)
        ->get();
        foreach ($users as $user){ 
            $user->follow=0;
            if(DB::table('followers')
            ->where('request_user_id',$user_id)
            ->where('accept_user_id',$user->id)
            ->exists()){
                $user->follow=1;
            }
        
            }
           return $users;
    }
    function follow_user(Request $req){
      //  user_id: props.user_id,
      //  follow_id:props.user.id
     $follower= new Follower;
     $follower->request_user_id=$req->input('user_id');
     $follower->accept_user_id=$req->input('follow_id');
     $follower->save();
     return $follower;
    }
    function unfollow_user($user_id,$follow_id){
        return $follower=Follower::where('request_user_id',$user_id)
        ->where('accept_user_id',$follow_id)
        ->delete();
    }
    function edit_account(Request $req){
        $user = User::find($req->input("user_id"));
        $user->fname=$req->input("fname");
        $user->lname=$req->input("lname");
        $user->affiliations=$req->input("affiliations");
        if($req->input('affiliations')!=null){	
            $user->affiliations=$req->input("affiliations");	
        }	
        else{	
            $user->affiliations="";	
        }
        if($req->input('interests')!=null){	
            $user->interests=$req->input("interests");	
        }	
        else{	
            $user->interests="";	
        }
        return $user->save();
    }
    function change_password(Request $req){
        $user= User::find($req->input("user_id"));
      //  var_dump($req->input("old_password"));
       // var_dump(Hash::make($req->input("old_password")));
       // var_dump($user->password);
      //  var_dump(Hash::check($req->input("old_password"),$user->password));
        if(Hash::check($req->input("old_password"),$user->password)){
            $user->password=Hash::make($req->new_password);
            return $user->save();
        }
        return "wrong password";
    }
    function get_followers($user_id){
       return DB::table('followers')
        ->where("accept_user_id",$user_id)
        ->join("users","users.id","=","followers.request_user_id")
        ->select("users.*")
        ->get();
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Follower;
use App\Models\Postlikes;
use App\Models\Userviews;


use DB;
class PostController extends Controller
{
    //
    function addpost(Request $req)
    {
        $post = new Post;
        $post->users_id = $req->input('users_id');
        $post->description = $req->input('description');
        $post->keywords = $req->input('keywords');
        $post->authors = $req->input('authors');
        $post->view = $req->input('viewable');
        $post->title = $req->input('title');
        $post->google_scholar = 0;
        $post->likes = 0;
        if ($req->file("file") == null) {
            $post->file_path = "null";
        } else {
            $post->file_path = $req->file("file")->store("posts_pdf");
        }
        $post->save();
        return $post;
    }
    function edit_post(Request $req)
    {
        $post = Post::find($req->input("post_id"));
        $post->title = $req->input('title');
        $post->authors = $req->input('authors');
        $post->description = $req->input('description');
        $post->keywords = $req->input('keywords');
        $post->view = $req->input('viewable');
        if ($req->file("file") != null) {
            $post->file_path = $req->file("file")->store("posts_pdf");
        }
        return $post->save();
    }

    function feed_posts($id)
    {
        //tha tou dio to userid
        $others_posts = Post::select("posts.*", "users.fname", "users.lname")
            ->join('followers', 'followers.accept_user_id', '=', 'posts.users_id')
            ->where("request_user_id", $id)
            ->join("users", "users.id", "=", "posts.users_id")
            ->orderBy("created_at", "desc")
            ->where("view", 1);

        $all_posts = Post::select("posts.*", "users.fname", "users.lname")
            ->where("posts.users_id", $id)
            ->join("users", "users.id", "=", "posts.users_id")
            ->orderBy("created_at", "desc")
            ->union($others_posts)
            ->get();

        return $all_posts;
    }
    function get_all_posts($id)
    {
        return Post::select("posts.title", "users.file_path")
            ->where("posts.users_id", "<>", $id)
            ->where("posts.view", "=", 1)
            ->join("users", "users.id", "=", "posts.users_id")
            ->limit(100)
            ->get();
    }
    function my_posts($id)
    {
        //tha tou dio to userid
        return Post::select("posts.*", "users.fname", "users.lname")
            ->where("posts.users_id", $id)
            ->join("users", "users.id", "=", "posts.users_id")
            ->orderBy("created_at", "desc")
            ->get();
    }
    function profile_posts($id)
    {
        //tha tou dio to userid
        return Post::select("posts.*", "users.fname", "users.lname")
            ->where("posts.users_id", $id)
            ->where("posts.view", 1)
            ->join("users", "users.id", "=", "posts.users_id")
            ->orderBy("created_at", "desc")
            ->get();
    }
    function its_liked($user_id, $post_id)
    {
        if (
            DB::table('postlikes')
                ->where('users_id', $user_id)
                ->where('posts_id', $post_id)
                ->exists()
        ) {
            return 1;
        } else
            return 0;
    }

    function delete_post($post_id)
    {
        return Post::select("posts.*")
            ->where('id', $post_id)
            ->delete();
    }

    function like_post(Request $req)
    { //toggle_

        $its_liked = $this->its_liked($req->input('user_id'), $req->input('post_id'));
        if ($its_liked == "1") {
            DB::table('posts')->where('id', $req->input('post_id'))->decrement('likes');
            DB::table('postlikes')
                ->where('users_id', $req->input('user_id'))
                ->where('posts_id', $req->input('post_id'))
                ->delete();
            return true;
        } else if ($its_liked == "0") {
            DB::table('posts')->where('id', $req->input('post_id'))->increment('likes');
            $like = new Postlikes;
            $like->users_id = $req->input('user_id');
            $like->posts_id = $req->input('post_id');
            $like->save();
            return $like;
        }

    }

    function user_already_viewed($user_id, $post_id)
    {
        if (
            DB::table('userviews')
                ->where('users_id', $user_id)
                ->where('posts_id', $post_id)
                ->exists()
        ) {
            return 1;
        } else
            return 0;
    }

    function user_viewed_post(Request $req)
    {
        $user_already_viewed = $this->user_already_viewed($req->input('user_id'), $req->input('post_id'));
        var_dump($user_already_viewed);
        if ($user_already_viewed == 0) {
            $postview = new Userviews;
            $postview->users_id = $req->input('user_id');
            $postview->posts_id = $req->input('post_id');
            $postview->save();
        }
    }

    function get_file($post_id)
    { //toggle_
        $file_path = Post::select('posts.file_path')
            ->where('id', $post_id)
            ->value('file_path');

        $file = storage_path() . "\\app\\" . $file_path;

        $headers = array(
            'Content-Type: application/pdf',
        );
        return response()->download($file, "filename.pdf", $headers);
    }
    function recent_likes($user_id)
    {
        return DB::table("posts")
            ->select("posts.id", "posts.title", "users.fname", "users.lname", "users.file_path", "postlikes.created_at", "postlikes.users_id")
            ->where("posts.users_id", $user_id)
            ->join("postlikes", "postlikes.posts_id", "=", "posts.id")
            ->join("users", "users.id", "=", "postlikes.users_id")
            ->orderBy("postlikes.created_at", "desc")
            ->get();
    }
    function test(Request $req)
    {
        return $req->file("file")->store("posts_pdf");
    }
    function picture_url($user_id)
    {
        return DB::table("users")
            ->select("users.file_path")
            ->where("id", $user_id)
            ->get();
    }
    function check_file($post_id)
    {
        $file_path = Post::select('posts.file_path')
            ->where('id', $post_id)
            ->value('file_path');
        if ($file_path == "null") {
            return 0;
        } else
            return 1;
    }


    function add_post_scholar(Request $req)
    {
        if (
            Post::select("posts.title")
                ->where("posts.title", $req->title)
                ->exists()
        ) {
            return response()->json([
                'status' => 500,
                'errors' => "Post already imported",
            ], status: 500);
        }
        $post = new Post;
        $post->users_id = $req->input('user_id');
        $post->description = $req->publication;
        $post->keywords = $req->input('link');
        $post->authors = $req->input('authors');
        $post->view = 1;
        $post->title = $req->input('title');
        $post->google_scholar = 1;
        $post->likes = 0;
        //$post->file_path="";
        if ($req->file("file") == null) {
            $post->file_path = "null";
        } else {
            $post->file_path = $req->file("file")->store("posts_pdf");
        }
        $post->save();
        return $post;
    }


}




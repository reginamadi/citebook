<?php
namespace App\Services;
use Illuminate\Support\Facades\Cache;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserInteractionService
{
    protected $userInteractionsMatrix = [];

    public function __construct()
    {
        $this->userInteractionsMatrix = $this->buildUserInteractionsMatrix();
    }

    protected function buildUserInteractionsMatrix()
    {
        $matrix = Cache::get('user_interactions_matrix');

        if (!$matrix) {
            $posts = Post::all();
            $matrix = [];
            $users = User::all();

            foreach ($users as $user) {
                $matrix[$user->id] = [];
                $likes_count = DB::table('postlikes')->where('users_id', $user->id)->count('id');
                $seen_count = DB::table('userviews')->where('users_id', $user->id)->count('id');

                if ($seen_count != 0) {
                    $mean_value = $likes_count / $seen_count;

                    foreach ($posts as $post) {
                        $liked = $user->likes()->where('posts_id', $post->id)->exists();
                        $liked = $liked ? 1 : 0;
                        $matrix[$user->id][(string) $post->id] = $liked - $mean_value;
                    }
                }
            }

            Cache::put('user_interactions_matrix', $matrix, now()->addHour());
        }

        return $matrix;
    }

    public function getUserInteractions($userId)
    {
        return $this->userInteractionsMatrix[$userId] ?? [];
    }
}

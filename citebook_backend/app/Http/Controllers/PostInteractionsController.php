<?php
namespace App\Http\Controllers;
use App\Services\UserInteractionService;
use App\Models\User;
use App\Models\Post;
use DB;


class PostInteractionsController extends Controller
{
    protected $userInteractionService;

    public function __construct(UserInteractionService $userInteractionService)
    {
        $this->userInteractionService = $userInteractionService;
    }

    function calculateSimilarity($target_user_id, $other_user_id)
    {
        $targetUser = $this->userInteractionService->getUserInteractions($target_user_id);
        $otherUser = $this->userInteractionService->getUserInteractions($other_user_id);

        if (!$targetUser || !$otherUser) {
            return "User not found!";
        }

        $dotProduct = 0;
        $magnitudeA = 0;
        $magnitudeB = 0;

        foreach ($targetUser as $key => $valueA) {
            if (isset($otherUser[$key])) {
                $valueB = $otherUser[$key];

                $dotProduct += $valueA * $valueB;
                $magnitudeA += $valueA * $valueA;
                $magnitudeB += $valueB * $valueB;
            }
        }
        $magnitudeA = sqrt($magnitudeA);
        $magnitudeB = sqrt($magnitudeB);

        if ($magnitudeA * $magnitudeB == 0) {
            return 0;
        }

        return $dotProduct / ($magnitudeA * $magnitudeB);
    }

    function createSimilaritiesMatrix($target_user_id)
    {
        $userSimilarityMatrix = [];
        $users = User::all();
        foreach ($users as $user) {
            if ($user->id != $target_user_id) {
                $userSimilarityMatrix[(string) $user->id] =
                    $this->calculateSimilarity($target_user_id, $user->id);
            }
        }
        arsort($userSimilarityMatrix);
        return $userSimilarityMatrix;
    }

    function predictRating($user_id, $post_id, $userSimilarityMatrix)
    {
        $math_sum = 0;
        $math_sum1 = 0;
        $math_sum2 = 0;

        $likes_count = DB::table('postlikes')
            ->where('users_id', $user_id)
            ->count('id');

        $seen_count = DB::table('userviews')
            ->where('users_id', $user_id)
            ->count('id');

        if ($likes_count == 0)
            return 0;

        $mean_value = $likes_count / $seen_count;

        $slice_length = (int) sqrt(count($userSimilarityMatrix));

        $slicedArray = array_slice($userSimilarityMatrix, 0, $slice_length, true);

        $slicedArrayKeys = array_keys($slicedArray);
        foreach ($slicedArrayKeys as $arrKey) {
            $user_rating = $this->userInteractionService->getUserInteractions($arrKey);  //na fygei apo tin loopa

            $math_sum1 += $slicedArray[$arrKey] * $user_rating[$post_id];
            $math_sum2 += $slicedArray[$arrKey];
        }
        $math_sum = $mean_value + $math_sum1 / $math_sum2;

        return $math_sum;
    }


    function createPersonalizedFeed($user_id)
    {
        $posts = Post::whereNotIn('id', function ($query) use ($user_id) {
            $query->select('posts_id')
                ->from('postlikes')
                ->where('users_id', $user_id);
        })->get();

        $targetMatrix = $this->createTargetMatrix($user_id);
        $contentMatrices = [];

        $matrixPredict = [];

        $userSimilarityMatrix = $this->createSimilaritiesMatrix($user_id);


        foreach ($posts as $post) {
            $contentMatrix = $this->createContentBasedMatrix($post->id);
            $contentMatrices[$post->id] = $this->calculateJaccardSimilarity($targetMatrix, $contentMatrix);

            $matrixPredict[$post->id] = $this->predictRating($user_id, $post->id, $userSimilarityMatrix);

            if ($contentMatrices[$post->id] > 0) {
                $matrixPredict[$post->id] += $contentMatrices[$post->id];
            }
        }

        arsort($matrixPredict);

        $postIds = array_keys($matrixPredict);

        $posts = Post::whereIn('posts.id', $postIds)
            ->select("posts.*", "users.fname as fname", "users.lname as lname")
            ->join("users", "users.id", "=", "posts.users_id")
            ->get()
            ->keyBy('id')
            ->toArray();

        $sortedPosts = [];
        foreach ($postIds as $id) {
            $sortedPosts[] = $posts[$id];
        }
        if (count($sortedPosts) > 10) {
            $sortedPosts = array_slice($sortedPosts, 0, 10);
        }

        return $sortedPosts;
    }

    function calculateJaccardSimilarity($targetMatrix, $contentMatrix)
    {
        $targetCount = count($targetMatrix);
        $contentCount = count($contentMatrix);
        $common = 0;
        foreach ($contentMatrix as $contentTag) {
            foreach ($targetMatrix as $targetTag) {
                if (str_contains($contentTag, $targetTag) || str_contains($targetTag, $contentTag)) {
                    $common++;
                }
            }
        }
        return $common / ($targetCount + $contentCount - $common);
    }

    function createContentBasedMatrix($post_id)
    {
        $characteristics = Post::select("posts.keywords")
            ->where("posts.id", $post_id)
            ->get();
        $keywords = explode(',', $characteristics[0]->keywords);
        return $keywords;
    }

    function createTargetMatrix($user_id)
    {
        $characteristics = User::select("users.interests")
            ->where("users.id", $user_id)
            ->get();
        $interests = explode(',', $characteristics[0]->interests);
        return $interests;
    }
}
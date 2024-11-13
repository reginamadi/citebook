<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId("users_id")->constrained()->onDelete("cascade")->onUpdate("cascade");
            $table->string('description',1500);
            $table->string('keywords',200);
            $table->string('authors',100);
            $table->boolean('view');
            $table->boolean('google_scholar');
            $table->string('title');
            $table->integer('likes');
            $table->string('file_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};

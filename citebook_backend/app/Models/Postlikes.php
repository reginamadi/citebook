<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postlikes extends Model
{
    protected $table = 'postlikes';
    public $timestamps=true;
    use HasFactory;
}

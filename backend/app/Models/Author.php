<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = [
        'name',
        'image',
    ];

    public function animes()
    {
        return $this->belongsToMany(Anime::all());
    }
}

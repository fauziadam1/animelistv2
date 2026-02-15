<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index() {
        return response()->json(Comment::all());
    }

    // public function store(Request $request) {
    //     $request->validate([
    //         ''
    //     ])
    // }
}

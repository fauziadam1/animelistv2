<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AuthorController extends Controller
{
    public function index()
    {
        return response()->json(Author::all());
    }

    public function store(Request $request)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Anda bukan admin'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|unique:authors|max:255',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:10240'
        ]);

        if ($request->hasFile('image')) {
            $imagePath =  $request->file('image')->store('author', 'public');
        }

        $imagePath = null;

        $author = Author::create([
            'name' => $request->name,
            'image' => $imagePath
        ]);

        return response()->json([
            'message' => 'Author berhasil dibuat',
            'data' => $author
        ]);
    }

    public function update(Request $request, $id)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Anda bukan admin'
            ], 403);
        }

        $author = Author::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|unique:authors',
            'image' => 'sometimes|image|mimes:jpeg,jpg,png,webp|max:10240'
        ]);

        $data = $request->only([
            'name'
        ]);

        if ($request->hasFile('image')) {
            if ($author->iamge) {
                Storage::disk('public')->delete($author->image);
            }

            $data['image'] = $request->file('image')->store('author', 'public');
        };
        $author->update($data);

        return response()->json([
            'message' => 'Author berhasil diupdate',
            'data' => $author
        ]);
    }

    public function delete(Request $request, $id)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Anda bukan admin'
            ], 403);
        }

        $author = Author::findOrFail($id);

        $author->delete();

        return response()->json([
            'message' => 'Author berhasil dihapus'
        ]);
    }
}

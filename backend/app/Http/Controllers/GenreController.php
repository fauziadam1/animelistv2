<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function index()
    {
        return response()->json(Genre::all());
    }

    public function store(Request $request)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Anda bukan admin'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|unique:genres'
        ]);

        $genre = Genre::create([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Genre berhasil dibuat',
            'data' => $genre
        ]);
    }

    public function update(Request $request, $id)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Anda bukan admin'
            ], 403);
        }

        $genre = Genre::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|unique:genres'
        ]);

        $data = $request->only('name');

        $genre->update($data);

        return response()->json([
            'message' => 'Genre berhasil diupdate',
            'data' => $genre
        ]);
    }

    public function delete(Request $request, $id)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Anda bukan admin'
            ], 403);
        }

        $genre = Genre::findOrFail($id);

        $genre->delete();

        return response()->json([
            'message' => 'Genre berhasil dihapus'
        ]);
    }
}

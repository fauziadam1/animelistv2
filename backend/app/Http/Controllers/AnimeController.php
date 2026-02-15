<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnimeController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Anime::all());
    }

    public function store(Request $request)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Anda bukan admin'
            ], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'desc' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'video' => 'nullable|video|mimes:mp4,mov|max:50240',
            'genre' => 'nullable|array',
            'genre.*' => 'exists:genres,id',
            'author' => 'nullable|array',
            'author.*' => 'exists:authors,id'
        ]);

        $imagePath = null;
        $videoPath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('image', 'public');
        }

        if ($request->hasFile('video')) {
            $videoPath = $request->file('video')->store('video', 'public');
        }

        $anime = Anime::create([
            'title' => $request->title,
            'desc' => $request->desc,
            'image' => $imagePath,
            'video' => $videoPath,
            'user_id' => $request->user()->id
        ]);

        if ($request->filled('genre')) {
            $anime->genres()->attach($request->genre);
        }

        if ($request->filled('author')) {
            $anime->authors()->attach($request->author);
        }


        return response()->json([
            'message' => 'Anime berhasil dibuat',
            'data' => $anime->load(['genres', 'authors'])
        ]);
    }

    public function update(Request $request, $id)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Anda bukan admin'
            ], 403);
        }

        $anime = Anime::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'desc' => 'sometimes|required|string',
            'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'video' => 'sometimes|nullable|video|mimes:mp4,mov|max:50240',
            'genre' => 'sometimes|nullable|array',
            'genre.*' => 'exists:genres,id',
            'author' => 'sometimes|nullable|array',
            'author.*' => 'exists:authors,id'
        ]);

        $data = $request->only([
            'title',
            'desc',
        ]);

        if ($request->hasFile('image')) {
            if ($anime->image) {
                Storage::disk('public')->delete($anime->image);
            }

            $data['image'] = $request->file('image')->store('image', 'public');
        }

        if ($request->hasFile('video')) {
            if ($anime->video) {
                Storage::disk('public')->delete($anime->video);
            }

            $data['video'] = $request->file('video')->store('video', 'public');
        }

        if ($request->has('genre')) {
            $anime->genres()->sync($request->genre ?? []);
        }

        if ($request->has('author')) {
            $anime->authors()->sync($request->author ?? []);
        }

        $anime->update($data);

        return response()->json([
            'message' => 'Update anime berhasil',
            'data' => $anime->load(['genres', 'authors'])
        ]);
    }

    public function delete(Request $request, $id)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Anda bukan admin'
            ], 403);
        }

        $anime = Anime::findOrFail($id);

        $anime->delete();

        return response()->json([
            'message' => 'Anime berhasil dihapus'
        ]);
    }
}

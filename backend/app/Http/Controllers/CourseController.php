<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $data = Course::all();
        return response()->json(Course::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
        ]);
        
        $course = Course::create($request->all());

        return response()->json($course, 201);
    }
    
    public function show($id)
    {
        return response()->json(Course::findOrFail($id));
    }

    public function update(Request $request, $id)
{
    // ✅ Remove the dd($id); line
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric',
    ]);

    $course = Course::findOrFail($id);
    $course->update($request->all());

    return response()->json($course);
}

    

    public function destroy($id)
    {
        Course::findOrFail($id)->delete();
        return response()->json(['message' => 'Course deleted successfully']);
    }
}

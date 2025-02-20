<?php

namespace App\Http\Controllers;

use App\Models\TrainingSchedule;
use Illuminate\Http\Request;

class TrainingScheduleController extends Controller {
    public function index() {
        return response()->json(TrainingSchedule::with('course')->get());
    }

    public function store(Request $request) {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'trainer' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'duration' => 'required|integer|min:1',
        ]);

        $schedule = TrainingSchedule::create($request->all());
        return response()->json($schedule, 201);
    }

    public function show($id) {
        return response()->json(TrainingSchedule::with('course')->findOrFail($id));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'trainer' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'duration' => 'required|integer|min:1',
        ]);

        $schedule = TrainingSchedule::findOrFail($id);
        $schedule->update($request->all());
        return response()->json($schedule);
    }

    public function destroy($id) {
        TrainingSchedule::destroy($id);
        return response()->json(['message' => 'Training Schedule deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\TrainingSchedule;

class StudentTrainingController extends Controller
{
 
    // Admin Enrolls a Student
    public function optIn(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'training_schedule_id' => 'required|exists:training_schedules,id',
        ]);

        $student = Student::findOrFail($request->student_id);
        $student->trainings()->syncWithoutDetaching([$request->training_schedule_id]);

        return response()->json(['message' => 'Student enrolled successfully'], 200);
    }

    // Admin Removes a Student from Training
    public function optOut(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'training_schedule_id' => 'required|exists:training_schedules,id',
        ]);

        $student = Student::findOrFail($request->student_id);
        $student->trainings()->detach($request->training_schedule_id);

        return response()->json(['message' => 'Student removed successfully'], 200);
    }

    // Get Students Enrolled in a Training
    public function getStudentsByTraining($training_schedule_id)
    {
        $training = TrainingSchedule::with('students')->findOrFail($training_schedule_id);
        return response()->json($training->students);
    }

    // Get Trainings a Student is Enrolled In
    public function getTrainingsByStudent($student_id)
    {
        $student = Student::with('trainings')->findOrFail($student_id);
        return response()->json($student->trainings);
    }
}

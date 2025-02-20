<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TrainingScheduleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentTrainingController;




Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses/create', [CourseController::class, 'store']);
Route::put('/courses/update/{id}', [CourseController::class, 'update']);
Route::delete('/courses/delete/{id}', [CourseController::class, 'destroy']);


Route::get('/students', [StudentController::class, 'index']);
Route::post('/students/create', [StudentController::class, 'store']);
Route::get('/students/{id}', [StudentController::class, 'show']);
Route::put('/students/update/{id}', [StudentController::class, 'update']);
Route::delete('/students/delete/{id}', [StudentController::class, 'destroy']);

Route::get('/training-schedules', [TrainingScheduleController::class, 'index']);
Route::post('/training-schedules/create', [TrainingScheduleController::class, 'store']);
Route::get('/training-schedules/{id}', [TrainingScheduleController::class, 'show']);
Route::put('/training-schedules/update/{id}', [TrainingScheduleController::class, 'update']);
Route::delete('/training-schedules/delete/{id}', [TrainingScheduleController::class, 'destroy']);

Route::post('/students/opt-in', [StudentTrainingController::class, 'optIn']);
    Route::post('/students/opt-out', [StudentTrainingController::class, 'optOut']);
    Route::get('/trainings/{id}/students', [StudentTrainingController::class, 'getStudentsByTraining']);
    Route::get('/students/{id}/trainings', [StudentTrainingController::class, 'getTrainingsByStudent']);

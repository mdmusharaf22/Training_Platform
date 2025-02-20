<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Student;


class TrainingSchedule extends Model {
    use HasFactory;

    protected $fillable = ['course_id', 'trainer', 'date', 'time', 'duration'];

    public function course() {
        return $this->belongsTo(Course::class);
    }
    public function students()
{
    return $this->belongsToMany(Student::class, 'student_training');
}

}


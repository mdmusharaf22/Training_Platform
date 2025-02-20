<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TrainingSchedule;


class Student extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'phone'];

    public function trainings()
{
    return $this->belongsToMany(TrainingSchedule::class, 'student_training');
}


}

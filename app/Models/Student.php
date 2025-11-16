<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'phone_number',
        'created_by_instructor_id',
    ];

    /**
     * Get the instructor (user) who created this student.
     */
    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_instructor_id');
    }

    /**
     * Get all the tests assigned to this student.
     */
    public function studentTests(): HasMany
    {
        return $this->hasMany(StudentTest::class);
    }
}
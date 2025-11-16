<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentAnswer extends Model
{
    use HasFactory;

    // No UUIDs needed here, so we don't add the trait

    protected $fillable = [
        'student_test_id',
        'question_id',
        'submitted_option_index',
        'is_correct',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'is_correct' => 'boolean',
        'submitted_option_index' => 'integer',
    ];

    /**
     * Get the test attempt this answer belongs to.
     */
    public function studentTest(): BelongsTo
    {
        return $this->belongsTo(StudentTest::class);
    }

    /**
     * Get the original question.
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}
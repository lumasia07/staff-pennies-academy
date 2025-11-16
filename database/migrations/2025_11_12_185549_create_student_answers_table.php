<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_answers', function (Blueprint $table) {
            $table->id(); // A simple auto-incrementing ID is fine here
            
            // Links this answer to one specific test attempt
            $table->foreignUuid('student_test_id')->constrained('student_tests')->cascadeOnDelete();
            
            // Links this answer to the original question
            $table->foreignUuid('question_id')->constrained('questions');
            
            // The index of the answer the student chose (e.g., 0, 1, 2) - null if unanswered
            $table->unsignedTinyInteger('submitted_option_index')->nullable();
            
            // Store if it was correct for faster grading
            $table->boolean('is_correct');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_answers');
    }
};
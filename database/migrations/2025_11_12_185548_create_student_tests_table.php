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
        Schema::create('student_tests', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            // --- The main links ---
            $table->foreignUuid('quiz_id')->constrained('quizzes');
            $table->foreignUuid('student_id')->constrained('students');
            $table->foreignUuid('instructor_id')->constrained('users');
            // ---------------------

            $table->string('unique_link_token', 64)->unique();
            $table->timestamp('expires_at');
            
            $table->integer('score')->nullable(); // e.g., 85 (percent)
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_tests');
    }
};
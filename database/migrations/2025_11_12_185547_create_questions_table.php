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
        Schema::create('questions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('quiz_id')->constrained('quizzes')->cascadeOnDelete();
            
            $table->text('question_text');
            
            // Stores options like: ["Option A", "Option B", "Option C"]
            $table->json('options'); 
            
            // Stores the index of the correct answer from the 'options' array (e.g., 0, 1, 2)
            $table->unsignedTinyInteger('correct_option_index'); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
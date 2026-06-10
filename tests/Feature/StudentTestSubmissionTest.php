<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Student;
use App\Models\StudentTest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentTestSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_student_can_submit_test_and_grading_is_accurate(): void
    {
        // 1. Create a user (instructor)
        $instructor = User::factory()->create();

        // 2. Create a Student
        $student = Student::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'created_by_instructor_id' => $instructor->id,
        ]);

        // 3. Create a Quiz
        $quiz = Quiz::create([
            'title' => 'Sample Quiz',
            'description' => 'A quiz to test submission grading',
            'instructor_id' => $instructor->id,
        ]);

        // 4. Create Questions
        // Question 1: correct answer is 0 (Option A)
        $q1 = Question::create([
            'quiz_id' => $quiz->id,
            'question_text' => 'Question 1',
            'options' => ['Option A', 'Option B', 'Option C', 'Option D'],
            'correct_option_index' => 0,
        ]);

        // Question 2: correct answer is 1 (Option B)
        $q2 = Question::create([
            'quiz_id' => $quiz->id,
            'question_text' => 'Question 2',
            'options' => ['Option A', 'Option B', 'Option C', 'Option D'],
            'correct_option_index' => 1,
        ]);

        // Question 3: correct answer is 2 (Option C)
        $q3 = Question::create([
            'quiz_id' => $quiz->id,
            'question_text' => 'Question 3',
            'options' => ['Option A', 'Option B', 'Option C', 'Option D'],
            'correct_option_index' => 2,
        ]);

        // 5. Create a StudentTest
        $studentTest = StudentTest::create([
            'quiz_id' => $quiz->id,
            'student_id' => $student->id,
            'instructor_id' => $instructor->id,
            'unique_link_token' => 'test-token-123456',
            'expires_at' => now()->addHours(1),
            'started_at' => now(),
        ]);

        // 6. Submit answers
        // Student answers Q1 with 0 (correct), Q2 with 2 (incorrect), and leaves Q3 unanswered (omitted)
        $answers = [
            $q1->id => 0,
            $q2->id => 2,
            // $q3->id is not in the array
        ];

        $response = $this->post(route('student.test.submit', 'test-token-123456'), [
            'answers' => $answers,
        ]);

        // 7. Verify redirect and database changes
        $response->assertRedirect(route('student.test.show', 'test-token-123456'));

        $studentTest->refresh();

        // 3 questions total. Q1 correct (1/3 = 33%).
        // Q3 (correct index is 2) was omitted (null).
        $this->assertEquals(33, $studentTest->score);
        $this->assertNotNull($studentTest->completed_at);

        // Verify StudentAnswer records
        $ans1 = $studentTest->answers()->where('question_id', $q1->id)->first();
        $this->assertTrue((bool)$ans1->is_correct);
        $this->assertEquals(0, $ans1->submitted_option_index);

        $ans2 = $studentTest->answers()->where('question_id', $q2->id)->first();
        $this->assertFalse((bool)$ans2->is_correct);
        $this->assertEquals(2, $ans2->submitted_option_index);

        $ans3 = $studentTest->answers()->where('question_id', $q3->id)->first();
        $this->assertFalse((bool)$ans3->is_correct);
        $this->assertNull($ans3->submitted_option_index);
    }

    public function test_unanswered_questions_with_correct_index_zero_are_graded_incorrectly(): void
    {
        $instructor = User::factory()->create();

        $student = Student::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'created_by_instructor_id' => $instructor->id,
        ]);

        $quiz = Quiz::create([
            'title' => 'Sample Quiz 2',
            'description' => 'A quiz to test unanswered questions with correct index 0',
            'instructor_id' => $instructor->id,
        ]);

        // Question 1: correct answer is 0 (Option A)
        $q1 = Question::create([
            'quiz_id' => $quiz->id,
            'question_text' => 'Question 1',
            'options' => ['Option A', 'Option B', 'Option C', 'Option D'],
            'correct_option_index' => 0,
        ]);

        $studentTest = StudentTest::create([
            'quiz_id' => $quiz->id,
            'student_id' => $student->id,
            'instructor_id' => $instructor->id,
            'unique_link_token' => 'test-token-789',
            'expires_at' => now()->addHours(1),
            'started_at' => now(),
        ]);

        // Student leaves Q1 unanswered (empty answers array)
        $answers = [];

        $response = $this->post(route('student.test.submit', 'test-token-789'), [
            'answers' => $answers,
        ]);

        $studentTest->refresh();

        // The score should be 0 because they didn't answer anything, even though correct answer is 0.
        // Under the loose comparison bug, this would be marked as correct (score 100).
        $this->assertEquals(0, $studentTest->score);

        $ans1 = $studentTest->answers()->where('question_id', $q1->id)->first();
        $this->assertFalse((bool)$ans1->is_correct);
        $this->assertNull($ans1->submitted_option_index);
    }
}

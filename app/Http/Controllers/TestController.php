<?php

namespace App\Http\Controllers;

use App\Models\StudentTest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TestController extends Controller
{
    /**
     * Show the test page for the student.
     */
    public function show(string $token): InertiaResponse|Response
    {
        $studentTest = StudentTest::where('unique_link_token', $token)
            ->with(['student', 'quiz.questions'])
            ->first();

        if (!$studentTest) {
            return response()->view('errors.test-not-found', [], 404);
        }

        if ($studentTest->expires_at->isPast()) {
            return response()->view('errors.test-expired', [
                'expires_at' => $studentTest->expires_at,
            ], 410);
        }

        if ($studentTest->completed_at) {
            // Show results
            return Inertia::render('Test/Results', [
                'studentTest' => $studentTest,
                'score' => $studentTest->score,
                'totalQuestions' => $studentTest->quiz->questions->count(),
            ]);
        }

        if (!$studentTest->started_at) {
            // Show welcome page
            return Inertia::render('Test/Welcome', [
                'studentTest' => $studentTest,
                'quiz' => $studentTest->quiz,
                'totalQuestions' => $studentTest->quiz->questions->count(),
            ]);
        }

        // Show the test
        return Inertia::render('Test/Show', [
            'studentTest' => $studentTest,
            'quiz' => $studentTest->quiz,
            'questions' => $studentTest->quiz->questions,
        ]);
    }

    /**
     * Start the test.
     */
    public function start(string $token)
    {
        $studentTest = StudentTest::where('unique_link_token', $token)->firstOrFail();

        if ($studentTest->started_at || $studentTest->completed_at) {
            return redirect()->route('student.test.show', $token);
        }

        // Set started_at but keep the original expires_at (1 hour from assignment)
        $studentTest->update([
            'started_at' => now(),
        ]);

        return redirect()->route('student.test.show', $token);
    }

    /**
     * Submit the test answers.
     */
    public function submit(Request $request, string $token)
    {
        $studentTest = StudentTest::where('unique_link_token', $token)
            ->with(['quiz.questions'])
            ->firstOrFail();

        if ($studentTest->completed_at) {
            return redirect()->route('student.test.show', $token);
        }

        $answers = $request->input('answers', []);

        $score = 0;
        $totalQuestions = $studentTest->quiz->questions->count();

        foreach ($studentTest->quiz->questions as $question) {
            $studentAnswer = $answers[$question->id] ?? null;
            $isCorrect = $studentAnswer == $question->correct_option_index;

            if ($isCorrect) {
                $score++;
            }

            // Save answer
            $studentTest->answers()->create([
                'question_id' => $question->id,
                'submitted_option_index' => $studentAnswer,
                'is_correct' => $isCorrect,
            ]);
        }

        // Update test with score
        $studentTest->update([
            'score' => $score,
            'completed_at' => now(),
        ]);

        return redirect()->route('student.test.show', $token);
    }
}
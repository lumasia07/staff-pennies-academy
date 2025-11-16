<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    /**
     * Display a listing of the quizzes.
     */
    public function index(): Response
    {
    $quizzes = \App\Models\Quiz::withCount('questions')->get();

        return Inertia::render('Quizzes/Index', [
            'quizzes' => $quizzes,
        ]);
    }

    /**
     * Show the form for creating a new quiz.
     */
    public function create(): Response
    {
        return Inertia::render('Quizzes/Create');
    }

    /**
     * Store a newly created quiz in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $quiz = Quiz::create([
            'title' => $request->title,
            'description' => $request->description,
            'instructor_id' => Auth::id(),
        ]);

        return redirect()->route('quizzes.show', $quiz->id);
    }

    /**
     * Display the specified quiz.
     */
    public function show(Quiz $quiz): Response
    {
        // Allow instructors to view quizzes they own or are assigned to
        $user = Auth::user();
        $isOwner = $quiz->instructor_id === $user->id;
        $isAssigned = method_exists($user, 'quizzes') && $user->quizzes()->where('id', $quiz->id)->exists();
        if (!($isOwner || $isAssigned)) {
            abort(403);
        }

        return Inertia::render('Quizzes/Show', [
            'quiz' => $quiz->load('questions'),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    /**
     * Store questions for the quiz.
     */
    public function storeQuestions(Request $request, Quiz $quiz)
    {
        // Ensure the quiz belongs to the authenticated user
        if ($quiz->instructor_id !== Auth::id()) {
            abort(403);
        }

        // Accept either top-level 'questions' or Inertia nested payload 'data.questions'
        $payloadQuestions = $request->input('questions');
        if (is_null($payloadQuestions)) {
            $data = $request->input('data', []);
            $payloadQuestions = $data['questions'] ?? [];
        }

        // Validate the extracted questions array
        $validator = \Illuminate\Support\Facades\Validator::make([
            'questions' => $payloadQuestions,
        ], [
            'questions' => 'required|array|min:1',
            'questions.*.question_text' => 'required|string',
            'questions.*.options' => 'required|array|min:2',
            'questions.*.options.*' => 'required|string',
            'questions.*.correct_option_index' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $questions = $validator->validated()['questions'];

        foreach ($questions as $questionData) {
            // ensure options are stored as array (casts will handle JSON)
            $quiz->questions()->create([
                'question_text' => $questionData['question_text'],
                'options' => $questionData['options'],
                'correct_option_index' => $questionData['correct_option_index'],
            ]);
        }

        return redirect()->route('quizzes.show', $quiz->id)->with('success', 'Questions added successfully.');
    }

    /**
     * Delete a question from the quiz.
     */
    public function destroyQuestion(Quiz $quiz, Question $question)
    {
        if ($quiz->instructor_id !== Auth::id() || $question->quiz_id !== $quiz->id) {
            abort(403);
        }

        $question->delete();

        return redirect()->route('quizzes.show', $quiz->id)->with('success', 'Question deleted successfully.');
    }

    /**
     * Update a question in the quiz.
     */
    public function updateQuestion(Request $request, Quiz $quiz, Question $question)
    {
        if ($quiz->instructor_id !== Auth::id() || $question->quiz_id !== $quiz->id) {
            abort(403);
        }

        $request->validate([
            'question_text' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string',
            'correct_option_index' => 'required|integer|min:0',
        ]);

        $question->update($request->only(['question_text', 'options', 'correct_option_index']));

        return redirect()->route('quizzes.show', $quiz->id)->with('success', 'Question updated successfully.');
    }
}
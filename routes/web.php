<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentTestController;
use App\Http\Controllers\TestController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;
use App\Models\StudentTest;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $instructorId = Auth::id();

    // 1. Stat Cards
    $totalStudents = Student::where('created_by_instructor_id', $instructorId)->count();
    
    $pendingTests = StudentTest::where('instructor_id', $instructorId)
        ->whereNull('completed_at')
        ->where('expires_at', '>', now())
        ->count();

    $completedTests = StudentTest::where('instructor_id', $instructorId)
        ->whereNotNull('completed_at');
    
    $totalCompleted = $completedTests->count();
    $totalPassed = $completedTests->where('score', '>=', 70)->count();
    $passRate = $totalCompleted > 0 ? round(($totalPassed / $totalCompleted) * 100) : 0;

    // 2. Recent Activity
    $recentActivity = StudentTest::where('instructor_id', $instructorId)
        ->whereNotNull('completed_at')
        ->with('student', 'quiz') // Load relationships
        ->latest('completed_at') // Get newest first
        ->limit(5)
        ->get();

    return Inertia::render('Dashboard', [
        'stats' => [
            'totalStudents' => $totalStudents,
            'pendingTests' => $pendingTests,
            'passRate' => $passRate,
        ],
        'recentActivity' => $recentActivity,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/students', [StudentController::class, 'index'])->name('students.index');
Route::post('/students', [StudentController::class, 'store'])->name('students.store');
Route::post('/student-tests', [StudentTestController::class, 'store'])->name('student-tests.store');

Route::get('/test/{token}', [TestController::class, 'show'])->name('student.test.show');
Route::post('/test/{token}/start', [TestController::class, 'start'])->name('student.test.start');
Route::post('/test/{token}/submit', [TestController::class, 'submit'])->name('student.test.submit');


Route::middleware('auth')->group(function () {
    Route::get('/quizzes', [QuizController::class, 'index'])->name('quizzes.index');
    Route::get('/quizzes/create', [QuizController::class, 'create'])->name('quizzes.create');
    Route::post('/quizzes', [QuizController::class, 'store'])->name('quizzes.store');
    Route::get('/quizzes/{quiz}', [QuizController::class, 'show'])->name('quizzes.show');
    Route::post('/quizzes/{quiz}/questions', [QuizController::class, 'storeQuestions'])->name('quizzes.questions.store');
    Route::patch('/quizzes/{quiz}/questions/{question}', [QuizController::class, 'updateQuestion'])->name('quizzes.questions.update');
    Route::delete('/quizzes/{quiz}/questions/{question}', [QuizController::class, 'destroyQuestion'])->name('quizzes.questions.destroy');

    Route::get('/results', [StudentTestController::class, 'index'])->name('results.index');
    Route::get('/results/{studentTest}/pdf', [StudentTestController::class, 'downloadPdf'])->name('results.pdf');
    Route::post('/results/{studentTest}/email', [StudentTestController::class, 'sendResultEmail'])->name('results.email');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

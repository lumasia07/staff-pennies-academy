<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Student;
use App\Models\StudentTest;
use App\Mail\StudentTestMail;
use App\Mail\StudentResultMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class StudentTestController extends Controller
{
    /**
     * Display a list of all test results for the logged-in instructor.
     */
    public function index(): Response
    {
        $instructorId = Auth::id();

        // Load all test assignments
        $results = StudentTest::where('instructor_id', $instructorId)
            ->with('student', 'quiz') // Eager load relationships
            ->orderBy('created_at', 'desc') // Show newest first
            ->get();

        return Inertia::render('Results/Index', [
            'results' => $results,
        ]);
    }

    /**
     * Store a new student test assignment and email the link.
     */
    public function store(Request $request)
    {
        // 1. Validate the form data
        $validatedData = $request->validate([
            'student_id' => 'nullable|uuid|exists:students,id',
            'quiz_id' => 'required|uuid|exists:quizzes,id',
            'expires_in' => 'nullable|numeric|min:0.5', // Accept decimal values (0.5 for 30 minutes)
            'mass_emails' => 'nullable|string',
        ]);

        $quiz = Quiz::findOrFail($validatedData['quiz_id']);
        $instructor = Auth::user();
        $expiresIn = $validatedData['expires_in'] ?? 1;
        $expiresAt = Carbon::now()->addHours((float) $expiresIn);

        $assigned = [];
        // Mass assignment if emails provided
        if (!empty($validatedData['mass_emails'])) {
            $emails = preg_split('/[\s,]+/', $validatedData['mass_emails']);
            foreach ($emails as $email) {
                $email = trim($email);
                if (!$email) continue;
                $student = Student::where('email', $email)->first();
                if ($student) {
                    $token = Str::random(64);
                    $studentTest = StudentTest::create([
                        'student_id' => $student->id,
                        'quiz_id' => $quiz->id,
                        'instructor_id' => $instructor->id,
                        'unique_link_token' => $token,
                        'expires_at' => $expiresAt,
                    ]);
                    $testUrl = route('student.test.show', ['token' => $token]);
                    Mail::to($student->email)->send(new StudentTestMail(
                        $student->first_name,
                        $quiz->title,
                        $testUrl,
                        $expiresAt
                    ));
                    $assigned[] = $student->first_name;
                }
            }
        }
        // Single assignment if student_id provided
        if (!empty($validatedData['student_id'])) {
            $student = Student::findOrFail($validatedData['student_id']);
            $token = Str::random(64);
            $studentTest = StudentTest::create([
                'student_id' => $student->id,
                'quiz_id' => $quiz->id,
                'instructor_id' => $instructor->id,
                'unique_link_token' => $token,
                'expires_at' => $expiresAt,
            ]);
            $testUrl = route('student.test.show', ['token' => $token]);
            Mail::to($student->email)->send(new StudentTestMail(
                $student->first_name,
                $quiz->title,
                $testUrl,
                $expiresAt
            ));
            $assigned[] = $student->first_name;
        }

        $msg = count($assigned) > 1
            ? "Test assigned to: " . implode(', ', $assigned)
            : (count($assigned) === 1 ? "Test assigned to {$assigned[0]}." : "No students found for assignment.");
        return Redirect::route('students.index')->with('success', $msg);
    }

    /**
     * Generate and download a PDF score sheet for a completed test.
     */
    public function downloadPdf(StudentTest $studentTest)
    {
        // 1. Load ALL data needed for the report
        $studentTest->load('student', 'quiz', 'answers.question');

        // 3. Count correct/incorrect
        $correct = $studentTest->answers->where('is_correct', true)->count();
        $total = $studentTest->quiz->questions->count();
        $incorrect = $total - $correct;

        // 4. Load the data into the PDF Blade view
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.test-result', [
            'test' => $studentTest,
            'correct' => $correct,
            'incorrect' => $incorrect,
            'total' => $total,
        ]);

        // 5. Create a file name and send the download
        $fileName = "Test-Result-{$studentTest->student->last_name}-{$studentTest->quiz->title}.pdf";
        return $pdf->download($fileName);
    }

    /**
     * Send an email to the student with their test results.
     */
    public function sendResultEmail(StudentTest $studentTest)
    {
        try {
            // 1. Authorization: Ensure the logged-in user owns this test
            if ($studentTest->instructor_id !== Auth::id()) {
                abort(403);
            }

            // 2. Ensure the test is completed
            if (!$studentTest->completed_at) {
                return Redirect::back()->with('error', 'Cannot send email for incomplete test.');
            }

            // 3. Load necessary data
            $studentTest->load('student', 'quiz', 'answers.question');

            // 4. Count correct/incorrect
            $correct = $studentTest->answers->where('is_correct', true)->count();
            $total = $studentTest->quiz->questions->count();
            $incorrect = $total - $correct;

            // 5. Generate the PDF
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.test-result', [
                'test' => $studentTest,
                'correct' => $correct,
                'incorrect' => $incorrect,
                'total' => $total,
            ]);

            // 6. Send the result email with PDF as attachment
            \Log::info('Attempting to send result email', [
                'student_email' => $studentTest->student->email,
                'student_name' => $studentTest->student->first_name,
                'quiz_title' => $studentTest->quiz->title,
            ]);
            
            Mail::to($studentTest->student->email)->send(new StudentResultMail(
                $studentTest->student->first_name,
                $studentTest->quiz->title,
                $studentTest->score,
                $correct,
                $total,
                $studentTest->completed_at,
                route('results.pdf', $studentTest) // Link to download PDF
            ));
            
            \Log::info('Result email sent successfully to: ' . $studentTest->student->email);

            // 7. Redirect back with success message
            return Redirect::back()->with('success', "Result email sent to {$studentTest->student->first_name}.");
        } catch (\Exception $e) {
            \Log::error('Failed to send result email: ' . $e->getMessage(), [
                'student_test_id' => $studentTest->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return Redirect::back()->with('error', 'Failed to send email: ' . $e->getMessage());
        }
    }
}
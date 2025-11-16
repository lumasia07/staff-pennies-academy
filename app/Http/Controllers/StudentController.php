<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    /**
     * Display the student's index page.
     */
    public function index(): Response
    {
        $students = Student::where('created_by_instructor_id', Auth::id())->get();
        $quizzes = Quiz::all();

        return Inertia::render('Students/Index', [
            'students' => $students,
            'quizzes' => $quizzes,
        ]);
    }

    /**
     * Store a new student.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'phone_number' => 'nullable|string|max:20',
        ]);

        Student::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'created_by_instructor_id' => Auth::id(),
        ]);

        return redirect()->route('students.index')->with('success', 'Student added successfully.');
    }
}
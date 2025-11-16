import { useState, useEffect, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ studentTest, quiz, questions }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const [isAutoSubmit, setIsAutoSubmit] = useState(false);
    const hasSubmitted = useRef(false);

    const { post, processing } = useForm();

    const currentQuestion = questions[currentQuestionIndex];
    const STORAGE_KEY = `quiz_${studentTest.unique_link_token}`;
    const TOTAL_TIME = 30 * 60; // 30 minutes in seconds

    // Initialize timer and answers from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        
        if (stored) {
            try {
                const { endTime, answers: storedAnswers } = JSON.parse(stored);
                const now = Math.floor(Date.now() / 1000);
                const remaining = endTime - now;
                
                if (remaining > 0) {
                    setTimeLeft(remaining);
                    setAnswers(storedAnswers || {});
                } else {
                    // Time already expired
                    setTimeLeft(0);
                    setAnswers(storedAnswers || {});
                }
            } catch (e) {
                // If parsing fails, start fresh
                initializeQuiz();
            }
        } else {
            initializeQuiz();
        }
    }, []);

    const initializeQuiz = () => {
        const now = Math.floor(Date.now() / 1000);
        const endTime = now + TOTAL_TIME;
        
        const data = {
            endTime,
            answers: {}
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setTimeLeft(TOTAL_TIME);
    };

    // Timer effect
    useEffect(() => {
        if (timeLeft === null) return;

        if (timeLeft <= 0) {
            if (!hasSubmitted.current) {
                hasSubmitted.current = true;
                setIsAutoSubmit(true);
                submitTest(true);
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                const newTime = prev - 1;
                
                // Update localStorage with current time
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    try {
                        const data = JSON.parse(stored);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify({
                            ...data,
                            answers
                        }));
                    } catch (e) {
                        console.error('Error updating localStorage:', e);
                    }
                }
                
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, answers]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (answerIndex) => {
        const newAnswers = {
            ...answers,
            [currentQuestion.id]: answerIndex
        };
        
        setAnswers(newAnswers);

        // Update localStorage immediately
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    ...data,
                    answers: newAnswers
                }));
            } catch (e) {
                console.error('Error saving answer:', e);
            }
        }
    };

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const submitTest = (isAuto = false) => {
        if (hasSubmitted.current && !isAuto) return;
        
        hasSubmitted.current = true;
        
        post(route('student.test.submit', studentTest.unique_link_token), {
            data: { 
                answers,
                auto_submitted: isAuto 
            },
            onSuccess: () => {
                // Clear localStorage on successful submission
                localStorage.removeItem(STORAGE_KEY);
            },
            onError: () => {
                // Reset if submission fails (unless auto-submit)
                if (!isAuto) {
                    hasSubmitted.current = false;
                }
            }
        });
    };

    const answeredQuestions = Object.keys(answers).length;
    const progress = Math.round((answeredQuestions / questions.length) * 100);
    const allQuestionsAnswered = answeredQuestions === questions.length;

    // Show loading state while initializing
    if (timeLeft === null) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">Loading quiz...</div>
            </div>
        );
    }

    return (
        <>
            <Head title={`${quiz.title} - Test`} />

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Warning banner when time is running out */}
                    {timeLeft < 300 && timeLeft > 0 && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                            <p className="text-red-700 font-semibold">
                                ⚠️ Warning: Less than 5 minutes remaining!
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Question Area */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow rounded-lg p-6">
                                {/* Question Header */}
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        Question {currentQuestionIndex + 1} of {questions.length}
                                    </h2>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-dtn-blue h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Question Text */}
                                <div className="mb-6">
                                    <p className="text-lg text-gray-900 leading-relaxed">
                                        {currentQuestion.question_text}
                                    </p>
                                </div>

                                {/* Question Image */}
                                {currentQuestion.image_url && (
                                    <div className="mb-6">
                                        <img
                                            src={currentQuestion.image_url}
                                            alt="Question illustration"
                                            className="max-w-full h-auto rounded-lg shadow"
                                        />
                                    </div>
                                )}

                                {/* Answer Buttons */}
                                <div className="space-y-3 mb-8">
                                    {currentQuestion.options.map((option, index) => {
                                        const letters = ['A', 'B', 'C', 'D'];
                                        const isSelected = answers[currentQuestion.id] === index;

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(index)}
                                                className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center ${
                                                    isSelected
                                                        ? 'border-dtn-blue bg-dtn-blue text-white'
                                                        : 'border-gray-300 hover:border-gray-400 bg-white'
                                                }`}
                                            >
                                                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-4 font-bold text-sm ${
                                                    isSelected ? 'bg-white text-dtn-blue' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {letters[index]}
                                                </span>
                                                <span className="flex-1">{option}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-between">
                                    <button
                                        onClick={prevQuestion}
                                        disabled={currentQuestionIndex === 0}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous Question
                                    </button>

                                    {currentQuestionIndex < questions.length - 1 ? (
                                        <button
                                            onClick={nextQuestion}
                                            className="px-4 py-2 bg-dtn-blue text-white rounded hover:bg-dtn-lightblue"
                                        >
                                            Next Question
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => goToQuestion(0)}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Review Test
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 space-y-6">
                                {/* Timer */}
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Remaining</h3>
                                    <div className="text-center">
                                        <div className={`text-3xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
                                            {formatTime(timeLeft)}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">30:00 total</p>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
                                    <div className="text-center mb-4">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {answeredQuestions} / {questions.length}
                                        </div>
                                        <p className="text-sm text-gray-600">Questions Answered</p>
                                    </div>
                                    {!allQuestionsAnswered && (
                                        <p className="text-xs text-orange-600 text-center">
                                            Answer all questions to submit
                                        </p>
                                    )}
                                </div>

                                {/* Question Grid */}
                                <div className="bg-white shadow rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions</h3>
                                    <div className="grid grid-cols-5 gap-2">
                                        {questions.map((_, index) => {
                                            const isCurrent = index === currentQuestionIndex;
                                            const isAnswered = answers[questions[index].id] !== undefined;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => goToQuestion(index)}
                                                    className={`w-10 h-10 rounded font-semibold text-sm transition-all ${
                                                        isCurrent
                                                            ? 'bg-dtn-blue text-white'
                                                            : isAnswered
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="bg-white shadow rounded-lg p-6">
                                    <button
                                        onClick={() => submitTest(false)}
                                        disabled={processing || !allQuestionsAnswered}
                                        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {processing ? 'Submitting...' : 'Finish & Submit Test'}
                                    </button>
                                    {!allQuestionsAnswered && (
                                        <p className="text-xs text-gray-500 text-center mt-2">
                                            Complete all {questions.length} questions to submit
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
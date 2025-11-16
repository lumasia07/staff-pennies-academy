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

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Fixed Header with Timer */}
                <div className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-2">
                            {/* Logo and Quiz Title */}
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <img 
                                    src="/images/texas-logo.png" 
                                    alt="Texas DTN" 
                                    className="h-8 sm:h-10 w-auto"
                                />
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                                        {quiz.title}
                                    </h1>
                                    <p className="text-xs text-gray-600">
                                        Question {currentQuestionIndex + 1} of {questions.length}
                                    </p>
                                </div>
                            </div>

                            {/* Timer - Always Visible */}
                            <div className={`flex items-center space-x-2 px-2 sm:px-3 py-1.5 rounded-lg ${
                                timeLeft < 300 ? 'bg-red-100 border-2 border-red-400' : 'bg-blue-50 border-2 border-blue-200'
                            }`}>
                                <svg className={`w-4 h-4 ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className={`text-base sm:text-lg font-mono font-bold ${timeLeft < 300 ? 'text-red-700' : 'text-blue-700'}`}>
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="pb-1.5">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className="text-xs font-medium text-gray-600">
                                    {answeredQuestions} of {questions.length} answered
                                </span>
                                <span className="text-xs font-medium text-gray-600">
                                    {progress}% complete
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className="h-1.5 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%`, background: '#00888A' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Warning banner when time is running out */}
                {timeLeft < 300 && timeLeft > 0 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-3 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="text-red-800 font-semibold text-sm">
                                    Less than 5 minutes remaining! Please review and submit your answers.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                        {/* Main Question Area */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                                {/* Question Header */}
                                <div className="px-4 sm:px-6 py-2 border-b border-gray-200" style={{ background: 'linear-gradient(to right, rgba(0, 136, 138, 0.1), rgba(0, 136, 138, 0.05))' }}>
                                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                                        Question {currentQuestionIndex + 1}
                                    </h2>
                                </div>

                                <div className="p-3 sm:p-4">
                                    {/* Question Text */}
                                    <div className="mb-3">
                                        <p className="text-sm sm:text-base text-gray-900 leading-relaxed font-medium">
                                            {currentQuestion.question_text}
                                        </p>
                                    </div>

                                    {/* Question Image */}
                                    {currentQuestion.image_url && (
                                        <div className="mb-3">
                                            <img
                                                src={currentQuestion.image_url}
                                                alt="Question illustration"
                                                className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
                                                style={{ maxHeight: '200px', objectFit: 'contain' }}
                                            />
                                        </div>
                                    )}

                                    {/* Answer Buttons */}
                                    <div className="space-y-2 mb-4">
                                        {currentQuestion.options.map((option, index) => {
                                            const letters = ['A', 'B', 'C', 'D'];
                                            const isSelected = answers[currentQuestion.id] === index;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswer(index)}
                                                    className={`group w-full text-left p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 flex items-center ${
                                                        isSelected
                                                            ? 'shadow-md'
                                                            : 'border-gray-200 bg-white hover:bg-gray-50 shadow-sm'
                                                    }`}
                                                    style={isSelected ? { borderColor: '#00888A', background: 'linear-gradient(to right, rgba(0, 136, 138, 0.1), rgba(0, 136, 138, 0.05))' } : {}}
                                                >
                                                    <span className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full mr-2 font-bold text-xs sm:text-sm transition-all ${
                                                        isSelected 
                                                            ? 'text-white shadow-md' 
                                                            : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                    style={isSelected ? { background: '#00888A' } : {}}
                                                    >
                                                        {letters[index]}
                                                    </span>
                                                    <span className={`flex-1 text-sm sm:text-base ${
                                                        isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'
                                                    }`}>
                                                        {option}
                                                    </span>
                                                    {isSelected && (
                                                        <svg className="flex-shrink-0 w-5 h-5 ml-2" style={{ color: '#00888A' }} fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                                        <button
                                            onClick={prevQuestion}
                                            disabled={currentQuestionIndex === 0}
                                            className="flex items-center justify-center px-3 sm:px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm"
                                        >
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Previous
                                        </button>

                                        {currentQuestionIndex < questions.length - 1 ? (
                                            <button
                                                onClick={nextQuestion}
                                                className="flex items-center justify-center px-3 sm:px-4 py-2 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                                                style={{ background: '#00888A' }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#006d6f'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = '#00888A'}
                                            >
                                                Next Question
                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => goToQuestion(0)}
                                                className="flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                Review Answers
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="space-y-2">
                                {/* Question Grid */}
                                <div className="bg-white shadow-lg rounded-xl p-3 border border-gray-200">
                                    <h3 className="text-sm font-bold text-gray-900 mb-2">Question Navigator</h3>
                                    <div className="grid grid-cols-5 gap-1.5 mb-2">
                                        {questions.map((_, index) => {
                                            const isCurrent = index === currentQuestionIndex;
                                            const isAnswered = answers[questions[index].id] !== undefined;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => goToQuestion(index)}
                                                    className={`aspect-square rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 ${
                                                        isCurrent
                                                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md ring-2 ring-blue-300'
                                                            : isAnswered
                                                            ? 'text-white shadow-sm'
                                                            : 'bg-white border-2 border-gray-300 text-gray-700'
                                                    }`}
                                                    style={isAnswered && !isCurrent ? { background: '#00888A' } : {}}
                                                >
                                                    {index + 1}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 rounded mr-1.5" style={{ background: '#00888A' }}></div>
                                            <span>Answered</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded mr-1.5"></div>
                                            <span>Current</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="bg-white shadow-lg rounded-xl p-3 border border-gray-200">
                                    <button
                                        onClick={() => submitTest(false)}
                                        disabled={processing || !allQuestionsAnswered}
                                        className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
                                            !allQuestionsAnswered || processing
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 shadow-md hover:shadow-lg'
                                        }`}
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : (
                                            'Finish & Submit Test'
                                        )}
                                    </button>
                                    {!allQuestionsAnswered && (
                                        <div className="mt-2 flex items-start bg-amber-50 rounded-lg p-2 border border-amber-200">
                                            <svg className="w-4 h-4 text-amber-600 mr-1.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-xs text-amber-800 font-medium">
                                                Answer all {questions.length} questions to submit
                                            </p>
                                        </div>
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
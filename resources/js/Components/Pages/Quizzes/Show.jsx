import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Show({ quiz }) {
    const [questions, setQuestions] = useState([
        { question_text: '', options: ['', '', '', ''], correct_option_index: 0 }
    ]);

    const { post, processing, errors } = useForm();

    const addQuestion = () => {
        setQuestions([...questions, { question_text: '', options: ['', '', '', ''], correct_option_index: 0 }]);
    };

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'options') {
            newQuestions[index].options = value;
        } else {
            newQuestions[index][field] = value;
        }
        setQuestions(newQuestions);
    };

    const updateOption = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('quizzes.questions.store', quiz.id), {
            data: { questions },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link
                            href={route('quizzes.index')}
                            className="text-pennies-purple hover:text-pennies-purple/80 mr-4"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            {quiz.title}
                        </h2>
                    </div>
                    <Link
                        href={route('quizzes.index')}
                        className="text-pennies-purple hover:text-pennies-purple/80"
                    >
                        Back to Quizzes
                    </Link>
                </div>
            }
        >
            <Head title={quiz.title} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 space-y-6">
                    {/* Quiz Details */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Exam Details</h3>
                            <p className="text-gray-600">{quiz.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                {quiz.questions.length} questions
                            </p>
                        </div>
                    </div>

                    {/* Existing Questions */}
                    {quiz.questions.length > 0 && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions</h3>
                                <div className="space-y-4">
                                    {quiz.questions.map((question, index) => (
                                        <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900">
                                                {index + 1}. {question.question_text}
                                            </h4>
                                            <ul className="mt-2 space-y-1">
                                                {question.options.map((option, oIndex) => (
                                                    <li key={oIndex} className={`text-sm ${oIndex === question.correct_option_index ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                                                        {String.fromCharCode(65 + oIndex)}. {option}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add Questions Form */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Questions</h3>
                            <form onSubmit={submit} className="space-y-6">
                                {questions.map((question, qIndex) => (
                                    <div key={qIndex} className="border border-gray-200 rounded-lg p-4 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium text-gray-900">Question {qIndex + 1}</h4>
                                            {questions.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeQuestion(qIndex)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>

                                        <div>
                                            <InputLabel htmlFor={`question_${qIndex}`} value="Question Text" />
                                            <TextInput
                                                id={`question_${qIndex}`}
                                                type="text"
                                                value={question.question_text}
                                                className="mt-1 block w-full"
                                                onChange={(e) => updateQuestion(qIndex, 'question_text', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <InputLabel value="Options" />
                                            {question.options.map((option, oIndex) => (
                                                <div key={oIndex} className="mt-2">
                                                    <TextInput
                                                        type="text"
                                                        placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                                                        value={option}
                                                        className="block w-full"
                                                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <InputLabel htmlFor={`correct_${qIndex}`} value="Correct Answer" />
                                            <select
                                                id={`correct_${qIndex}`}
                                                value={question.correct_option_index}
                                                onChange={(e) => updateQuestion(qIndex, 'correct_option_index', parseInt(e.target.value))}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                required
                                            >
                                                {question.options.map((_, oIndex) => (
                                                    <option key={oIndex} value={oIndex}>
                                                        {String.fromCharCode(65 + oIndex)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={addQuestion}
                                        className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Another Question
                                    </button>

                                    <PrimaryButton disabled={processing}>
                                        Save Questions
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
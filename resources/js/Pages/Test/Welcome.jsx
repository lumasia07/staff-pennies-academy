import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Welcome({ studentTest, quiz, totalQuestions }) {
    const { post, processing } = useForm();

    const startTest = () => {
        post(route('student.test.start', studentTest.unique_link_token));
    };

    return (
        <>
            <Head title={`${quiz.title} - Welcome`} />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Hello, {studentTest.student.first_name}!
                        </h1>

                        <p className="text-lg text-gray-700 mb-6">
                            You are about to begin the: <strong>{quiz.title}</strong>
                        </p>

                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Instructions</h2>

                            <div className="space-y-3 text-left">
                                <div className="flex justify-between">
                                    <span className="font-medium">Number of Questions:</span>
                                    <span>{totalQuestions}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Time Limit:</span>
                                    <span>30 Minutes</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Passing Score:</span>
                                    <span>80% ({Math.ceil(totalQuestions * 0.8)}/{totalQuestions})</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-yellow-800 mb-2">Important Rules:</h3>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• The timer will begin the moment you click 'Start Test'.</li>
                                <li>• Do not close this window or use the browser's 'Back' button.</li>
                                <li>• You can navigate between questions using the question grid.</li>
                                <li>• Your answers are saved automatically when you select them.</li>
                            </ul>
                        </div>

                        <PrimaryButton
                            onClick={startTest}
                            disabled={processing}
                            className="text-lg px-8 py-3"
                        >
                            {processing ? 'Starting Test...' : 'Start Test'}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
}

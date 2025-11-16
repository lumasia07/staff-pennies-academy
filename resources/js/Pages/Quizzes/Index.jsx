import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function Index({ quizzes }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Quizzes
                    </h2>
                    <Link
                        href={route('quizzes.create')}
                        className="inline-flex items-center px-4 py-2 bg-pennies-gold text-white font-semibold rounded-md hover:bg-pennies-gold/80 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Quiz
                    </Link>
                </div>
            }
        >
            <Head title="Quizzes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {quizzes.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">No quizzes created yet.</p>
                                    <Link
                                        href={route('quizzes.create')}
                                        className="inline-flex items-center px-4 py-2 bg-pennies-purple text-white font-semibold rounded-md hover:bg-pennies-purple/80 transition-colors"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Your First Quiz
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {quizzes.map((quiz) => (
                                        <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                                                    <p className="text-gray-600 mt-1">{quiz.description}</p>
                                                    <p className="text-sm text-gray-500 mt-2">
                                                        {quiz.questions_count || 0} questions
                                                    </p>
                                                </div>
                                                <Link
                                                    href={route('quizzes.show', quiz.id)}
                                                    className="text-pennies-purple hover:text-pennies-purple/80 font-medium"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
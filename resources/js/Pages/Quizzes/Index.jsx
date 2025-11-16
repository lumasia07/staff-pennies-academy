import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Plus, BookOpen, FileQuestion, Eye, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function Index({ quizzes }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter quizzes based on search
    const filteredQuizzes = useMemo(() => {
        return quizzes.filter(quiz => 
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (quiz.description && quiz.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [quizzes, searchTerm]);

    // Calculate statistics
    const stats = useMemo(() => {
        const totalQuestions = quizzes.reduce((sum, quiz) => sum + (quiz.questions_count || 0), 0);
        const avgQuestions = quizzes.length > 0 ? Math.round(totalQuestions / quizzes.length) : 0;
        
        return {
            total: quizzes.length,
            totalQuestions,
            avgQuestions
        };
    }, [quizzes]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight" style={{ color: '#00888A' }}>
                        Exam Library
                    </h2>
                    <Link
                        href={route('quizzes.create')}
                        className="inline-flex items-center px-4 py-2 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                        style={{ background: '#00888A' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#006d6f'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#00888A'}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Exam
                    </Link>
                </div>
            }
        >
            <Head title="Exams" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4" style={{ borderColor: '#00888A' }}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 uppercase">Total Exams</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                                </div>
                                <BookOpen className="h-8 w-8 text-gray-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 uppercase">Total Questions</p>
                                    <p className="text-2xl font-bold text-blue-600 mt-1">{stats.totalQuestions}</p>
                                </div>
                                <FileQuestion className="h-8 w-8 text-blue-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 uppercase">Avg Questions/Exam</p>
                                    <p className="text-2xl font-bold text-purple-600 mt-1">{stats.avgQuestions}</p>
                                </div>
                                <FileQuestion className="h-8 w-8 text-purple-400" />
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    {quizzes.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search exams by title or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-sm"
                                />
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                Showing {filteredQuizzes.length} of {quizzes.length} exams
                            </div>
                        </div>
                    )}

                    {/* Quizzes Grid */}
                    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
                        {quizzes.length === 0 ? (
                            <div className="text-center py-16 px-4">
                                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(0, 136, 138, 0.1)' }}>
                                    <BookOpen className="h-8 w-8" style={{ color: '#00888A' }} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No exams created yet</h3>
                                <p className="text-gray-500 mb-6">Get started by creating your first exam</p>
                                <Link
                                    href={route('quizzes.create')}
                                    className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                    style={{ background: '#00888A' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#006d6f'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#00888A'}
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Create Your First Exam
                                </Link>
                            </div>
                        ) : filteredQuizzes.length === 0 ? (
                            <div className="text-center py-16 px-4">
                                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <Search className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                {filteredQuizzes.map((quiz) => (
                                    <div key={quiz.id} className="bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden group hover:border-gray-300">
                                        <div className="p-6">
                                            {/* Icon Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 136, 138, 0.1)' }}>
                                                    <BookOpen className="h-6 w-6" style={{ color: '#00888A' }} />
                                                </div>
                                                <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ background: 'rgba(0, 136, 138, 0.1)', color: '#00888A' }}>
                                                    {quiz.questions_count || 0} Questions
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                                                {quiz.title}
                                            </h3>

                                            {/* Description */}
                                            {quiz.description && (
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[3.75rem]">
                                                    {quiz.description}
                                                </p>
                                            )}

                                            {/* View Button */}
                                            <Link
                                                href={route('quizzes.show', quiz.id)}
                                                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mt-4"
                                                style={{ background: '#00888A' }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#006d6f'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = '#00888A'}
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                View Exam
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
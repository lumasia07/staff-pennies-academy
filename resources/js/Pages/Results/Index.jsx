import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Download, Mail, Search, Filter, TrendingUp, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Index({ auth, results }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Helper to determine test status
    const getStatus = (test) => {
        if (test.completed_at) {
            return <span className="font-medium text-green-600">Completed</span>;
        }
        if (new Date(test.expires_at) < new Date()) {
            return <span className="font-medium text-red-600">Expired</span>;
        }
        return <span className="font-medium text-gray-500">Pending</span>;
    };

    // Helper to format the score
    const formatScore = (score) => {
        if (score === null) return 'N/A';
        const isPass = score >= 80;
        return (
            <span className={isPass ? 'font-bold text-green-600' : 'font-bold text-red-600'}>
                {score}% {isPass ? '(Pass)' : '(Fail)'}
            </span>
        );
    };

    // Helper to format date in CST
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        // CST: America/Chicago
        return date.toLocaleString('en-US', {
            timeZone: 'America/Chicago',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }) + ' CST';
    };

    // Calculate statistics
    const stats = useMemo(() => {
        const completed = results.filter(r => r.completed_at).length;
        const passed = results.filter(r => r.score >= 80).length;
        const failed = results.filter(r => r.score !== null && r.score < 80).length;
        const pending = results.filter(r => !r.completed_at && new Date(r.expires_at) >= new Date()).length;
        const avgScore = results.filter(r => r.score !== null).reduce((sum, r) => sum + r.score, 0) / 
                        (results.filter(r => r.score !== null).length || 1);

        return {
            total: results.length,
            completed,
            passed,
            failed,
            pending,
            avgScore: Math.round(avgScore)
        };
    }, [results]);

    // Filter and search results
    const filteredResults = useMemo(() => {
        return results.filter(test => {
            // Search filter
            const searchMatch = searchTerm === '' || 
                test.student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.quiz.title.toLowerCase().includes(searchTerm.toLowerCase());

            // Status filter
            let statusMatch = true;
            if (statusFilter === 'completed') {
                statusMatch = test.completed_at !== null;
            } else if (statusFilter === 'pending') {
                statusMatch = !test.completed_at && new Date(test.expires_at) >= new Date();
            } else if (statusFilter === 'expired') {
                statusMatch = !test.completed_at && new Date(test.expires_at) < new Date();
            } else if (statusFilter === 'passed') {
                statusMatch = test.score >= 80;
            } else if (statusFilter === 'failed') {
                statusMatch = test.score !== null && test.score < 80;
            }

            return searchMatch && statusMatch;
        });
    }, [results, searchTerm, statusFilter]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight" style={{ color: '#00888A' }}>Test Results Dashboard</h2>}
        >
            <Head title="Test Results" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4" style={{ borderColor: '#00888A' }}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 uppercase">Total Tests</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                                </div>
                                <Users className="h-8 w-8 text-gray-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 uppercase">Completed</p>
                                    <p className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
                                </div>
                                <CheckCircle className="h-8 w-8 text-green-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 uppercase">Passed</p>
                                    <p className="text-2xl font-bold text-blue-600 mt-1">{stats.passed}</p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-blue-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 uppercase">Failed</p>
                                    <p className="text-2xl font-bold text-red-600 mt-1">{stats.failed}</p>
                                </div>
                                <XCircle className="h-8 w-8 text-red-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 uppercase">Avg Score</p>
                                    <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.avgScore}%</p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by student name, email, or quiz..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-sm"
                                    style={{ focusRing: '2px solid #00888A' }}
                                />
                            </div>

                            {/* Filter */}
                            <div className="sm:w-48">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Filter className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-sm"
                                        style={{ focusRing: '2px solid #00888A' }}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="completed">Completed</option>
                                        <option value="pending">Pending</option>
                                        <option value="expired">Expired</option>
                                        <option value="passed">Passed (≥80%)</option>
                                        <option value="failed">Failed (&lt;80%)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Results count */}
                        <div className="mt-3 text-sm text-gray-600">
                            Showing {filteredResults.length} of {results.length} tests
                        </div>
                    </div>

                    {/* Results Cards - Mobile Friendly */}
                    <div className="space-y-4">
                        {filteredResults.length > 0 ? (
                            filteredResults.map((test) => (
                                <div key={test.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                                    <div className="p-4 sm:p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            
                                            {/* Student Info */}
                                            <div className="flex-1">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: '#00888A' }}>
                                                        {test.student.first_name[0]}{test.student.last_name[0]}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                            {test.student.first_name} {test.student.last_name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 truncate">{test.student.email}</p>
                                                        <p className="text-sm font-medium text-gray-700 mt-1">{test.quiz.title}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status & Score */}
                                            <div className="flex flex-wrap items-center gap-4">
                                                {/* Status Badge */}
                                                <div className="flex items-center gap-2">
                                                    {test.completed_at ? (
                                                        <>
                                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                                                Completed
                                                            </span>
                                                        </>
                                                    ) : new Date(test.expires_at) < new Date() ? (
                                                        <>
                                                            <XCircle className="h-5 w-5 text-red-500" />
                                                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                                                                Expired
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Clock className="h-5 w-5 text-yellow-500" />
                                                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                                                                Pending
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Score */}
                                                {test.score !== null && (
                                                    <div className="text-center">
                                                        <div className={`text-3xl font-bold ${test.score >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {test.score}%
                                                        </div>
                                                        <div className={`text-xs font-semibold ${test.score >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {test.score >= 80 ? 'PASS' : 'FAIL'}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            {test.completed_at && (
                                                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col lg:gap-2">
                                                    <a
                                                        href={route('results.pdf', test.id)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:shadow-lg"
                                                        style={{ background: '#00888A' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.background = '#006d6f'}
                                                        onMouseLeave={(e) => e.currentTarget.style.background = '#00888A'}
                                                    >
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download PDF
                                                    </a>
                                                    <button
                                                        onClick={async () => {
                                                            if (confirm(`Send result email to ${test.student.first_name} ${test.student.last_name}?`)) {
                                                                const csrfMeta = document.querySelector('meta[name="csrf-token"]');
                                                                const csrfToken = csrfMeta ? csrfMeta.getAttribute('content') : '';
                                                                try {
                                                                    const response = await fetch(route('results.email', test.id), {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'Content-Type': 'application/json',
                                                                            'X-CSRF-TOKEN': csrfToken,
                                                                            'Accept': 'application/json',
                                                                        },
                                                                        body: JSON.stringify({})
                                                                    });
                                                                    if (response.ok) {
                                                                        alert('Result email sent successfully!');
                                                                    } else {
                                                                        alert('Failed to send result email.');
                                                                    }
                                                                } catch (error) {
                                                                    alert('Error sending result email.');
                                                                }
                                                            }
                                                        }}
                                                        className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold text-sm hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200"
                                                    >
                                                        <Mail className="h-4 w-4 mr-2" />
                                                        Email Student
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Completion Date */}
                                        {test.completed_at && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <p className="text-xs text-gray-500">
                                                    Completed on: <span className="font-medium text-gray-700">{formatDate(test.completed_at)}</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <Search className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                                <p className="text-gray-500">
                                    {results.length === 0 
                                        ? "No tests have been assigned yet." 
                                        : "Try adjusting your search or filter criteria."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
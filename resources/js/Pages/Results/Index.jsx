import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Download, Mail } from 'lucide-react';

export default function Index({ auth, results }) {

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-dtn-blue leading-tight">Test Results</h2>}
        >
            <Head title="Test Results" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900">All Assigned Tests</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {results.map((test) => (
                                        <tr key={test.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{test.student.first_name} {test.student.last_name}</div>
                                                <div className="text-sm text-gray-500">{test.student.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.quiz.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatus(test)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{formatScore(test.score)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {test.completed_at ? formatDate(test.completed_at) : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {test.completed_at ? (
                                                    <div className="flex space-x-4">
                                                        <a
                                                            href={route('results.pdf', test.id)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center text-dtn-blue hover:text-dtn-lightblue"
                                                        >
                                                            <Download className="mr-2 h-4 w-4" />
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
                                                            className="inline-flex items-center text-green-600 hover:text-green-800"
                                                            title="Send result email to student"
                                                        >
                                                            <Mail className="mr-2 h-4 w-4" />
                                                            Email Student
                                                        </button>
                                                    </div>
                                                ) : (
                                                    '--'
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {results.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No tests have been assigned yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
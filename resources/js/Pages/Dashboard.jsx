import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Users, FileClock, Percent, FilePlus, UserPlus, TrendingUp, Award, Clock, CheckCircle, XCircle } from 'lucide-react';

// A new component for your Stat Cards
function StatCard({ title, value, icon, gradient, iconBg }) {
    return (
        <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className={`absolute inset-0 ${gradient}`}></div>
            <div className="relative p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium opacity-90 uppercase tracking-wide">{title}</p>
                        <p className="mt-2 text-4xl font-bold">{value}</p>
                    </div>
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBg}`}>
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
}

// A helper for the Pass/Fail badge
function PassFailBadge({ score }) {
    if (score === null) return null;
    const isPass = score >= 70;
    return (
        <span
            className={`ml-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isPass ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
        >
            {isPass ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
            {isPass ? 'Pass' : 'Fail'}
        </span>
    );
}

// Helper to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

export default function Dashboard({ auth, stats, recentActivity }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold" style={{ color: '#00888A' }}>Dashboard</h2>
                        <p className="text-sm text-gray-600 mt-1">Welcome back, {auth.user?.name?.split(' ')[0] || 'Instructor'}!</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" style={{ color: '#00888A' }} />
                        <span className="text-sm font-medium text-gray-600">Overview</span>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                    {/* Stat Cards Section */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <StatCard
                            title="Total Students"
                            value={stats?.totalStudents ?? 0}
                            icon={<Users className="h-8 w-8 text-white" />}
                            gradient="bg-gradient-to-br from-teal-500 to-teal-600"
                            iconBg="bg-white/20"
                        />
                        <StatCard
                            title="Pending Tests"
                            value={stats?.pendingTests ?? 0}
                            icon={<FileClock className="h-8 w-8 text-white" />}
                            gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
                            iconBg="bg-white/20"
                        />
                        <StatCard
                            title="Overall Pass Rate"
                            value={`${stats?.passRate ?? 0}%`}
                            icon={<Award className="h-8 w-8 text-white" />}
                            gradient="bg-gradient-to-br from-purple-500 to-pink-600"
                            iconBg="bg-white/20"
                        />
                    </div>

                    {/* Quick Actions Section */}
                    <div className="overflow-hidden bg-white rounded-xl shadow-md border border-gray-100">
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold" style={{ color: '#00888A' }}>
                                Quick Actions
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">Frequently used actions</p>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link href={route('students.index')}>
                                    <button className="w-full group relative overflow-hidden rounded-lg border-2 border-gray-200 p-4 text-left transition-all duration-300 hover:border-teal-500 hover:shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                                                <UserPlus className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">Add New Student</p>
                                                <p className="text-xs text-gray-500">Register a student</p>
                                            </div>
                                        </div>
                                    </button>
                                </Link>
                                <Link href={route('students.index')}>
                                    <button className="w-full group relative overflow-hidden rounded-lg border-2 border-gray-200 p-4 text-left transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                                <FilePlus className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Assign a Test</p>
                                                <p className="text-xs text-gray-500">Send test to students</p>
                                            </div>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="overflow-hidden bg-white rounded-xl shadow-md border border-gray-100">
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold" style={{ color: '#00888A' }}>Recent Activity</h3>
                                    <p className="text-xs text-gray-600 mt-1">Latest completed tests</p>
                                </div>
                                <Clock className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quiz</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Score</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Completed</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentActivity.map((test, index) => (
                                        <tr key={test.id} className="hover:bg-gray-50 transition-colors" style={{ animation: `fadeIn 0.3s ease-out ${index * 0.1}s both` }}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #00888A 0%, #006d6f 100%)' }}>
                                                        {test.student.first_name[0]}{test.student.last_name[0]}
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{test.student.first_name} {test.student.last_name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-medium">{test.quiz.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className={`text-lg font-bold ${
                                                        test.score >= 70 ? 'text-green-600' : 'text-red-600'
                                                    }`}>{test.score}%</span>
                                                    <PassFailBadge score={test.score} />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(test.completed_at)}
                                            </td>
                                        </tr>
                                    ))}
                                    {recentActivity.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-500">
                                                    <FileClock className="h-12 w-12 text-gray-300 mb-3" />
                                                    <p className="text-sm font-medium">No tests have been completed yet</p>
                                                    <p className="text-xs">Recent activity will appear here</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <style jsx>{`
                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                                transform: translateY(10px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                    `}</style>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

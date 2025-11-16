import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Users, FileClock, Percent, FilePlus, UserPlus} from 'lucide-react';

// A new component for your Stat Cards
function StatCard({ title, value, icon, colorClass }) {
    return (
        <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
            <div className="flex items-center">
                <div className={`mr-4 flex-shrink-0 rounded-full p-3 ${colorClass || 'bg-dtn-blue/10'}`}>
                    {icon}
                </div>
                <div>
                    <div className="text-sm font-medium text-gray-500">{title}</div>
                    <div className="text-3xl font-bold text-gray-900">{value}</div>
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
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                isPass ? 'bg-dtn-green/10 text-dtn-green' : 'bg-dtn-red/10 text-dtn-red'
            }`}
        >
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
            header={<h2 className="font-semibold text-xl text-dtn-blue leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">

                   

                    {/* 2. Stat Cards Section */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <StatCard
                            title="Total Students"
                            value={stats?.totalStudents ?? 0}
                            icon={<Users className="h-6 w-6 text-dtn-blue" />}
                            colorClass="bg-dtn-blue/10"
                        />
                        <StatCard
                            title="Pending Tests"
                            value={stats?.pendingTests ?? 0}
                            icon={<FileClock className="h-6 w-6 text-yellow-600" />}
                            colorClass="bg-yellow-100"
                        />
                        <StatCard
                            title="Overall Pass Rate"
                            value={`${stats?.passRate ?? 0}%`}
                            icon={<Percent className="h-6 w-6 text-dtn-green" />}
                            colorClass="bg-dtn-green/10"
                        />
                    </div>

                    {/* 3. Quick Actions Section */}
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900">
                            Quick Actions
                        </h3>
                        <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <Link href={route('students.index')}>
                                <PrimaryButton className="w-full sm:w-auto">
                                    <UserPlus className="-ms-1 me-2 h-5 w-5" />
                                    Add New Student
                                </PrimaryButton>
                            </Link>
                            <Link href={route('students.index')}>
                                <PrimaryButton className="w-full sm:w-auto">
                                    <FilePlus className="-ms-1 me-2 h-5 w-5" />
                                    Assign a Test
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>

                    {/* 4. Recent Activity Section */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quiz</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentActivity.map((test) => (
                                        <tr key={test.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{test.student.first_name} {test.student.last_name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.quiz.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                                                <span className={test.score >= 70 ? 'text-dtn-green' : 'text-dtn-red'}>{test.score}%</span>
                                                <PassFailBadge score={test.score} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(test.completed_at)}
                                            </td>
                                        </tr>
                                    ))}
                                    {recentActivity.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No tests have been completed yet.
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

import { useEffect, useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { Head, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { Plus, UserPlus, Mail, Send, Search, Users, BookOpen, ClipboardList, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Index({ students, quizzes }) {
    const { flash } = usePage().props;
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showMassAssignModal, setShowMassAssignModal] = useState(false);
    const [showAssignTestModal, setShowAssignTestModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [emailList, setEmailList] = useState([]);
    const [singleEmailInput, setSingleEmailInput] = useState('');
    const [validEmails, setValidEmails] = useState([]);
    const [invalidEmails, setInvalidEmails] = useState([]);

    const addStudentForm = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    });

    const assignTestForm = useForm({
        student_id: '',
        quiz_id: '',
        expires_in: 1,
    });

    const massAssignForm = useForm({
        quiz_id: '',
        expires_in: 1,
        mass_emails: '',
    });

    // Filter students based on search
    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [students, searchTerm]);

    // Statistics
    const stats = useMemo(() => ({
        total: students.length,
        withTests: students.filter(s => s.tests_count > 0).length,
        availableExams: quizzes.length,
    }), [students, quizzes]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const parseEmails = (text) => {
        const emails = text
            .split(/[\n,;]+/)
            .map(e => e.trim())
            .filter(e => e);
        
        const valid = emails.filter(validateEmail);
        const invalid = emails.filter(e => !validateEmail(e));
        
        return { valid, invalid };
    };

    const submitAddStudent = (e) => {
        e.preventDefault();
        addStudentForm.post(route('students.store'), {
            onSuccess: () => {
                setShowAddStudentModal(false);
                addStudentForm.reset();
                toast.success('Student added successfully!');
            },
            onError: () => {
                toast.error('Failed to add student. Please check the form.');
            }
        });
    };

    const addSingleEmail = () => {
        const email = singleEmailInput.trim();
        
        if (!email) {
            toast.error('Please enter an email address');
            return;
        }
        
        if (!validateEmail(email)) {
            setInvalidEmails(prev => [...new Set([...prev, email])]);
            toast.error('Invalid email format', {
                icon: <AlertCircle className="w-5 h-5" />
            });
            setSingleEmailInput('');
            return;
        }
        
        if (validEmails.includes(email)) {
            toast.error('Email already added');
            return;
        }
        
        setValidEmails(prev => [...prev, email]);
        toast.success('Email added successfully', {
            icon: <CheckCircle2 className="w-5 h-5" />
        });
        setSingleEmailInput('');
    };

    const removeValidEmail = (email) => {
        setValidEmails(prev => prev.filter(e => e !== email));
    };

    const removeInvalidEmail = (email) => {
        setInvalidEmails(prev => prev.filter(e => e !== email));
    };

    const removeEmail = (email) => {
        setEmailList(prev => prev.filter(e => e !== email));
        toast.info('Email removed from list');
    };

    const clearAllEmails = () => {
        setValidEmails([]);
        setInvalidEmails([]);
        setSingleEmailInput('');
        toast.info('All emails cleared');
    };

    const submitAssignTest = (e) => {
        e.preventDefault();
        
        assignTestForm.post(route('student-tests.store'), {
            data: {
                student_id: selectedStudent.id,
                quiz_id: assignTestForm.data.quiz_id,
                expires_in: 1,
            },
            onSuccess: () => {
                setShowAssignTestModal(false);
                assignTestForm.reset();
                setSelectedStudent(null);
                toast.success(`Test assigned to ${selectedStudent.first_name}!`, {
                    icon: <CheckCircle2 className="w-5 h-5" />
                });
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Assignment errors:', errors);
                toast.error('Failed to assign test. Please try again.');
            }
        });
    };

    const submitMassAssign = (e) => {
        e.preventDefault();
        
        if (validEmails.length === 0) {
            toast.error('Please add at least one valid email address');
            return;
        }

        massAssignForm.post(route('student-tests.store'), {
            data: {
                quiz_id: massAssignForm.data.quiz_id,
                expires_in: 1,
                mass_emails: validEmails.join(','),
            },
            onSuccess: () => {
                setShowMassAssignModal(false);
                massAssignForm.reset();
                clearAllEmails();
                toast.success(`Test assigned to ${validEmails.length} student(s) successfully!`, {
                    icon: <CheckCircle2 className="w-5 h-5" />,
                    duration: 5000,
                });
                // Reload the page to refresh student data
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Mass assignment errors:', errors);
                toast.error('Failed to assign tests. Please try again.');
            }
        });
    };

    const openAssignTestModal = (student) => {
        setSelectedStudent(student);
        assignTestForm.setData('student_id', student.id);
        setShowAssignTestModal(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight" style={{ color: '#00888A' }}>
                        Student Management
                    </h2>
                </div>
            }
        >
            <Head title="Students" />

            <div className="py-6 pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium opacity-90 uppercase">Total Students</p>
                                    <p className="text-4xl font-bold mt-2">{stats.total}</p>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                    <Users className="h-8 w-8" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium opacity-90 uppercase">With Tests</p>
                                    <p className="text-4xl font-bold mt-2">{stats.withTests}</p>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                    <ClipboardList className="h-8 w-8" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium opacity-90 uppercase">Available Exams</p>
                                    <p className="text-4xl font-bold mt-2">{stats.availableExams}</p>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                    <BookOpen className="h-8 w-8" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    {students.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search students by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-sm"
                                />
                            </div>
                            <div className="mt-2 text-sm text-gray-600 flex items-center justify-between">
                                <span>Showing {filteredStudents.length} of {students.length} students</span>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="text-xs text-gray-500 hover:text-gray-700 underline"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Students List */}
                    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
                        {students.length === 0 ? (
                            <div className="text-center py-20 px-4">
                                <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #00888A 0%, #006d6f 100%)' }}>
                                    <Users className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No students yet</h3>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                    Get started by adding your first student to the system. You can add them individually or import multiple students at once.
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => setShowAddStudentModal(true)}
                                        className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                        style={{ background: 'linear-gradient(135deg, #00888A 0%, #006d6f 100%)' }}
                                    >
                                        <UserPlus className="w-5 h-5 mr-2" />
                                        Add Your First Student
                                    </button>
                                </div>
                            </div>
                        ) : filteredStudents.length === 0 ? (
                            <div className="text-center py-16 px-4">
                                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <Search className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {filteredStudents.map((student, index) => (
                                    <div 
                                        key={student.id} 
                                        className="p-6 hover:bg-gray-50 transition-colors duration-150"
                                        style={{
                                            animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s both`
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 flex-1">
                                                {/* Avatar with gradient */}
                                                <div 
                                                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0"
                                                    style={{ 
                                                        background: `linear-gradient(135deg, #00888A ${index * 10 % 50}%, #${(index * 1234) .toString(16).slice(0, 6)})` 
                                                    }}
                                                >
                                                    {student.first_name[0]}{student.last_name[0]}
                                                </div>

                                                {/* Student Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-lg font-bold text-gray-900 truncate">
                                                            {student.first_name} {student.middle_name && `${student.middle_name} `}{student.last_name}
                                                        </h3>
                                                        {student.tests_count > 0 && (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                                <ClipboardList className="w-3 h-3 mr-1" />
                                                                {student.tests_count} test{student.tests_count !== 1 ? 's' : ''}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center">
                                                            <Mail className="w-4 h-4 mr-1.5 flex-shrink-0" />
                                                            <span className="truncate">{student.email}</span>
                                                        </div>
                                                        {student.phone_number && (
                                                            <span className="truncate">{student.phone_number}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <button
                                                onClick={() => openAssignTestModal(student)}
                                                className="ml-4 inline-flex items-center px-5 py-2.5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0"
                                                style={{ background: 'linear-gradient(135deg, #00888A 0%, #006d6f 100%)' }}
                                            >
                                                <BookOpen className="w-4 h-4 mr-2" />
                                                Assign Test
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
                <button
                    onClick={() => setShowAddStudentModal(true)}
                    className="group relative"
                    title="Add Student"
                >
                    <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Add Student
                    </div>
                    <div 
                        className="w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
                        style={{ background: 'linear-gradient(135deg, #00888A 0%, #006d6f 100%)' }}
                    >
                        <UserPlus className="w-6 h-6" />
                    </div>
                </button>
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

            {/* Add Student Modal */}
            <Modal show={showAddStudentModal} onClose={() => setShowAddStudentModal(false)} maxWidth="md">
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-6" style={{ color: '#00888A' }}>Add New Student</h3>
                    <form onSubmit={submitAddStudent} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="first_name" value="First Name *" />
                                <TextInput
                                    id="first_name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={addStudentForm.data.first_name}
                                    onChange={(e) => addStudentForm.setData('first_name', e.target.value)}
                                    required
                                />
                                <InputError message={addStudentForm.errors.first_name} className="mt-1" />
                            </div>
                            <div>
                                <InputLabel htmlFor="last_name" value="Last Name *" />
                                <TextInput
                                    id="last_name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={addStudentForm.data.last_name}
                                    onChange={(e) => addStudentForm.setData('last_name', e.target.value)}
                                    required
                                />
                                <InputError message={addStudentForm.errors.last_name} className="mt-1" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="middle_name" value="Middle Name (Optional)" />
                            <TextInput
                                id="middle_name"
                                type="text"
                                className="mt-1 block w-full"
                                value={addStudentForm.data.middle_name}
                                onChange={(e) => addStudentForm.setData('middle_name', e.target.value)}
                            />
                            <InputError message={addStudentForm.errors.middle_name} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email Address *" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={addStudentForm.data.email}
                                onChange={(e) => addStudentForm.setData('email', e.target.value)}
                                required
                            />
                            <InputError message={addStudentForm.errors.email} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone_number" value="Phone Number (Optional)" />
                            <TextInput
                                id="phone_number"
                                type="text"
                                placeholder="(555) 123-4567"
                                className="mt-1 block w-full"
                                value={addStudentForm.data.phone_number}
                                onChange={(e) => addStudentForm.setData('phone_number', e.target.value)}
                            />
                            <InputError message={addStudentForm.errors.phone_number} className="mt-1" />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <SecondaryButton type="button" onClick={() => setShowAddStudentModal(false)}>
                                Cancel
                            </SecondaryButton>
                            <button
                                type="submit"
                                disabled={addStudentForm.processing}
                                className="inline-flex items-center px-6 py-2.5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ background: '#00888A' }}
                                onMouseEnter={(e) => !addStudentForm.processing && (e.currentTarget.style.background = '#006d6f')}
                                onMouseLeave={(e) => !addStudentForm.processing && (e.currentTarget.style.background = '#00888A')}
                            >
                                {addStudentForm.processing ? 'Adding...' : 'Add Student'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Assign Test Modal - Single Student */}
            <Modal show={showAssignTestModal} onClose={() => setShowAssignTestModal(false)} maxWidth="md">
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #00888A 0%, #006d6f 100%)' }}>
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold" style={{ color: '#00888A' }}>
                                Assign Test
                            </h3>
                            {selectedStudent && (
                                <p className="text-xs text-gray-600">
                                    to {selectedStudent.first_name} {selectedStudent.last_name}
                                </p>
                            )}
                        </div>
                    </div>

                    <form onSubmit={submitAssignTest} className="space-y-4">
                        {/* Selected Student Info */}
                        {selectedStudent && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Student Email</p>
                                        <p className="text-sm font-semibold text-gray-900">{selectedStudent.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Exam Selection */}
                        <div>
                            <InputLabel htmlFor="quiz_id" value="Select Exam *" className="flex items-center gap-2" />
                            <select
                                id="quiz_id"
                                className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:border-transparent text-sm py-3"
                                value={assignTestForm.data.quiz_id}
                                onChange={(e) => assignTestForm.setData('quiz_id', e.target.value)}
                                required
                            >
                                <option value="">Choose an exam...</option>
                                {quizzes.map((quiz) => (
                                    <option key={quiz.id} value={quiz.id}>
                                        {quiz.title} ({quiz.questions_count || 0} questions)
                                    </option>
                                ))}
                            </select>
                            <InputError message={assignTestForm.errors.quiz_id} className="mt-1" />
                        </div>

                        {/* Duration Info */}
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <p className="text-sm text-blue-800">
                                Test Duration: <span className="font-semibold">1 hour</span>
                            </p>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <SecondaryButton type="button" onClick={() => setShowAssignTestModal(false)}>
                                Cancel
                            </SecondaryButton>
                            <button
                                type="submit"
                                disabled={assignTestForm.processing}
                                className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ background: 'linear-gradient(135deg, #00888A 0%, #006d6f 100%)' }}
                            >
                                {assignTestForm.processing ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Assign Test
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Mass Assign Modal */}
            <Modal show={showMassAssignModal} onClose={() => {
                setShowMassAssignModal(false);
                clearAllEmails();
            }} maxWidth="2xl">
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold" style={{ color: '#00888A' }}>
                                Mass Assign Tests
                            </h3>
                            <p className="text-xs text-gray-600">Assign tests to multiple students</p>
                        </div>
                    </div>

                    <form onSubmit={submitMassAssign} className="space-y-4">
                        {/* Exam Selection */}
                        <div>
                            <InputLabel htmlFor="mass_quiz_id" value="Select Exam *" />
                            <select
                                id="mass_quiz_id"
                                className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:border-transparent text-sm py-3"
                                value={massAssignForm.data.quiz_id}
                                onChange={(e) => massAssignForm.setData('quiz_id', e.target.value)}
                                required
                            >
                                <option value="">Choose an exam...</option>
                                {quizzes.map((quiz) => (
                                    <option key={quiz.id} value={quiz.id}>
                                        {quiz.title} ({quiz.questions_count || 0} questions)
                                    </option>
                                ))}
                            </select>
                            <InputError message={massAssignForm.errors.quiz_id} className="mt-1" />
                        </div>

                        {/* Duration Info */}
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <p className="text-sm text-blue-800">
                                Test Duration: <span className="font-semibold">1 hour</span>
                            </p>
                        </div>

                        {/* Email Input Section */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Mail className="w-4 h-4" style={{ color: '#00888A' }} />
                                <InputLabel value="Add Student Email" className="mb-0 text-sm font-semibold" />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="student@email.com"
                                    value={singleEmailInput}
                                    onChange={(e) => setSingleEmailInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addSingleEmail();
                                        }
                                    }}
                                    className="flex-1 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:border-transparent text-sm py-2"
                                    style={{ '--tw-ring-color': '#00888A' }}
                                />
                                <button
                                    type="button"
                                    onClick={addSingleEmail}
                                    className="inline-flex items-center justify-center px-4 py-2 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all text-sm whitespace-nowrap"
                                    style={{ background: '#00888A' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#006d6f'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#00888A'}
                                >\n                                    <Plus className="w-4 h-4 mr-1" />\n                                    Add\n                                </button>\n                            </div>\n                            <p className="text-xs text-gray-500 mt-1.5">\n                                Press Enter to add quickly\n                            </p>
                        </div>

                        {/* Valid Emails List */}
                        {validEmails.length > 0 && (
                            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        <h4 className="font-semibold text-sm text-green-900">
                                            Valid ({validEmails.length})
                                        </h4>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setValidEmails([]);
                                            toast.info('Valid emails cleared');
                                        }}
                                        className="text-xs text-green-700 hover:text-green-900 font-medium underline"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                                    {validEmails.map((email, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-green-400 rounded-full text-xs font-medium text-green-900 shadow-sm"
                                        >
                                            <span className="truncate max-w-[200px]">{email}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeValidEmail(email)}
                                                className="text-green-600 hover:text-red-600 transition-colors flex-shrink-0"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Invalid Emails List */}
                        {invalidEmails.length > 0 && (
                            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                        <h4 className="font-semibold text-sm text-red-900">
                                            Invalid ({invalidEmails.length})
                                        </h4>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setInvalidEmails([]);
                                            toast.info('Invalid emails cleared');
                                        }}
                                        className="text-xs text-red-700 hover:text-red-900 font-medium underline"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                                    {invalidEmails.map((email, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-red-400 rounded-full text-xs font-medium text-red-900"
                                        >
                                            <span className="truncate max-w-[200px]">{email}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeInvalidEmail(email)}
                                                className="text-red-600 hover:text-gray-600 transition-colors flex-shrink-0"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-red-600 mt-1.5">
                                    Invalid format - will not be included
                                </p>
                            </div>
                        )}

                        <div className="flex justify-end gap-2 pt-3 border-t">
                            <SecondaryButton type="button" onClick={() => {
                                setShowMassAssignModal(false);
                                clearAllEmails();
                            }}>
                                Cancel
                            </SecondaryButton>
                            <button
                                type="submit"
                                disabled={massAssignForm.processing || validEmails.length === 0}
                                className="inline-flex items-center px-6 py-2.5 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                style={{ background: '#00888A' }}
                                onMouseEnter={(e) => !massAssignForm.processing && (e.currentTarget.style.background = '#006d6f')}
                                onMouseLeave={(e) => !massAssignForm.processing && (e.currentTarget.style.background = '#00888A')}
                            >
                                {massAssignForm.processing ? (
                                    <>
                                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Assign to {validEmails.length} Student{validEmails.length !== 1 ? 's' : ''}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
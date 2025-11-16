import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { Head, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { Plus, UserPlus } from 'lucide-react';

export default function Index({ students, quizzes }) {
    // Floating Add Student Button
    const FloatingAddStudentButton = () => (
        <button
            type="button"
            onClick={() => setShowAddStudentModal(true)}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 50,
                background: '#00888A',
                color: 'white',
                borderRadius: '9999px',
                padding: '0.75rem 1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                fontWeight: 'bold',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
            }}
        >
            <UserPlus className="w-5 h-5" /> Add Student
        </button>
    );
    const { flash } = usePage().props;
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showAssignTestModal, setShowAssignTestModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

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
        expires_in: 1, // default to 1 hour
        mass_emails: '', // comma or newline separated emails
    });

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const submitAddStudent = (e) => {
        e.preventDefault();
        addStudentForm.post(route('students.store'), {
            onSuccess: () => {
                setShowAddStudentModal(false);
                addStudentForm.reset();
                toast.success('Student added successfully.');
            },
        });
    };

    const submitAssignTest = (e) => {
        e.preventDefault();
        assignTestForm.post(route('student-tests.store'), {
            onSuccess: () => {
                setShowAssignTestModal(false);
                assignTestForm.reset();
                toast.success('Test assigned successfully.');
            },
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
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Student Roster
                    </h2>
                    <PrimaryButton onClick={() => setShowAddStudentModal(true)}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Student
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Students" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {students.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <p className="text-gray-500 mb-4">No students yet. Add your first student!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {students.map((student) => (
                                        <div key={student.id} className="flex justify-between items-center p-4 border rounded-lg">
                                            <div>
                                                <h3 className="font-semibold">{student.first_name} {student.last_name}</h3>
                                                <p className="text-sm text-gray-600">{student.email}</p>
                                                {student.phone_number && <p className="text-sm text-gray-600">{student.phone_number}</p>}
                                            </div>
                                            <PrimaryButton onClick={() => openAssignTestModal(student)}>
                                                Assign Test
                                            </PrimaryButton>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <FloatingAddStudentButton />

            {/* Add Student Modal */}
            <Modal show={showAddStudentModal} onClose={() => setShowAddStudentModal(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
                    <form onSubmit={submitAddStudent}>
                        <div className="mb-4">
                            <InputLabel htmlFor="first_name" value="First Name" />
                            <TextInput
                                id="first_name"
                                type="text"
                                className="mt-1 block w-full"
                                value={addStudentForm.data.first_name}
                                onChange={(e) => addStudentForm.setData('first_name', e.target.value)}
                                required
                            />
                            <InputError message={addStudentForm.errors.first_name} />
                        </div>
                        <div className="mb-4">
                            <InputLabel htmlFor="middle_name" value="Middle Name (Optional)" />
                            <TextInput
                                id="middle_name"
                                type="text"
                                className="mt-1 block w-full"
                                value={addStudentForm.data.middle_name}
                                onChange={(e) => addStudentForm.setData('middle_name', e.target.value)}
                            />
                            <InputError message={addStudentForm.errors.middle_name} />
                        </div>
                        <div className="mb-4">
                            <InputLabel htmlFor="last_name" value="Last Name" />
                            <TextInput
                                id="last_name"
                                type="text"
                                className="mt-1 block w-full"
                                value={addStudentForm.data.last_name}
                                onChange={(e) => addStudentForm.setData('last_name', e.target.value)}
                                required
                            />
                            <InputError message={addStudentForm.errors.last_name} />
                        </div>
                        <div className="mb-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={addStudentForm.data.email}
                                onChange={(e) => addStudentForm.setData('email', e.target.value)}
                                required
                            />
                            <InputError message={addStudentForm.errors.email} />
                        </div>
                        <div className="mb-4">
                            <InputLabel htmlFor="phone_number" value="Phone Number" />
                            <TextInput
                                id="phone_number"
                                type="text"
                                className="mt-1 block w-full"
                                value={addStudentForm.data.phone_number}
                                onChange={(e) => addStudentForm.setData('phone_number', e.target.value)}
                            />
                            <InputError message={addStudentForm.errors.phone_number} />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <SecondaryButton onClick={() => setShowAddStudentModal(false)}>
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton type="submit" disabled={addStudentForm.processing}>
                                Add Student
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Assign Test Modal */}
            <Modal show={showAssignTestModal} onClose={() => setShowAssignTestModal(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Assign Test</h3>
                    <form onSubmit={submitAssignTest}>
                        <div className="mb-4">
                            <InputLabel htmlFor="quiz_id" value="Select Quiz" />
                            <select
                                id="quiz_id"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={assignTestForm.data.quiz_id}
                                onChange={(e) => assignTestForm.setData('quiz_id', e.target.value)}
                                required
                            >
                                <option value="">Choose an exam</option>
                                {quizzes.map((quiz) => (
                                    <option key={quiz.id} value={quiz.id}>
                                        {quiz.title}
                                    </option>
                                ))}
                            </select>
                            <InputError message={assignTestForm.errors.quiz_id} />
                        </div>
                        <div className="mb-4">
                            <InputLabel htmlFor="mass_emails" value="Assign to Multiple Student Emails (comma or newline separated)" />
                            <textarea
                                id="mass_emails"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={assignTestForm.data.mass_emails}
                                onChange={(e) => assignTestForm.setData('mass_emails', e.target.value)}
                                rows={3}
                                placeholder="student1@email.com, student2@email.com"
                            />
                            <InputError message={assignTestForm.errors.mass_emails} />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <SecondaryButton onClick={() => setShowAssignTestModal(false)}>
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton type="submit" disabled={assignTestForm.processing}>
                                Assign Test
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
import { Head } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function Results() {
    return (
        <>
            <Head title="Test Submitted" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white shadow rounded-lg p-8 max-w-md text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Test submitted successfully</h1>
                    <p className="text-gray-600">Results will be given by your instructor.</p>
                </div>
            </div>
        </>
    );
}

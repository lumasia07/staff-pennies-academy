import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Toaster } from 'sonner'; // <-- Import

export default function Guest({ children }) {
    return (
        <>
            <Toaster position="top-right" richColors /> {/* <-- Add this */}
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 pt-6 sm:pt-0">
                <div className="mt-6 w-full max-w-md overflow-hidden bg-white px-6 py-8 shadow-md sm:rounded-lg">
                    <div className="flex justify-center mb-6">
                        <Link href="/">
                            <ApplicationLogo className="h-20 w-auto" />
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}
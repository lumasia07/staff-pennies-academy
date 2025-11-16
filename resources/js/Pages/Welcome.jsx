import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Login from '@/Pages/Auth/Login';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <Login status={null} canResetPassword={true} />
        </>
    );
}
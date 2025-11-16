import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react'; // <-- Import Eye/EyeOff icons

export default function Login({ status, canResetPassword }) {
    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        location: '',
        password: '',
        remember: false,
    });

    // This hook watches for errors and 'status', then fires a toast
    useEffect(() => {
        if (errors.location) {
            toast.error(errors.location);
            reset('password');
        } else if (errors.password) {
            toast.error(errors.password);
        } else if (errors.message) {
            toast.error(errors.message);
            reset('password');
        }
        if (status) {
            toast.success(status);
        }
    }, [errors, status]);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <h2 className="mb-6 text-center text-3xl font-bold text-pennies-purple">
                Staff Portal Login
            </h2>

            <form onSubmit={submit}>
                {/* Location Input */}
                <div>
                    <TextInput
                        id="location"
                        type="text"
                        name="location"
                        value={data.location}
                        placeholder="Location (e.g. Frisco)"
                        className="mt-1 block w-full"
                        autoComplete="off"
                        isFocused={true}
                        onChange={(e) => setData('location', e.target.value)}
                        focusClasses="focus:ring-pennies-purple"
                    />
                </div>

                {/* Password Input - Eye/EyeOff Added */}
                <div className="relative mt-4">
                    <TextInput
                        id="password"
                        type={showPassword ? 'text' : 'password'} // <-- Dynamic type
                        name="password"
                        value={data.password}
                        placeholder="Password"
                        className="mt-1 block w-full pr-10" // <-- Padding on right
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        focusClasses="focus:ring-pennies-purple"
                    />
                    
                    {/* Toggle Button */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 transition hover:text-pennies-purple"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                    {/* InputError removed for toast */}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-pennies-purple shadow-sm focus:ring-pennies-purple"
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-pennies-purple focus:outline-none focus:ring-2 focus:ring-pennies-purple focus:ring-offset-2"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                {/* Login Button */}
                <div className="mt-6">
                    <PrimaryButton className="w-full justify-center py-3 text-sm" disabled={processing}>
                        {processing ? 'Logging in...' : 'Log In'}
                    </PrimaryButton>
                </div>

                {/* Link to Register */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        href={route('register')}
                        className="font-medium text-pennies-purple underline hover:text-pennies-purple focus:outline-none focus:ring-2 focus:ring-pennies-purple"
                    >
                        Register here
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
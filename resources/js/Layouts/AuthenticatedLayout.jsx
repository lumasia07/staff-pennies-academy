import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth?.user ?? { name: '', email: '' };

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Generate initials from user name
    const getInitials = (name) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Always use DTN teal for avatar
    const getAvatarColor = () => 'bg-[#00888A]';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-md backdrop-blur-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-2 transition-all duration-200 hover:scale-105">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden sm:ms-8 sm:flex sm:items-center sm:gap-1">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('students.index')}
                                    active={route().current('students.*')}
                                >
                                    Students
                                </NavLink>
                                <NavLink
                                    href={route('quizzes.index')}
                                    active={route().current('quizzes.*')}
                                >
                                    Exams
                                </NavLink>
                                <NavLink
                                    href={route('results.index')}
                                    active={route().current('results.*')}
                                >
                                    Test Results
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                            >
                                                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor()}`}>
                                                    {getInitials(user.name)}
                                                </div>
                                                <span className="hidden md:block truncate max-w-[120px]">{user.name}</span>
                                                <svg
                                                    className="h-4 w-4 text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <div className="px-4 py-3 border-b bg-gradient-to-r from-teal-500 to-teal-600 rounded-t-lg shadow-md">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold bg-white text-teal-600"> 
                                                    {getInitials(user.name)}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-white truncate max-w-[140px]">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-xs text-white/90 truncate max-w-[140px]">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 transition duration-200 hover:bg-teal-50 hover:text-teal-600 focus:bg-teal-50 focus:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden border-t border-gray-200 bg-white'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2 px-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('students.index')}
                            active={route().current('students.*')}
                        >
                            Students
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('quizzes.index')}
                            active={route().current('quizzes.*')}
                        >
                            Exams
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('results.index')}
                            active={route().current('results.*')}
                        >
                            Test Results
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-3 pt-4 bg-gradient-to-r from-gray-50 to-blue-50">
                        <div className="flex items-center gap-3 px-4">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${getAvatarColor()}`}>
                                {getInitials(user.name)}
                            </div>
                            <div>
                                <div className="text-base font-semibold text-gray-900">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-600">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1 px-2">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
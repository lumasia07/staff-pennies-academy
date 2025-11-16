import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'relative inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ' +
                (active
                    ? 'text-indigo-600 bg-indigo-50 shadow-sm '
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 ') +
                className
            }
        >
            {children}
            {active && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 translate-y-2 rounded-full bg-indigo-600"></span>
            )}
        </Link>
    );
}
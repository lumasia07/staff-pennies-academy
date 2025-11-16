export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-md border border-transparent bg-[#00888A] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out ${
                    disabled ? 'opacity-25' : 'hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#00888A] focus:ring-offset-2'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
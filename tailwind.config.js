import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            // --- ADDED COLORS HERE ---
            colors: {
                'pennies-purple': '#2A0E4F', // For headings, icons, and links
                'pennies-gold': '#FFC107',   // Primary button accent
                'pennies-orange': '#FFA000', // For button gradient
                'pennies-blue': '#1976D2',   // For secondary accents
                'dtn-blue': '#2563eb',       // DTN primary blue
                'dtn-lightblue': '#3b82f6',  // DTN light blue
                'dtn-green': '#16a34a',      // DTN green for pass
                'dtn-red': '#dc2626',        // DTN red for fail
            },
            // ------------------------
        },
    },

    plugins: [forms],
};
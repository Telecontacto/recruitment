import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import React from 'react';

export default function SignOutForm() {
    const handleSignOut = async () => {
        try {
            const response = await fetch('/api/signout', {
                method: 'POST',
            });
            if (response.ok) {
                // Handle successful sign out, e.g., redirect to login page
                window.location.href = '/login';
            } else {
                console.error('Failed to sign out');
            }
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-200 dark:bg-gray-800 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-500 md:flex-none md:justify-start md:p-2 md:px-3"
        >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
        </button>
    );
}
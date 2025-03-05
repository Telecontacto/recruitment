'use client';

import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/app/translations';

export default function SignOutForm() {
    const { language } = useLanguage();

    const handleSignOut = async () => {
        try {
            await signOut({
                callbackUrl: '/login',
                redirect: true,
            });
        } catch (error) {
            console.error('Error signing out:', error);
            window.location.href = '/login';
        }
    };

    return (
        <button
            onClick={handleSignOut}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-200 dark:bg-gray-800 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-500 md:flex-none md:justify-start md:p-2 md:px-3"
        >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">
                {getTranslation('navSignOut', language)}
            </div>
        </button>
    );
}
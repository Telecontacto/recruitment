import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import SignOutForm from '@/app/ui/dashboard/signout';
import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded ${isDarkMode ? 'gunmetal text-white' : 'bg-gray-200 text-black'}`}
        >
          {isDarkMode ? (
            <SunIcon className="h-6 w-6 text-white-500" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md gunmetal dark:bg-gray-800 p-4 md:h-40"
        href="/"
      >
        <div className="text-white">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-200 dark:bg-gray-800 md:block"></div>
        <SignOutForm />
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import SignOutForm from '@/app/ui/dashboard/signout';
import React, { useState, useEffect } from 'react';
import ThemeButton from '@/app/ui/dashboard/theme-button';
import LanguageToggle from '../language-toggle';

export default function SideNav() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          setSession(data);
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
      }
    };

    fetchSession();
  }, []);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex items-center justify-between mb-4">
        <ThemeButton />
        <LanguageToggle />
      </div>
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md gunmetal p-4 md:h-40"
        href="/"
      >
        <div className="text-white">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks session={session} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-200 dark:bg-gray-800 md:block"></div>
        <SignOutForm />
      </div>
    </div>
  );
}

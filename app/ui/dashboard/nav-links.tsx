'use client';
import {
  HomeIcon,
  DocumentDuplicateIcon,
  CalendarIcon,
  FlagIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/app/translations';
import React from 'react';
import { Session } from 'next-auth';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'navDash', href: '/dashboard', icon: HomeIcon, roles: ['admin', 'user'] },
  { name: 'navPipeline', href: '/dashboard/pipeline', icon: DocumentDuplicateIcon, roles: ['admin', 'user'] },
  { name: 'navCalendar', href: '/dashboard/calendar', icon: CalendarIcon, roles: ['admin'] },
  { name: 'navReport', href: '/dashboard/report', icon: FlagIcon, roles: ['admin'] },
];

export default function NavLinks({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const { language } = useLanguage();

  console.log(session);

  // Filter links based on the user's role.
  const filteredLinks = links.filter((link) => {
    if (!session) return false;
    return link.roles.includes(session.user.role);
  });

  return (
    <>
      {filteredLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={`${link.name}-${language}`}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 dark:bg-gray-800 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-500 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-red-100 dark:bg-red-100 text-red-500': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{getTranslation(link.name, language)}</p>
          </Link>
        );
      })}
    </>
  );
}

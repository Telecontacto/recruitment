'use client';

import { GlobeAltIcon, HashtagIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import CIcon from '@coreui/icons-react';
import {
    cibFacebook,
    cibInstagram,
    cibLinkedin,
    cibIndeed,
} from '@coreui/icons';
import { montserrat } from '@/app/ui/fonts';

const sourceIconMap: { [key: string]: any } = {
    'Facebook': () => <CIcon icon={cibFacebook} className="h-5 w-5 text-gray-700 dark:text-white" />,
    'Instagram': () => <CIcon icon={cibInstagram} className="h-5 w-5 text-gray-700 dark:text-white" />,
    'LinkedIn': () => <CIcon icon={cibLinkedin} className="h-5 w-5 text-gray-700 dark:text-white" />,
    'Indeed': () => <CIcon icon={cibIndeed} className="h-5 w-5 text-gray-700 dark:text-white" />,
    'Zip': UserCircleIcon,
    'Perfil': UserCircleIcon,
    'Web': GlobeAltIcon,
    'Total': HashtagIcon,
};

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'Facebook' | 'Indeed' | 'Instagram' | 'LinkedIn' | 'Web' | 'ZipRecruiter' | 'Perfil' | 'Total';
}) {
    const IconComponent = sourceIconMap[type] || GlobeAltIcon;

    return (
        <div className={`${montserrat.className} p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md`}>
            <div className="flex p-4">
                {typeof IconComponent === 'function' ?
                    <IconComponent /> :
                    <IconComponent className="h-5 w-5 text-gray-700 dark:text-white" />
                }
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p className={`${montserrat.className}
                truncate rounded-xl bg-white dark:bg-gray-800 px-4 py-8 text-center text-2xl`}
            >
                {value === 0 ? '-' : value}
            </p>
        </div>
    );
}

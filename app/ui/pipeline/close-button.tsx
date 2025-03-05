'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CloseButton() {
    const handleClose = () => {
        window.close();
    };

    return (
        <button
            onClick={handleClose}
            className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
            <XMarkIcon className="w-5" />
            Close
        </button>
    );
}

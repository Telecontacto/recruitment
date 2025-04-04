'use client';
import { useState, ChangeEvent, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { ThemeContext } from '@/app/context/ThemeContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/app/translations';
import { montserrat } from '@/app/ui/fonts';

export default function ReviewApplication({
    data,
}: {
    data: any;
}) {
    const [info, setInfo] = useState(data[0]);
    const themeContext = useContext(ThemeContext);
    const { language } = useLanguage();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInfo((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };

    const formatDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className={`dark:bg-gray-800 dark:text-gray-300 duration-300 rounded-lg p-6 ${montserrat.className}`}>
            <Box sx={{ width: '100%' }}>
                <h2 className="text-xl font-semibold mb-4">
                    {getTranslation('rejectionDetails', language) || 'Rejection Details'}
                </h2>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="rejectionReason" className="block mb-2 font-medium">
                            {getTranslation('rejectionReason', language) || 'Reason for Rejection'}:
                        </label>
                        <textarea
                            id="rejectionReason"
                            name="rejectionReason"
                            rows={6}
                            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                            value={info.rejectionReason || ''}
                            onChange={handleChange}
                            placeholder={getTranslation('typeRejectionReason', language) || 'Type the reason for rejection here...'}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="reviewedBy" className="block mb-2 font-medium">
                                {getTranslation('reviewedBy', language) || 'Reviewed By'}:
                            </label>
                            <input
                                type="text"
                                id="reviewedBy"
                                name="reviewedBy"
                                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                value={info.reviewedBy || ''}
                                onChange={handleChange}
                                placeholder={getTranslation('enterYourName', language) || 'Enter your name'}
                            />
                        </div>

                        <div>
                            <label htmlFor="rejectionDate" className="block mb-2 font-medium">
                                {getTranslation('rejectionDate', language) || 'Rejection Date'}:
                            </label>
                            <input
                                type="date"
                                id="rejectionDate"
                                name="rejectionDate"
                                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                value={info.rejectionDate || formatDate()}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    );
}
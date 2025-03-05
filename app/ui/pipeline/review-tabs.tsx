'use client';
import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AttemptsTab from '@/app/ui/pipeline/AttemptsTab';
import Box from '@mui/material/Box';
import Calendar from '@/app/ui/pipeline/calendar';
import { Metadata } from 'next';
import { ThemeContext } from '@/app/context/ThemeContext'; // Import ThemeContext
import { updateAttempts, updateQualification } from '@/app/api/queryHandle/fetchApi';
import PersonalInfoPanel from './PersonalInfoPanel';
import QuestionsPanel from './QuestionsPanel';
import Modal from '@/app/ui/pipeline/modal';
import { set } from 'zod';

export const metadata: Metadata = {
    title: "Review Applicant",
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
interface ScheduleInputsProps {
    day: string;
    from: string;
    to: string;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ReviewApplication({
    data,
}: {
    data: any;
}) {
    const [info, setInfo] = useState(data[0]);
    const [ModalMessage, setModalMessage] = useState('');
    const [ModalColor, setModalColor] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState(0);

    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error('ThemeContext must be used within a ThemeProvider');
    }
    const { isDarkMode } = themeContext;
    const [tabClassName, setTabClassName] = useState('text-gray-900');

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const changeData = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInfo((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        setTabClassName(isDarkMode ? 'text-gray-300' : 'text-black');
    }, [isDarkMode]);

    const handleModalUpdate = (message: string) => {
        setModalMessage(message);
        setModalColor('bg-green-500');
        setModalOpen(true);
        setTimeout(() => {
            setModalOpen(false);
            setModalMessage('');
            setModalColor('');
        }, 2000);
    };

    return (
        <>
            <div className="dark:bg-gray-800 transition-colors duration-300 rounded-lg">
                <Box sx={{
                    width: '100%',
                    '& .MuiTabs-root': {
                        backgroundColor: 'inherit'
                    },
                    '& .MuiTab-root': {
                        color: 'inherit'
                    }
                }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} centered aria-label="tabs" indicatorColor='secondary' textColor='secondary' className="dark:text-white">
                            <Tab label="Validate Information" {...a11yProps(0)} className="dark:text-white" />
                            <Tab label="Questions" {...a11yProps(1)} className="dark:text-white" />
                            <Tab label="Schedule Interview" {...a11yProps(2)} className="dark:text-white" />
                            <Tab label="Attempts" {...a11yProps(3)} className="dark:text-white" />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <PersonalInfoPanel data={info} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <QuestionsPanel data={info} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <div className="rounded-md bg-gray-200 p-4 md:p-6 dark:bg-gray-800">
                            <Calendar name={info.name} phone={info.phone} id={info.solicitorId} />
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <div className="rounded-md bg-gray-200 p-4 md:p-6 dark:bg-gray-800">
                            <AttemptsTab
                                initialData={data[0]}
                                onUpdateSuccess={handleModalUpdate}
                            />
                        </div>
                    </CustomTabPanel>
                </Box >
            </div>
            <Modal
                message={ModalMessage}
                color={ModalColor}
                isOpen={isModalOpen} />
        </>
    );
}
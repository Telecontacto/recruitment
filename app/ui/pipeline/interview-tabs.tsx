'use client';
import { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ThemeContext } from '@/app/context/ThemeContext'; // Import ThemeContext
import InterviewQuestions from './questions/InterviewQuestions';
import CallCenterQuestions from './questions/CallCenterQuestions';
import RemoteQuestions from './questions/RemoteQuestions';
import InterviewComments from './questions/InterviewComments';
import ClarificationQuestions from './questions/ClarificationQuestions';
import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/app/translations';
import { montserrat } from '@/app/ui/fonts';
import ExtendedAttemptsTab from './questions/followUpAttempts';
import ExercisesTab from './questions/ExercisesTab';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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
    const [value, setValue] = useState(0);
    const [tabClassName, setTabClassName] = useState('text-gray-900');
    const themeContext = useContext(ThemeContext);
    const isDarkMode = themeContext?.isDarkMode ?? false;

    // Get the language from the context
    const { language } = useLanguage();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const changeData = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInfo((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        setTabClassName(isDarkMode ? 'text-gray-300' : 'text-black');
    }, [isDarkMode]);

    return (
        <div className={`dark:bg-gray-800 dark:text-gray-300 duration-300 rounded-lg ${montserrat.className}`}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} centered aria-label="tabs" indicatorColor='secondary' textColor='inherit' className={tabClassName}>
                        <Tab label={getTranslation("interviewQuestions", language)} {...a11yProps(0)} />
                        <Tab label={getTranslation("callCenterQuestions", language)} {...a11yProps(1)} />
                        <Tab label={getTranslation("clarificationQuestions", language)} {...a11yProps(2)} />
                        <Tab
                            label={getTranslation("remoteQuestions", language)}
                            {...a11yProps(3)}
                            disabled={info.remote === 'No'}
                        />
                        <Tab label={getTranslation("exercises", language) || "Exercises"} {...a11yProps(4)} />
                        <Tab label={getTranslation("interviewComments", language)} {...a11yProps(5)} />
                        <Tab label={getTranslation("extendedAttempts", language) || "Extended Attempts"} {...a11yProps(6)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <InterviewQuestions data={info} onChange={changeData} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <CallCenterQuestions data={info} onChange={changeData} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <ClarificationQuestions data={info} onChange={changeData} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <RemoteQuestions data={info} onChange={changeData} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <ExercisesTab solicitorId={info.solicitorId} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                    <InterviewComments data={info} onChange={changeData} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={6}>
                    <ExtendedAttemptsTab
                        initialData={info}
                        onUpdateInfo={(newInfo) => {
                            setInfo((prevData: any) => ({ ...prevData, ...newInfo }));
                        }}
                        onUpdateSuccess={(message) => {
                            // You can add a notification system here if needed
                            console.log(message);
                        }}
                    />
                </CustomTabPanel>
            </Box>
        </div>
    );
}
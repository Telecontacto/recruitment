'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EditApplicationForm from '@/app/ui/pipeline/edit-form';
import Calendar from '@/app/ui/pipeline/calendar';
import {
    HomeIcon,
    ClockIcon,
    EnvelopeIcon,
    UserCircleIcon,
    PhoneIcon,
    BriefcaseIcon,
    CurrencyDollarIcon,
    KeyIcon,
    PaperAirplaneIcon,
    BuildingOfficeIcon,
    AcademicCapIcon,
    SunIcon,
    BuildingLibraryIcon,
    BookOpenIcon,
    WifiIcon,
    ArrowDownTrayIcon,
    ComputerDesktopIcon,
    MegaphoneIcon
} from '@heroicons/react/24/outline';
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

const ScheduleInputs: React.FC<ScheduleInputsProps> = ({ day, from, to }) => {
    return (
        <div key={day} className='mb-4'>
            <label className='mb-2 block text-sm font-medium'>{day}</label>
            Desde: <input className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" name={`${day}From`} id={`${day}From`} defaultValue={from} />
            Hasta: <input className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" name={`${day}To`} id={`${day}To`} defaultValue={to} />
        </div>
    );
};

export default function ReviewApplication({
    data,
}: {
    data: any;
}) {
    const [info, setInfo] = useState(data[0]);

    //console.log(info)

    const [value, setValue] = useState(0);

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

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} centered aria-label="tabs" indicatorColor='secondary' textColor='secondary'>
                        <Tab label="Validate Information" {...a11yProps(0)} />
                        <Tab label="Questions" {...a11yProps(1)} />
                        <Tab label="Schedule Interview" {...a11yProps(2)} />
                        <Tab label="Attempts" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div className="rounded-md bg-gray-50 p-4 md:p-6">
                        <div className='grid grid-cols-3 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Name
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue={info.Nombre}
                                    />
                                    <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue={info.Celular}
                                    />
                                    <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue={info.Email}
                                    />
                                    <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <fieldset>
                            <legend className="mb-2 block text-lg font-medium">
                                Week Schedule Availability
                            </legend>
                            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                <div className='grid grid-cols-4 gap-2'>
                                    <ScheduleInputs day="Monday" from={info.LunesDesde} to={info.LunesHasta} />
                                    <ScheduleInputs day="Tuesday" from={info.MartesDesde} to={info.MartesHasta} />
                                    <ScheduleInputs day="Wednesday" from={info.MiercolesDesde} to={info.MiercolesHasta} />
                                    <ScheduleInputs day="Thursday" from={info.JuevesDesde} to={info.JuevesHasta} />
                                    <ScheduleInputs day="Friday" from={info.ViernesDesde} to={info.ViernesHasta} />
                                    <ScheduleInputs day="Saturday" from={info.SabadoDesde} to={info.SabadoHasta} />
                                    <ScheduleInputs day="Sunday" from={info.DomingoDesde} to={info.DomingoHasta} />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </CustomTabPanel >
                <CustomTabPanel value={value} index={1}>
                    <div className="rounded-md bg-gray-50 p-4 md:p-6">
                        <div className='grid grid-cols-4 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Salary Requested:
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Do you have Transportation?
                                </label>
                                <div className="relative">
                                    <select
                                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''>
                                        <option value=''>Select an option</option>
                                        <option value='Yes'>Yes</option>
                                        <option value='No'>No</option>
                                    </select>
                                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Do you have a planned trip?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue={info.FechaViaje !== '' ? info.FechaViaje : 'No planned trips'}
                                    />
                                    <PaperAirplaneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Want to work onsite or remotely?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Are you a student?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Do you study onsite or remotely?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Do you study during day or night?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <SunIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Are you bilingual?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Which town do you reside?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Which media did you sent the form?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <MegaphoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="col-span-2" />
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Can you work remotely?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <WifiIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Do you have a computer?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <ComputerDesktopIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    What is your internet speed?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                    />
                                    <ArrowDownTrayIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    How did you hear about us?
                                </label>
                                <div className="relative">
                                    <textarea
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    What caught your attention to work in a call center?
                                </label>
                                <div className="relative">
                                    <textarea
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    What is customer service for you?
                                </label>
                                <div className="relative">
                                    <textarea
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Comments:
                                </label>
                                <div className="relative">
                                    <textarea
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div className="rounded-md bg-gray-50 p-4 md:p-6">
                        <Calendar />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <div className="rounded-md bg-gray-50 p-4 md:p-6">

                    </div>
                </CustomTabPanel>
            </Box >
            <EditApplicationForm id={data[0].id} />
        </div>
    );
}
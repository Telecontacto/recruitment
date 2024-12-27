'use client';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EditApplicationForm from '@/app/ui/pipeline/edit-form'
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
    BookOpenIcon
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
    //console.log(data)

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} centered aria-label="tabs" indicatorColor='secondary' textColor='secondary'>
                        <Tab label="Validate Information" {...a11yProps(0)} />
                        <Tab label="Questions" {...a11yProps(1)} />
                        <Tab label="Schedule Interview" {...a11yProps(2)} />
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
                                        defaultValue={data[0].Nombre}
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
                                        defaultValue={data[0].Celular}
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
                                        defaultValue={data[0].Email}
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
                                    <ScheduleInputs day="Monday" from={data[0].LunesDesde} to={data[0].LunesHasta} />
                                    <ScheduleInputs day="Tuesday" from={data[0].MartesDesde} to={data[0].MartesHasta} />
                                    <ScheduleInputs day="Wednesday" from={data[0].MiercolesDesde} to={data[0].MiercolesHasta} />
                                    <ScheduleInputs day="Thursday" from={data[0].JuevesDesde} to={data[0].JuevesHasta} />
                                    <ScheduleInputs day="Friday" from={data[0].ViernesDesde} to={data[0].ViernesHasta} />
                                    <ScheduleInputs day="Saturday" from={data[0].SabadoDesde} to={data[0].SabadoHasta} />
                                    <ScheduleInputs day="Sunday" from={data[0].DomingoDesde} to={data[0].DomingoHasta} />
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
                                        readOnly
                                    />
                                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Do you have Transportation?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                        readOnly
                                    />
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
                                        defaultValue={data[0].FechaViaje}
                                        readOnly
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
                                        defaultValue={data[0].FechaViaje}
                                        readOnly
                                    />
                                    <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Are you a student?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue=''
                                        readOnly
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
                                        readOnly
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
                                        defaultValue={data[0].FechaViaje}
                                        readOnly
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
                                        defaultValue={data[0].FechaViaje}
                                        readOnly
                                    />
                                    <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <fieldset>
                            <legend className="mb-2 block text-lg font-medium">
                                Week Schedule Availability
                            </legend>
                            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                <div className='grid grid-cols-4 gap-2'>
                                    <ScheduleInputs day="Monday" from={data[0].LunesDesde} to={data[0].LunesHasta} />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div className="rounded-md bg-gray-50 p-4 md:p-6">
                        <fieldset>
                            <legend className="mb-2 block text-lg font-medium">
                                Languages
                            </legend>
                            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                <div className='grid grid-cols-7 grid-rows-5 gap-2 text-center'>
                                    <div>

                                    </div>
                                    <div className="mb-4 col-span-3 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            Spanish
                                        </label>
                                    </div>
                                    <div className="mb-4 col-span-3 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            English
                                        </label>
                                    </div>
                                    <div>

                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            Fluent
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            Good
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            Regular
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            Fluent
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            Good
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            Regular
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            I speak
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].HablaEspanol === 'Con fluidez'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].HablaEspanol === 'Bien'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].HablaEspanol === 'Regular'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].HablaIngles === 'Con fluidez'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].HablaIngles === 'Bien'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].HablaIngles === 'Regular'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            I Write
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].EscribeEspanol === 'Con fluidez'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].EscribeEspanol === 'Bien'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].EscribeEspanol === 'Regular'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].EscribeIngles === 'Con fluidez'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].EscribeIngles === 'Bien'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].EscribeIngles === 'Regular'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium">
                                            I Read
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].LeeEspanol === 'Con fluidez'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].LeeEspanol === 'Bien'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].LeeEspanol === 'Regular'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].LeeIngles === 'Con fluidez'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].LeeIngles === 'Bien'}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4 border">
                                        <input
                                            type='radio'
                                            defaultChecked={data[0].LeeIngles === 'Regular'}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className='mt-4'>
                            <legend className="mb-2 block text-lg font-medium">
                                Education
                            </legend>
                            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                <div className='grid grid-cols-4 grid-rows-4 gap-2 text-center'>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Level of Education
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Name of Institution & Direction
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Grade Obtained & Concentration
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Did you graduate?
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            High School
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].nombreSuperior}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].gradoSuperior}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].graduoSuperior}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            University
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].nombreUniversidad}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].gradoUniversidad}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].graduoUniversidad}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Other Education
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].nombreOtro}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].gradoOtro}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].graduoOtro}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </CustomTabPanel>
            </Box >
            <EditApplicationForm id={data[0].id} />
        </div>
    );
}
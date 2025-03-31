'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
    HomeIcon,
    ClockIcon,
    EnvelopeIcon,
    UserCircleIcon,
    PhoneIcon,
    BriefcaseIcon,
    DocumentIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';
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

export default function ViewApplication({
    data,
}: {
    data: any;
}) {
    //console.log(data)
    const availabilityWeek: any[] = [{
        "Monday": `${data[0].LunesDesde} - ${data[0].LunesHasta}`,
        "Tuesday": `${data[0].MartesDesde} - ${data[0].MartesHasta}`,
        "Wednesday": `${data[0].MiercolesDesde} - ${data[0].MiercolesHasta}`,
        "Thursday": `${data[0].JuevesDesde} - ${data[0].JuevesHasta}`,
        "Friday": `${data[0].ViernesDesde} - ${data[0].ViernesHasta}`,
        "Saturday": `${data[0].SabadoDesde} - ${data[0].SabadoHasta}`,
        "Sunday": `${data[0].DomingoDesde} - ${data[0].DomingoHasta}`,
    }];
    const date = new Date(data[0].Fecha).toLocaleString('default', { month: "2-digit", day: "2-digit", year: "numeric" })
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const isPDF = (filename: string) => {
        return filename?.toLowerCase().endsWith('.pdf');
    };

    return (
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
                        <Tab label="Personal Information" {...a11yProps(0)} className="dark:text-white" />
                        <Tab label="Work & Hours Information" {...a11yProps(1)} className="dark:text-white" />
                        <Tab label="Languages & Education" {...a11yProps(2)} className="dark:text-white" />
                        <Tab label="Previous Employments" {...a11yProps(3)} className="dark:text-white" />
                        <Tab label="Test Questions" {...a11yProps(4)} className="dark:text-white" />
                        <Tab label="Resume" {...a11yProps(5)} className="dark:text-white" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div className="rounded-md bg-gray-200 dark:bg-gray-700 p-4 md:p-6">
                        <div className='grid grid-cols-4 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium dark:text-white">
                                    Name
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                        defaultValue={data[0].Nombre}
                                        readOnly
                                    />
                                    <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium dark:text-white">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                        defaultValue={data[0].Celular}
                                        readOnly
                                    />
                                    <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium dark:text-white">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                        defaultValue={data[0].Email}
                                        readOnly
                                    />
                                    <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium dark:text-white">
                                    Date of Application
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={date}
                                            readOnly
                                        />
                                        <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 block text-lg font-medium dark:text-white">
                                Physical Address
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                        defaultValue={data[0].Direccion}
                                        readOnly
                                    />
                                    <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium dark:text-white">
                                    Are you a minor?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                        defaultValue={data[0].Menor}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium dark:text-white">
                                    Have you ever been convicted?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                        defaultValue={data[0].Convicto}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <fieldset>
                                <legend className="mb-2 block text-lg font-medium dark:text-white">
                                    Emergency Contact
                                </legend>
                                <div className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-[14px] py-3">
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="peer block cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                                defaultValue={data[0].ParentezcoContactoEmergencia}
                                                readOnly
                                            />
                                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Phone Number
                                        </label>
                                        <div className="relative mt-2 rounded-md">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                                    defaultValue={data[0].TelEmergencia}
                                                    readOnly
                                                />
                                                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="mb-2 block text-lg font-medium dark:text-white">
                                    Family Members
                                </legend>
                                <div className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-[14px] py-3">
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Do you have family members currently working with us?
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="peer block cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                                defaultValue={data[0].Familiares}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Name / Kinship of family member (if answered yes)
                                        </label>
                                        <div className="relative mt-2 rounded-md">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                                    defaultValue={data[0].PuestoFamiliar}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="mb-2 block text-lg font-medium dark:text-white">
                                    Field Trip
                                </legend>
                                <div className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-[14px] py-3">
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Do you have any trips planned in the next few months?
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="peer block cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                                defaultValue={data[0].Viaje}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Date of the trip (if answered yes)
                                        </label>
                                        <div className="relative mt-2 rounded-md">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                                    defaultValue={data[0].FechaViaje}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </CustomTabPanel >
                <CustomTabPanel value={value} index={1}>
                    <div className="rounded-md bg-gray-200 dark:bg-gray-700 p-4 md:p-6">
                        <div className='grid grid-cols-2 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium dark:text-white">
                                    Position you are applying for
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                        defaultValue={data[0].PuestoSolicitado}
                                        readOnly
                                    />
                                    <BriefcaseIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium dark:text-white">
                                    Date you would be available to start
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                        defaultValue={data[0].FechaDisponibilidad}
                                        readOnly
                                    />
                                    <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <fieldset>
                            <legend className="mb-2 block text-lg font-medium dark:text-white">
                                Week Schedule Availability
                            </legend>
                            <div className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-[14px] py-3">
                                <div className='grid grid-cols-4 gap-2'>
                                    {Object.entries(availabilityWeek[0]).map(([k, v]) => (
                                        <div key={k} className='mb-4'>
                                            <label className='mb-2 block text-sm font-medium dark:text-white'>{k}</label>
                                            <p>{v as string}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div className="rounded-md bg-gray-200 dark:bg-gray-700 p-4 md:p-6">
                        <fieldset>
                            <legend className="mb-2 block text-lg font-medium dark:text-white">
                                Languages
                            </legend>
                            <div className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-[14px] py-3">
                                <div className='grid grid-cols-7 grid-rows-5 gap-2 text-center'>
                                    <div>

                                    </div>
                                    <div className="mb-4 col-span-3 border">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Spanish
                                        </label>
                                    </div>
                                    <div className="mb-4 col-span-3 border">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            English
                                        </label>
                                    </div>
                                    <div>

                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Fluent
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Good
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Regular
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Fluent
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Good
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Regular
                                        </label>
                                    </div>
                                    <div className="mb-4 border">
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
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
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
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
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
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
                            <legend className="mb-2 block text-lg font-medium dark:text-white">
                                Education
                            </legend>
                            <div className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-[14px] py-3">
                                <div className='grid grid-cols-4 grid-rows-4 gap-2 text-center'>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Level of Education
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Name of Institution & Direction
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Grade Obtained & Concentration
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Did you graduate?
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            High School
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].nombreSuperior}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].gradoSuperior}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].graduoSuperior}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            University
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].nombreUniversidad}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].gradoUniversidad}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].graduoUniversidad}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Other Education
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].nombreOtro}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].gradoOtro}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].graduoOtro}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <div className="rounded-md bg-gray-200 dark:bg-gray-700 p-4 md:p-6">
                        <fieldset>
                            <legend className="mb-2 block text-lg font-medium dark:text-white">
                                Past Employments
                            </legend>
                            <div className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-[14px] py-3">
                                <div className='grid grid-cols-4 grid-rows-8 gap-2 text-center'>
                                    <div>

                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            First Employment
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Second Employment
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Third Employment
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Company's Name
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Compania1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Compania2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Compania3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Supervisor's Name
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Supervisor1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Supervisor2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Supervisor3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Supervisor's Phone Number
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Telefono1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Telefono2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Telefono3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Company's Address
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Direccion1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Direccion2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Direccion3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Date of Employment
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Empleo1Desde}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Empleo2Desde}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Empleo3Desde}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Name of Position
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Titulo1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Titulo2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Titulo3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Reason of Termination
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].RazonTerminar1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].RazonTerminar2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].RazonTerminar3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium dark:text-white">
                                            Date of Employment
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Responsabilidades1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Responsabilidades2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            defaultValue={data[0].Responsabilidades3}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <div className="rounded-md bg-gray-200 dark:bg-gray-700 p-4 md:p-6">
                        <h2 className="text-xl font-bold mb-6 dark:text-white">Test Questions and Answers</h2>

                        {/* Part 1: Grammar and Orthography */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
                                <PencilSquareIcon className="h-5 w-5 mr-2" />
                                PART 1: Grammar and Orthography
                            </h3>
                            <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-300 dark:border-gray-600">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {data[0].Gramatica1 && (
                                        <>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">1. comunicasion</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica1 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">2. tranferensia</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica2 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">3. facturasion</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica3 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">4. renobasion</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica4 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">5. resivio</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica5 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">6. cuviertas</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica6 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">7. responsabilidad</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica7 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">8. polisa</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica8 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">9. atrabez</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica9 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">10. organisasiones</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica10 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">11. elejivle</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica11 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">12. cooperatiba</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica12 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">13. agente</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica13 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">14. finnansiamiento</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica14 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">15. interrez</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica15 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">16. recivido</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica16 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">17. acecta</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica17 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">18. prohivido</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica18 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">19. rio-piedra-haight</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica19 || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">20. esfuerso</p>
                                                <p className="font-medium dark:text-white">{data[0].Gramatica20 || "N/A"}</p>
                                            </div>
                                        </>
                                    )}
                                    {!data[0].Gramatica1 && (
                                        <div className="col-span-3 text-center py-6 dark:text-gray-400">
                                            <p>No grammar test data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Part 2: Case Discussion */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
                                <PencilSquareIcon className="h-5 w-5 mr-2" />
                                PART 2: Case Discussion
                            </h3>

                            {/* Case 1 */}
                            <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-300 dark:border-gray-600 mb-4">
                                <h4 className="font-medium text-lg mb-3 dark:text-white">Call #1</h4>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                        1. An upset and angry customer calls, indicating that they were provided with incorrect information.
                                        The customer wishes to make a complaint, is saying profanities, and is yelling on the phone.
                                    </p>
                                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                        <p className="text-sm dark:text-white">{data[0].Ejercicio1_1 || "No answer provided"}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                        2. An indignant customer calls because an incorrect amount was debited from their checking account.
                                        The customer is upset and wants to speak to a supervisor.
                                    </p>
                                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                        <p className="text-sm dark:text-white">{data[0].Ejercicio1_2 || "No answer provided"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Case 2 */}
                            <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-300 dark:border-gray-600">
                                <h4 className="font-medium text-lg mb-3 dark:text-white">Call #2</h4>

                                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                    <p className="mb-2">
                                        Javier Pérez has been a SolCorp customer for 3 months. He has always made his payments by phone.
                                        He indicates that he is upset and disappointed with the company because he paid on time at the payment office
                                        and yet his service was suspended. He comments that if the situation is not resolved,
                                        he will be canceling his service with the company.
                                    </p>
                                    <p className="mb-1 font-medium">Data for the service representative:</p>
                                    <ul className="list-disc pl-5">
                                        <li>Phone payment is reflected automatically, but payment through a kiosk takes two business days if made after 3pm</li>
                                        <li>The system indicates that the customer paid at 4pm</li>
                                        <li>Payment evidence must be submitted in person</li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                        1. Taking into account the information provided, how would you explain to Mr. Pérez
                                        the reason why his service was suspended?
                                    </p>
                                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                        <p className="text-sm dark:text-white">{data[0].Ejercicio2_1 || "No answer provided"}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                        2. The customer claims to have a receipt provided by the payment kiosk showing that
                                        the transaction took place at 2pm. How would you explain the procedure to follow to the customer?
                                    </p>
                                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                        <p className="text-sm dark:text-white">{data[0].Ejercicio2_2 || "No answer provided"}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                        3. The customer indicates that since they cannot resolve his situation immediately,
                                        he will be canceling the service. How would you handle the situation?
                                    </p>
                                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                        <p className="text-sm dark:text-white">{data[0].Ejercicio2_3 || "No answer provided"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={5}>
                    <div className="rounded-md bg-gray-200 dark:bg-gray-700 p-4 md:p-6">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="mb-4">
                                <h2 className="text-lg font-medium mb-4 dark:text-white">Application Document</h2>
                                {data[0].nombreDocumento ? (
                                    <div className="space-y-4">
                                        {isPDF(data[0].nombreDocumento) ? (
                                            <iframe
                                                src={`https://reports.telecontacto.com/reclutamiento/resume/${data[0].nombreDocumento.startsWith(data[0].ID)
                                                    ? `${data[0].ID}-${data[0].nombreDocumento}`
                                                    : data[0].nombreDocumento
                                                    }`}
                                                className="w-full h-[600px] border-2 border-gray-300 rounded-lg"
                                                title="Document Preview"
                                            />
                                        ) : (
                                            <div className="text-center py-8 dark:text-gray-400">
                                                <DocumentIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                                <p>Preview not available for this file type</p>
                                                <p className="text-sm text-gray-500">Click download to view the document</p>
                                            </div>
                                        )}
                                        <div className="flex justify-end">
                                            <a
                                                href={`https://reports.telecontacto.com/reclutamiento/resume/${data[0].ID}-${data[0].nombreDocumento}`}
                                                download
                                                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                            >
                                                <DocumentIcon className="h-5 w-5 mr-2" />
                                                Download Document
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 dark:text-gray-400">
                                        <DocumentIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                        <p>No documents available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CustomTabPanel>
            </Box >
        </div>
    );
}

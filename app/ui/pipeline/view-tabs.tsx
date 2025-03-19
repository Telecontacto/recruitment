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
    DocumentIcon
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
                        <Tab label="Resume" {...a11yProps(4)} className="dark:text-white" />
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

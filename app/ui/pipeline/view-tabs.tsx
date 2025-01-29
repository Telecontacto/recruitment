'use client';
import * as React from 'react';
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
    BriefcaseIcon
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
    console.log(data)
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

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} centered aria-label="tabs" indicatorColor='secondary' textColor='secondary'>
                        <Tab label="Personal Information" {...a11yProps(0)} />
                        <Tab label="Work & Hours Information" {...a11yProps(1)} />
                        <Tab label="Languages & Education" {...a11yProps(2)} />
                        <Tab label="Previous Employments" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div className="rounded-md bg-gray-200 p-4 md:p-6">
                        <div className='grid grid-cols-4 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Name
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue={data[0].Nombre}
                                        readOnly
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
                                        readOnly
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
                                        readOnly
                                    />
                                    <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Date of Application
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={date}
                                            readOnly
                                        />
                                        <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 block text-lg font-medium">
                                Physical Address
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue={data[0].Direccion}
                                        readOnly
                                    />
                                    <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Are you a minor?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue={data[0].Menor}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Have you ever been convicted?
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue={data[0].Convicto}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <fieldset>
                                <legend className="mb-2 block text-lg font-medium">
                                    Emergency Contact
                                </legend>
                                <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium">
                                            Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="peer block cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                                defaultValue={data[0].ParentezcoContactoEmergencia}
                                                readOnly
                                            />
                                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium">
                                            Phone Number
                                        </label>
                                        <div className="relative mt-2 rounded-md">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
                                <legend className="mb-2 block text-lg font-medium">
                                    Family Members
                                </legend>
                                <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium">
                                            Do you have family members currently working with us?
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="peer block cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                                defaultValue={data[0].Familiares}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium">
                                            Name / Kinship of family member (if answered yes)
                                        </label>
                                        <div className="relative mt-2 rounded-md">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                                    defaultValue={data[0].PuestoFamiliar}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="mb-2 block text-lg font-medium">
                                    Field Trip
                                </legend>
                                <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium">
                                            Do you have any trips planned in the next few months?
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="peer block cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                                defaultValue={data[0].Viaje}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium">
                                            Date of the trip (if answered yes)
                                        </label>
                                        <div className="relative mt-2 rounded-md">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
                    <div className="rounded-md bg-gray-200 p-4 md:p-6">
                        <div className='grid grid-cols-2 gap-2'>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Position you are applying for
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue={data[0].PuestoSolicitado}
                                        readOnly
                                    />
                                    <BriefcaseIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-lg font-medium">
                                    Date you would be available to start
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        defaultValue={data[0].FechaDisponibilidad}
                                        readOnly
                                    />
                                    <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <fieldset>
                            <legend className="mb-2 block text-lg font-medium">
                                Week Schedule Availability
                            </legend>
                            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                <div className='grid grid-cols-4 gap-2'>
                                    {Object.entries(availabilityWeek[0]).map(([k, v]) => (
                                        <div key={k} className='mb-4'>
                                            <label className='mb-2 block text-sm font-medium'>{k}</label>
                                            <p>{v as string}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div className="rounded-md bg-gray-200 p-4 md:p-6">
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
                <CustomTabPanel value={value} index={3}>
                    <div className="rounded-md bg-gray-200 p-4 md:p-6">
                        <fieldset>
                            <legend className="mb-2 block text-lg font-medium">
                                Past Employments
                            </legend>
                            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                                <div className='grid grid-cols-4 grid-rows-8 gap-2 text-center'>
                                    <div>

                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            First Employment
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Second Employment
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Third Employment
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Company's Name
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Compania1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Compania2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Compania3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Supervisor's Name
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Supervisor1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Supervisor2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Supervisor3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Supervisor's Phone Number
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Telefono1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Telefono2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Telefono3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Company's Address
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Direccion1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Direccion2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Direccion3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Date of Employment
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Empleo1Desde}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Empleo2Desde}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Empleo3Desde}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Name of Position
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Titulo1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Titulo2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Titulo3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Reason of Termination
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].RazonTerminar1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].RazonTerminar2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].RazonTerminar3}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className="mb-2 block text-sm font-medium">
                                            Date of Employment
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Responsabilidades1}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Responsabilidades2}
                                            readOnly
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <input
                                            className="peer block w-full cursor-text rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                            defaultValue={data[0].Responsabilidades3}
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
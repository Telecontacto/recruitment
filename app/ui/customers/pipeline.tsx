'use client';
import clsx from 'clsx';
import { montserrat } from '@/app/ui/fonts';
import { useState, useEffect } from "react";
import { Stages, StageData } from '@/app/lib/definitions';
import Modal, { DeleteModal, HireRejectedModal } from '@/app/ui/pipeline/modal';
import {
    TrashIcon
} from '@heroicons/react/24/outline';
import { PipelineSkeleton } from '@/app/ui/skeletons';

export function Pipeline({
    title,
    stageNumber,
    res,
    step,
    onDragStart,
    onDrop,
    currentUser,
    userRole,
    dateRange,
}: {
    title: string;
    stageNumber: string;
    step: string;
    res: Array<{
        id: number;
        nombre: string;
        statussolicitud: string;
        printed: string;
        entrevistador: string;
        Fecha: string;
    }>;
    onDragStart: (item: any) => void;
    onDrop: (stage: string) => void;
    currentUser: string;
    userRole: string;
    dateRange: { startDate: string | null; endDate: string | null };
}) {
    // Filter items based on date range for "Received" and "Hired/Rejected" pipes
    const filteredRes = (title === "Received" || title === "Hired/Rejected") && (dateRange.startDate || dateRange.endDate)
        ? res.filter(item => {
            const itemDate = new Date(item.Fecha);
            const startDateFilter = dateRange.startDate ? new Date(dateRange.startDate) : null;
            const endDateFilter = dateRange.endDate ? new Date(dateRange.endDate) : null;

            // Set time to beginning/end of day for more accurate comparison
            if (startDateFilter) startDateFilter.setHours(0, 0, 0, 0);
            if (endDateFilter) {
                endDateFilter.setHours(23, 59, 59, 999);
            }

            // Check if date is within range
            const isAfterStart = startDateFilter ? itemDate >= startDateFilter : true;
            const isBeforeEnd = endDateFilter ? itemDate <= endDateFilter : true;

            return isAfterStart && isBeforeEnd;
        })
        : res;

    return (
        <>
            <div
                className="stage overflow-y-auto bg-white dark:bg-gray-800"
                onDragOver={(e) => e.preventDefault()} // Allow drop
                onDrop={() => onDrop(stageNumber)} // Use stageNumber instead of title
            >
                <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>{title}</h2>
                <div className="applications">
                    {filteredRes.map((item) => {
                        // Check if user has permission to interact with this application
                        const isAdmin = userRole === 'admin';
                        const isAssigned = currentUser === item.entrevistador;
                        const hasPermission = isAdmin || isAssigned;
                        if (title === "Hired/Rejected") {
                            if (item.statussolicitud === "5") {
                                step = "view_print"
                            } else {
                                step = "view_rejected"
                            }
                        }
                        return (
                            <div
                                key={item.id}
                                draggable={hasPermission ? "true" : "false"}
                                className={clsx(
                                    'applicant',
                                    'bg-gray-50',
                                    {
                                        'dark:bg-gray-600': item.statussolicitud !== '0' && item.statussolicitud !== '5',
                                        'applicant-hired': item.statussolicitud === '5',
                                        'applicant-rejected': item.statussolicitud === '0',
                                        'cursor-not-allowed': !hasPermission,
                                        'cursor-grab': hasPermission,
                                        'opacity-70': !hasPermission && !isAdmin // Dim cards that user can't interact with
                                    }
                                )}
                                onDragStart={() => hasPermission && onDragStart(item)} // Only allow drag if authorized
                            >
                                {hasPermission ? (
                                    <a href={`/dashboard/pipeline/${item.id}/${step}`} target='_blank' rel='noreferrer'>
                                        <div className="text-right text-sm text-gray-500 dark:text-gray-300">
                                            {title === "Received" && (() => {
                                                const date = new Date(item.Fecha);
                                                const now = new Date();
                                                const diff = now.getTime() - date.getTime();
                                                const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
                                                const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
                                                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                                                const hours = Math.floor(diff / (1000 * 60 * 60));
                                                const minutes = Math.floor(diff / (1000 * 60));

                                                if (months > 0) return `${months}mo ago`;
                                                if (weeks > 0) return `${weeks}w ago`;
                                                if (days > 0) return `${days}d ago`;
                                                if (hours > 0) return `${hours}h ago`;
                                                if (minutes > 0) return `${minutes}m ago`;
                                                return 'Just now';
                                            })()}
                                        </div>
                                        <strong>
                                            Name: {item.nombre} <br />
                                            Interviewer: {item.entrevistador} <br />
                                            {item.printed === "NO" && (
                                                <span className="text-red-500"> *</span>
                                            )}
                                        </strong>
                                    </a>
                                ) : (
                                    // No link for unauthorized users
                                    <div className="pointer-events-none">
                                        <div className="text-right text-sm text-gray-500">
                                            {item.Fecha}
                                        </div>
                                        <strong>
                                            Name: {item.nombre} <br />
                                            Interviewer: {item.entrevistador} <br />
                                            {item.printed === "NO" && (
                                                <span className="text-red-500"> *</span>
                                            )}
                                        </strong>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export function BlankPipeline({
    title,
}: {
    title: string;
}) {
    return (
        <div className="stage bg-gray-200 dark:bg-gray-800">
            <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>{title}</h2>
        </div>
    );
}

export function Pipelines({
    results,
    session,
    dateRange,
}: {
    results: any,
    session: any,
    dateRange: { startDate: string; endDate: string }, // Accept date range from props
},
) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isHRModalOpen, setHRModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [interviewerFilter, setInterviewerFilter] = useState('');
    const [uniqueInterviewers, setUniqueInterviewers] = useState<string[]>([]);
    const [filteredResults, setFilteredResults] = useState(results);
    const closeDeleteModal = () => setModalOpen(false);
    const closeHRModal = () => setModalOpen(false);
    const [stages, setStages] = useState<Stages>({
        Received: [],
        "In Review": [],
        Interview: [],
        Offered: [],
        "Hired/Rejected": [],
    });
    const [draggedItem, setDraggedItem] = useState<any>(null);
    const [dragID, setDragID] = useState('')
    const [ModalMessage, setModalMessage] = useState('')
    const [ModalColor, setModalColor] = useState('')

    // Remove the internal date range state since we're using props now

    // Extract unique interviewers from results
    useEffect(() => {
        if (results) {
            const interviewers = results
                .map((item: any) => item.entrevistador)
                .filter((value: string, index: number, self: string[]) =>
                    value && self.indexOf(value) === index)
                .sort();
            setUniqueInterviewers(interviewers);
        }
    }, [results]);

    useEffect(() => {
        if (results) {
            const filtered = results.filter((item: any) => {
                const nameMatch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
                const interviewerMatch = !interviewerFilter || item.entrevistador === interviewerFilter;
                return nameMatch && interviewerMatch;
            });
            setFilteredResults(filtered);
            loadData(filtered);
        }
    }, [results, searchTerm, interviewerFilter]);

    // Remove the date range handlers since they're handled in the Form component

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleInterviewerFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInterviewerFilter(e.target.value);
    };

    const handleDragStart = (item: any) => {
        setDraggedItem(item);
        setDragID(item.id)
    };

    const handleDrop = (stage: string) => {
        if (draggedItem) {
            if (draggedItem.statussolicitud !== stage) {
                // Update backend
                if (stage === "5") { // Changed from "Hired/Rejected" to "5"
                    setHRModalOpen(true)
                } else {
                    fetch(`/api/update?stage=${stage}&ID=${draggedItem.id}`, {
                        method: "POST",
                    }).then((response) => {
                        if (!response.ok) {
                            // Handle the case where the response is not OK (e.g., 400, 500 errors)
                            throw new Error('Error in API response');
                        }
                        return response.json();  // Parse the response body as JSON
                    })
                        .then((data) => {
                            console.log('API response data:', data);
                        })
                        .catch((error) => {
                            console.error('Error occurred during fetch:', error);
                        });
                    setModalMessage('Applicant Status Updated Successfully');
                    setModalColor('bg-green-500');
                    setModalOpen(true);
                    setTimeout(() => {
                        setModalOpen(false);
                        setModalMessage('');
                        setModalColor('');
                    }, 2000);

                    let oldData = [...results];
                    let updateData = oldData.findIndex(item => item.id === dragID)
                    oldData[updateData].statussolicitud = stage;
                    let newData = [...oldData]

                    loadData(newData)
                }
                setDraggedItem(null);
            }
        }
    };

    const loadData = (data: any) => {
        const updatedStages: Stages = {
            Received: [],
            "In Review": [],
            Interview: [],
            Offered: [],
            "Hired/Rejected": [],
        };

        data.forEach((item: { id: number; nombre: string; statussolicitud: string, printed: string, entrevistador: string, Fecha: string; }) => {
            switch (item.statussolicitud) {
                case "1":
                    updatedStages.Received.push(item);
                    break;
                case "2":
                    updatedStages["In Review"].push(item);
                    break;
                case "3":
                    updatedStages.Interview.push(item);
                    break;
                case "4":
                    updatedStages.Offered.push(item);
                    break;
                case "5":
                case "0":
                    updatedStages["Hired/Rejected"].push(item);
                    break;
                default:
                    break;
            }
        });
        setStages(updatedStages);
    }

    const handleTrashDrop = () => {
        if (draggedItem) {
            //console.log(`User wants to delete applicant with ID: ${draggedItem.id}`);
            setModalMessage('Applicant Deleted Successfully');
            setModalColor('bg-red-500');
            setDeleteModalOpen(true)
            setDraggedItem(null);
        }
    };

    const validateDelete = async (choice: string) => {
        if (choice === "Confirm") {
            try {
                await fetch(`/api/delete?ID=${dragID}`, {
                    method: "POST",
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error('Error in API response');
                    }
                    return response.json();
                });

                let oldData = [...results];
                let removeData = oldData.findIndex(item => item.id === dragID)
                oldData.splice(removeData, 1);
                let newData = [...oldData]
                loadData(newData)
            } catch (error) {
                console.error('Error occurred during deletion:', error);
            }
        }
        setDeleteModalOpen(false);
        setModalOpen(true); setTimeout(() => {
            setModalOpen(false);
            setModalMessage('');
            setModalColor('');
        }, 2000);
    };

    const validateAnswer = async (choice: string) => {
        if (choice === "Cancel") return setHRModalOpen(false);
        try {
            await fetch(`/api/update?stage=${choice}&ID=${dragID}`, {
                method: "POST",
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Error in API response');
                }
                return response.json();
            });
            setHRModalOpen(false);

            setModalMessage('Applicant Status Updated Successfully');
            setModalColor('bg-green-500');
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
                setModalMessage('');
                setModalColor('');
            }, 2000);

            let oldData = [...results];
            let updateData = oldData.findIndex(item => item.id === dragID)
            oldData[updateData].statussolicitud = choice;
            let newData = [...oldData]
            const updatedStages: Stages = {
                Received: [],
                "In Review": [],
                Interview: [],
                Offered: [],
                "Hired/Rejected": [],
            };

            newData.forEach((item: { id: number; nombre: string; statussolicitud: string, printed: string, entrevistador: string, Fecha: string; }) => {
                switch (item.statussolicitud.toLowerCase()) {
                    case "1":
                        updatedStages.Received.push(item);
                        break;
                    case "2":
                        updatedStages["In Review"].push(item);
                        break;
                    case "3":
                        updatedStages.Interview.push(item);
                        break;
                    case "4":
                        updatedStages.Offered.push(item);
                        break;
                    case "5":
                    case "0":
                        updatedStages["Hired/Rejected"].push(item);
                        break;
                    default:
                        break;
                }
            });
            setStages(updatedStages);
        } catch (error) {
            console.error('Error occurred during deletion:', error);
        }
    };

    if (!results) {
        return (
            <div className="stages text-center bg-gray-200">
                <PipelineSkeleton />
                <PipelineSkeleton />
                <PipelineSkeleton />
                <PipelineSkeleton />
                <PipelineSkeleton />
            </div>
        )
    }

    return (
        <>
            <div className="mb-4 flex items-center gap-4 justify-center flex-wrap">
                <div className="flex items-center gap-2">
                    <label htmlFor="search" className="block text-sm font-medium text-lg">
                        Search by name
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder='Search...'
                            id='search'
                            name='search'
                            value={searchTerm}
                            onChange={handleSearch}
                            className="rounded-md border border-gray-300 p-2 pl-10 bg-white text-black dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="interviewer" className="block text-sm font-medium text-lg">
                        Filter by interviewer
                    </label>
                    <select
                        id="interviewer"
                        name="interviewer"
                        value={interviewerFilter}
                        onChange={handleInterviewerFilter}
                        className="rounded-md border border-gray-300 p-2 bg-white text-black dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">All Interviewers</option>
                        {uniqueInterviewers.map((interviewer) => (
                            <option key={interviewer} value={interviewer}>
                                {interviewer}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Remove date range controls from here as they're now in the Form component */}
            </div>
            <div className="stages text-center bg-gray-200">
                <div
                    className="trash-icon h-10 w-10 text-red-500"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleTrashDrop}
                >
                    <TrashIcon />
                </div>
                <Pipeline
                    title="Received"
                    stageNumber="1"
                    res={stages.Received}
                    step="view-applicant"
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                    currentUser={session?.user?.name}
                    userRole={session?.user?.role}
                    dateRange={{
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate
                    }}
                />
                <Pipeline
                    title="In Review"
                    stageNumber="2"
                    res={stages["In Review"]}
                    step="review-applicant"
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                    currentUser={session?.user?.name}
                    userRole={session?.user?.role}
                    dateRange={{
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate
                    }}
                />
                <Pipeline
                    title="Interview"
                    stageNumber="3"
                    res={stages.Interview}
                    step="interview-applicant"
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                    currentUser={session?.user?.name}
                    userRole={session?.user?.role}
                    dateRange={{
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate
                    }}
                />
                <Pipeline
                    title="Offered"
                    stageNumber="4"
                    res={stages.Offered}
                    step="view_empleo"
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                    currentUser={session?.user?.name}
                    userRole={session?.user?.role}
                    dateRange={{
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate
                    }}
                />
                <Pipeline
                    title="Hired/Rejected"
                    stageNumber="5"
                    res={stages["Hired/Rejected"]}
                    step="view_print"
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                    currentUser={session?.user?.name}
                    userRole={session?.user?.role}
                    dateRange={{
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate
                    }}
                />
            </div>
            <Modal isOpen={isModalOpen} color={ModalColor} message={ModalMessage} />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                validateDelete={validateDelete}
            />
            <HireRejectedModal
                isOpen={isHRModalOpen}
                onClose={closeHRModal}
                validateAnswer={validateAnswer}
            />
        </>
    );
}




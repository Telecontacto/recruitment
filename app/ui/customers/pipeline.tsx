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
    stageNumber, // Add this new prop
    res,
    step,
    onDragStart,
    onDrop,
}: {
    title: string;
    stageNumber: string; // Add this type
    step: string;
    res: Array<{
        id: number;
        nombre: string;
        statussolicitud: string;
        printed: string;
    }>;
    onDragStart: (item: any) => void;
    onDrop: (stage: string) => void;
}) {
    return (
        <>
            <div
                className="stage overflow-y-auto bg-white dark:bg-gray-800"
                onDragOver={(e) => e.preventDefault()} // Allow drop
                onDrop={() => onDrop(stageNumber)} // Use stageNumber instead of title
            >
                <h2 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>{title}</h2>
                <div className="applications">
                    {res.map((item) => (
                        <div
                            key={item.id}
                            draggable="true"
                            className={clsx(
                                'applicant',
                                'bg-gray-50',
                                {
                                    'dark:bg-gray-600': item.statussolicitud !== '0' && item.statussolicitud !== '5',
                                    'applicant-hired': item.statussolicitud === '5',
                                    'applicant-rejected': item.statussolicitud === '0',
                                }
                            )}
                            onDragStart={() => onDragStart(item)} // Start dragging
                        >
                            <a href={`/dashboard/pipeline/${item.id}/${step}`} target='_blank' rel='noreferrer'>
                                <strong>
                                    {item.nombre}
                                    {item.printed === "NO" && (
                                        <span className="text-red-500"> *</span>
                                    )}
                                </strong>
                            </a>
                        </div>
                    ))}
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
    results
}: {
    results: any
},
) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isHRModalOpen, setHRModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
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

    const [data, setData] = useState(results);

    console.log('results:', results);

    useEffect(() => {
        if (results) {
            const filtered = results.filter((item: any) =>
                item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredResults(filtered);
            loadData(filtered);
        }
    }, [results, searchTerm]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
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

        data.forEach((item: { id: number; nombre: string; statussolicitud: string, printed: string; }) => {
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

            newData.forEach((item: { id: number; nombre: string; statussolicitud: string, printed: string; }) => {
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
            <div className="mb-4 flex items-center gap-2 justify-center">
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
                />
                <Pipeline
                    title="In Review"
                    stageNumber="2"
                    res={stages["In Review"]}
                    step="review-applicant"
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                />
                <Pipeline
                    title="Interview"
                    stageNumber="3"
                    res={stages.Interview}
                    step="interview-applicant"
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                />
                <Pipeline
                    title="Offered"
                    stageNumber="4"
                    res={stages.Offered}
                    step="view_empleo"
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                />
                <Pipeline
                    title="Hired/Rejected"
                    stageNumber="5"
                    res={stages["Hired/Rejected"]}
                    step="view_empleo"
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
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




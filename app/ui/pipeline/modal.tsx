import { useState, useEffect } from "react";
import { ModalProps, DeleteModalProps, HRModalProps } from '@/app/lib/definitions';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { montserrat } from '@/app/ui/fonts'

export default function Modal({ isOpen, color, message }: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Match the duration of the fade-out transition
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null; // Prevent rendering when the modal is hidden

    return (
        <div
            className={`${montserrat.className} fixed bottom-4 right-4 z-50 max-w-sm overflow-hidden rounded-lg ${color} shadow-lg transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                }`}
            role="alert"
        >
            <div className="w-full px-4 py-3">
                <h3 className="text-base font-semibold text-white">
                    {message}
                </h3>
            </div>
        </div>
    );
}

export function DeleteModal({ isOpen, onClose, validateDelete }: DeleteModalProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className={`${montserrat.className} fixed inset-0 z-10 w-screen overflow-y-auto`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Delete Applicant
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this applicant?
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => validateDelete("Confirm")}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => validateDelete("Cancel")}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export function HireRejectedModal({ isOpen, onClose, validateAnswer }: HRModalProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className={`${montserrat.className} fixed inset-0 z-10 w-screen overflow-y-auto`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Is this Applicant hired or rejected?
                                    </DialogTitle>
                                </div>
                                <button
                                    onClick={() => validateAnswer("Cancel")}
                                    className="absolute top-2 right-2 text-black hover:text-gray-500"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => validateAnswer("Hired")}
                                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black sm:ml-3 sm:w-auto"
                            >
                                Hired
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => validateAnswer("Rejected")}
                                className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-200 hover:text-black sm:mt-0 sm:w-auto"
                            >
                                Rejected
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}



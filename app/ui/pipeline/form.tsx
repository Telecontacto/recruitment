'use client'; // Ensure this runs on the client side
import { useState } from 'react';
import { montserrat } from '@/app/ui/fonts';
//import { Button } from '@/app/ui/button';
import { Pipelines, BlankPipeline } from "@/app/ui/customers/pipeline";
import { PipelineSkeleton } from '@/app/ui/skeletons';
import { submitHandler, addApplicant } from '@/app/api/queryHandle/fetchApi';
import Modal, { CreateApplicantModal } from '@/app/ui/pipeline/modal';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Form() {
  const [results, setResults] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalMessage, setModalMessage] = useState('')
  const [ModalColor, setModalColor] = useState('')


  const handleSubmit = async (start: string, end: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await submitHandler({ startDate: start, endDate: end }, '/api');
      if (data) {
        setResults(data);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateApplicant = async (applicant: any) => {
    try {
      const result = await addApplicant(applicant);

      if (result.ok) {
        setIsModalOpen(true);
        setModalMessage('Applicant created successfully');
        setModalColor('bg-green-600');

        // Wait for the modal to show before refreshing data
        setTimeout(async () => {
          if (startDate && endDate) {
            await handleSubmit(startDate, endDate);
          }
          setIsModalOpen(false);
          setModalMessage('');
          setModalColor('');
        }, 2000);
      }
    } catch (error) {
      setError((error as Error).message);
      setIsModalOpen(true);
      setModalMessage('Error creating applicant');
      setModalColor('bg-red-600');
      setTimeout(() => {
        setIsModalOpen(false);
        setModalMessage('');
        setModalColor('');
      }, 3000);
    }
  };

  const handleDateChange = (start: string, end: string) => {
    const startMonth = start ? new Date(start).getMonth() + 1 : null;
    const endMonth = end ? new Date(end).getMonth() + 1 : null;

    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      handleSubmit(start, end);
    }
    return true;
  };

  const refreshData = () => {
    if (startDate && endDate) {
      handleSubmit(startDate, endDate);
    }
  };

  return (
    <div className={`rounded-md bg-gray-200 p-4 md:p-6 ${montserrat.className}`}>
      <div className="flex justify-between items-center mb-4">
        <form onSubmit={(e) => {
          e.preventDefault();
        }}>
          <div className="mb-4">
            <label htmlFor="date-range" className="mb-2 block text-sm font-medium text-lg">
              Select Date Range
            </label>
            <div className="relative flex gap-2">
              <input
                id="start-date"
                name="start-date"
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange(e.target.value, endDate)}
                className="rounded-md border p-2 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600"
              />
              <span className="self-center">to</span>
              <input
                id="end-date"
                name="end-date"
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange(startDate, e.target.value)}
                className="rounded-md border p-2 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600"
              />
              <button
                onClick={refreshData}
                className="rounded-md px-3 py-2 text-sm font-semibold hover:text-gray-500 dark:text-white shadow-sm dark:hover:text-gray-800"
                type="button"
              >
                <ArrowPathIcon className="w-6 h-6" />
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </form>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
        >
          Add Applicant
        </button>
      </div>
      {!startDate && !endDate && !isLoading ? (
        <div className="stages text-center bg-gray-200">
          <BlankPipeline title='Received' />
          <BlankPipeline title='In Review' />
          <BlankPipeline title='Interview' />
          <BlankPipeline title='Offered' />
          <BlankPipeline title='Hired/Rejected' />
        </div>
      ) : (
        <Pipelines results={results} />
      )}
      <CreateApplicantModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateApplicant}
      />
      <Modal
        isOpen={isModalOpen}
        color={ModalColor}
        message={ModalMessage}
      />
    </div>
  );
}

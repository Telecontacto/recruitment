'use client'; // Ensure this runs on the client side
import { useState } from 'react';
import { montserrat } from '@/app/ui/fonts';
//import { Button } from '@/app/ui/button';
import { Pipelines, BlankPipeline } from "@/app/ui/customers/pipeline";
import { PipelineSkeleton } from '@/app/ui/skeletons';
import { submitHandler } from '@/app/api/queryHandle/fetchApi';
import { CreateApplicantModal } from './modal';

export default function Form() {
  const [results, setResults] = useState<any>(null);
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSubmit = async (value: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null); // Clear the data to show the skeleton

    try {
      const data = await submitHandler(value, '/api');
      setResults(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateApplicant = async (applicant: any) => {
    try {
      // Add your API call here to create the applicant
      console.log('Creating applicant:', applicant);
      // Refresh the results after creating
      if (date) {
        await handleSubmit(date);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className={`rounded-md bg-gray-200 p-4 md:p-6 ${montserrat.className}`}>
      <div className="flex justify-between items-center mb-4">
        <form onSubmit={(e) => {
          e.preventDefault();
        }}>
          {/* Choose a Month */}
          <div className="mb-4">
            <label htmlFor="date" className="mb-2 block text-sm font-medium text-lg">
              Choose a Month
            </label>
            <div className="relative">
              <input
                id="date"
                name="date"
                type="month"
                onChange={(e) => {
                  const newDate = e.target.value;
                  setDate(e.target.value);
                  handleSubmit(newDate);
                }}
                className="rounded-md border p-2 mb-4 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 calendar-input"
              />
            </div>
          </div>
        </form>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          Add Applicant
        </button>
      </div>
      {!date && !isLoading ? (
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
    </div>
  );
}

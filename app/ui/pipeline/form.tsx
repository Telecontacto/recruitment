'use client'; // Ensure this runs on the client side
import { useState } from 'react';
import { montserrat } from '@/app/ui/fonts';
//import { Button } from '@/app/ui/button';
import { Pipelines, BlankPipeline } from "@/app/ui/customers/pipeline";
import { PipelineSkeleton } from '@/app/ui/skeletons';
import { submitHandler } from '@/app/api/queryHandle/fetchApi';

export default function Form() {
  const [results, setResults] = useState<any>(null);
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className={`rounded-md bg-gray-200 p-4 md:p-6 ${montserrat.className}`}>
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
              className="peer block cursor-text rounded-md border border-gray-200 py-2 pl-10 bg-white text-black dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </form>
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
    </div>
  );
}

'use client'; // Ensure this runs on the client side
import { useState } from 'react';
import { montserrat } from '@/app/ui/fonts';
//import { Button } from '@/app/ui/button';
import { Pipelines } from "@/app/ui/customers/pipeline";
import { submitHandler } from '@/app/api/queryHandle/fetchApi';

export default function Form() {
  const [results, setResults] = useState<any>(null);
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (value: string) => {
    setIsLoading(true);
    setError(null);

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
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
      }}>
        <div className={`rounded-md bg-gray-50 p-4 md:p-6 ${montserrat.className}`}>
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
                className="peer block cursor-text rounded-md border border-gray-200 py-2 pl-10"
              />
            </div>
          </div>
          {/* <Button type="submit">Submit</Button> */}
        </div>
      </form>
      <Pipelines results={results} />
    </>
  );
}

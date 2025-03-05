'use client';
import { useState } from 'react';
import { assignRecruiter } from '@/app/api/queryHandle/fetchApi';
import Modal from '@/app/ui/pipeline/modal';

interface EditApplicationFormProps {
  id: number;
  interviewer: string;
}

export default function EditApplicationForm({ id, interviewer }: EditApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Modal configuration
  const [ModalMessage, setModalMessage] = useState('');
  const [ModalColor, setModalColor] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const normalizeValue = (value: string) => value?.toLowerCase();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const recruiter = e.target.value;
    if (!recruiter) return;

    setLoading(true);
    setError(null);

    try {
      await assignRecruiter(id, recruiter);
      setModalMessage('Recruiter assigned successfully');
      setModalColor('bg-green-500');
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        setModalMessage('');
        setModalColor('');
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to assign recruiter');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log('interviewer:', interviewer, 'normalized:', normalizeValue(interviewer));
  return (
    <>
      <div className="rounded-md p-4 md:p-6">
        <div className='grid grid-cols-2 gap-2'>
          <div></div>
          <div className="mb-4">
            <label htmlFor="recruiter" className="mb-2 block text-sm font-medium">
              Assign Recruiter
            </label>
            <div className="relative">
              <select
                id="recruiter"
                name="recruiter"
                onChange={handleChange}
                disabled={loading}
                value={normalizeValue(interviewer) || ''}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:placeholder-gray-500"
              >
                <option value="">Select</option>
                <option value="aroman">Angélica Román</option>
                <option value="nrodriguez">Nandelis Rodríguez</option>
                <option value="rmorales">Rose Morales</option>
                <option value="atorres">Ambar Torres</option>
              </select>
              {loading && (
                <span className="absolute right-2 top-2 text-sm text-gray-500">
                  Saving...
                </span>
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>
      <Modal
        message={ModalMessage}
        color={ModalColor}
        isOpen={isModalOpen} />
    </>
  );
}

'use client';
import {
  HomeIcon,
  ClockIcon,
  EnvelopeIcon,
  UserCircleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditApplicationForm({
  id,
}: {
  id: number;
}) {
  return (
    <form>
      <div className="rounded-md p-4 md:p-6">
        <div className='grid grid-cols-2 gap-2'>
          <div></div>
          <div className="mb-4">
            <label htmlFor="Name" className="mb-2 block text-sm font-medium">
              Assign Recruiter
            </label>
            <div className="relative">
              <select
                id="customer"
                name="customerId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="">
                  Select
                </option>
                <option value="Angélica Román">
                  Angélica Román
                </option>
                <option value="Nandelis Rodríguez">
                  Nandelis Rodríguez
                </option>
                <option value="Rose Morales">
                  Rose Morales
                </option>
                <option value="Yalitza González">
                  Yalitza González
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/pipeline"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  );
}

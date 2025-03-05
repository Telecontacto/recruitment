'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'), // Make sure this is being passed from your form
      callbackUrl: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Invalid credentials.';
    }
    throw error;
  }
}

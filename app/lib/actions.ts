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
      redirectTo: '/dashboard',
      redirect: true,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Invalid credentials.';
    }
    throw error;
  }
}

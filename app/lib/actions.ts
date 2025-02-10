'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    // If we get here, sign-in was successful
    redirect('/dashboard');
    
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Invalid credentials.';
    }
    throw error;
  }
}

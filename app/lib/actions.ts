'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('Starting authentication process');
    const email = formData.get('email');
    const password = formData.get('password');
    
    console.log('Attempting sign in with email:', email);
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/dashboard'
    });

    console.log('Sign in result:', {
      ok: result?.ok,
      error: result?.error,
      status: result?.status,
    });

    return 'Success'; // This line won't execute if redirect is successful

  } catch (error) {
    if (error instanceof Error) {
      console.error('Detailed authentication error:', {
        name: error.name,
        message: error.message,
        type: error instanceof AuthError ? error.type : 'Unknown',
        stack: error.stack
      });
    } else {
      console.error('Unknown error:', error);
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return `Authentication error: ${error.type}`;
      }
    }
    // Don't throw NEXT_REDIRECT error
    if (error.message.includes('NEXT_REDIRECT')) {
      return undefined;
    }
    return error instanceof Error ? `System error: ${error.message}` : 'Unknown system error';
  }
}

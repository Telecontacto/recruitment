import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { handlers } from '@/auth';

export const { GET, POST } = handlers;

// Add explicit OPTIONS handler for CSRF
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, OPTIONS',
    },
  });
}

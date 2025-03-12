import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { getConnection } from '@/app/lib/db';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { sha256 } from 'js-sha256';

// Define custom types
type UserWithRole = User & {
  role: string;
  lastName: string;
};

declare module 'next-auth' {
  interface User extends UserWithRole {}
  interface Session {
    user: UserWithRole;
  }
}

async function getUser(email: string): Promise<UserWithRole | undefined> {
  try {
    console.log('Attempting to fetch user with email:', email);
    const pool = await getConnection();
    console.log('Database connection established');
    
    const result = await pool
      .request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');
    
    console.log('Query result:', {
      rowCount: result.recordset.length,
      hasUser: !!result.recordset[0],
      userData: result.recordset[0] ? {
        id: result.recordset[0].id,
        email: result.recordset[0].email,
        hasPassword: !!result.recordset[0].password,
      } : null
    });
    
    return result.recordset[0];
  } catch (error) {
    console.error('Database error in getUser:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    } else {
      throw new Error('Failed to fetch user: Unknown error');
    }
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('Starting authorization process');
        const parsedCredentials = z
          .object({ 
            email: z.string().email(), 
            password: z.string().min(6) 
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Credential validation failed:', parsedCredentials.error.errors);
          return null;
        }

        try {
          const { email, password } = parsedCredentials.data;
          console.log('Fetching user for email:', email);
          const user = await getUser(email);

          if (!user) {
            console.log('No user found with email:', email);
            return null;
          }

          console.log('User found, checking password');
          console.log('Input password (hashed):', sha256(password));
          console.log('Stored password:', user.password);
          
          // Try both direct comparison and bcrypt
          const directMatch = sha256(password) === user.password;
          const bcryptMatch = await bcrypt.compare(sha256(password), user.password);
          
          console.log('Password comparison results:', {
            directMatch,
            bcryptMatch,
            inputLength: password.length,
            storedPassLength: user.password.length
          });

          if (!directMatch && !bcryptMatch) {
            console.log('Password mismatch for user:', email);
            return null;
          }

          console.log('Authentication successful, returning user data');
          return {
            id: user.id.toString(),
            name: user.name + ' ' + user.lastName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            role: user.role,
          };
          
        } catch (error) {
          if (error instanceof Error) {
            console.error('Detailed authorization error:', {
              message: error.message,
              stack: error.stack,
              name: error.name
            });
          } else {
            console.error('Detailed authorization error:', {
              message: 'Unknown error',
              stack: 'N/A',
              name: 'Unknown'
            });
          }
          return null;
        }
      },
    }),
  ]
});
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { getConnection } from '@/app/lib/db';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { sha256 } from 'js-sha256';

async function getUser(email: string): Promise<User | undefined> {
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
            name: user.name,
            email: user.email,
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
  ],
  // Add CSRF configuration
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  debug: true, // Enable debug messages
});
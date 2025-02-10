import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && nextUrl.pathname === '/login') {
        // Redirect logged in users to dashboard if they try to access login page
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  events: {
    signOut: async () => {
      // Clear any additional client-side state here if needed
    },
  },
  providers: [],
} satisfies NextAuthConfig;
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect unathenticated users to login page
      } else if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', request.nextUrl));
      }
  },
  },
  providers: []
} satisfies NextAuthConfig;
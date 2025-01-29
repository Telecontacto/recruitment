'use client';
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider, useTheme } from '@/app/context/ThemeContext';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#e51e25'
    }
  }
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AppRouterCacheProvider>
          <MuiThemeProvider theme={theme}>
            <ThemeProvider>
              <Content>{children}</Content>
            </ThemeProvider>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode) {
      if (storedMode === 'true' && !isDarkMode) {
        toggleTheme();
      } else if (storedMode === 'false' && isDarkMode) {
        toggleTheme();
      }
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? `${inter.className} antialiased dark` : `${inter.className} antialiased light`;
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <div>
      {children}
    </div>
  );
}

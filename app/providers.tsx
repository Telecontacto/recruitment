'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#e51e25'
        }
    }
});

function ThemeAwareContent({ children }: { children: React.ReactNode }) {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        // Use a more specific class name to avoid conflicts
        const baseClasses = 'antialiased';
        document.body.className = isDarkMode
            ? `${baseClasses} dark-theme`
            : `${baseClasses} light-theme`;
    }, [isDarkMode]);

    return <div suppressHydrationWarning>{children}</div>;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider>
                    <LanguageProvider>
                        <ThemeAwareContent>{children}</ThemeAwareContent>
                    </LanguageProvider>
                </ThemeProvider>
            </MuiThemeProvider>
        </AppRouterCacheProvider>
    );
}

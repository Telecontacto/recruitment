import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Providers } from './providers';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`(function() {
              try {
                let theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  localStorage.setItem('theme', theme);
                }
                document.documentElement.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
              } catch (e) {
                console.log('Theme initialization error:', e);
              }
            })()`}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

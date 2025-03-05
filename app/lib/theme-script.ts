export const themeScript = `
  (function() {
    let theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })()
`;

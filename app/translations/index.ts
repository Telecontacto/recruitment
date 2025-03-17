export const translations = {
  en: {
    dashboard: 'Dashboard',
    invoices: 'Invoices',
    customers: 'Customers',
    revenue: 'Revenue',
    navDash: 'Home',
    navPipeline: 'Pipeline',
    navCalendar: 'Calendar',
    navReport: 'Reports',
    navSignOut: 'Sign Out',
    applicationReceived: 'Total Application Received',
    interviewQuestions: 'Interview Questions',
    callCenterQuestions: 'Call Center Questions',
    clarificationQuestions: 'Clarification Questions',
    remoteQuestions: 'Remote Questions',
    interviewComments: 'Interview Comments',
    welcome: 'Welcome',
    
    // Add more translations as needed
  },
  es: {
    dashboard: 'Panel',
    invoices: 'Facturas',
    customers: 'Clientes',
    revenue: 'Ingresos',
    navDash: 'Inicio',
    navPipeline: 'Canalización',
    navCalendar: 'Calendario',
    navReport: 'Reportes',
    navSignOut: 'Cerrar sesión',
    applicationReceived: 'Total de Solicitudes Recibidas',
    interviewQuestions: 'Preguntas de Entrevista',
    callCenterQuestions: 'Preguntas de Centro de Llamadas',
    clarificationQuestions: 'Preguntas de Aclaración',
    remoteQuestions: 'Preguntas para Remotos',
    interviewComments: 'Comentarios de Entrevista',
    welcome: 'Bienvenido',

    // Add more translations as needed
  }
};

export function getTranslation(key: string, language: string) {
  return translations[language as keyof typeof translations][key as keyof typeof translations['en']] || key;
}

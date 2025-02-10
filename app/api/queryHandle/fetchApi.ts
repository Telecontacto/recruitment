export const submitHandler = async (
  value: string,
  endpoint: string,
): Promise<any> => {
  if (!value) {
    alert('Please select a date');
    return;
  }

  try {
    const response = await fetch(`${endpoint}?startDate=${value}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchApplicant = async (
  value: string,
  endpoint: string,
): Promise<any> => {
  try {
    const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
    : '';

    const response = await fetch(`${baseUrl}${endpoint}?id=${encodeURIComponent(value)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchCalendarAppointments = async (
  month: number,
  year: number
): Promise<any> => {
  try {
    const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
    : '';

    const response = await fetch(`${baseUrl}/api/calendarAppointments?month=${month}&year=${year}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const insertCalendarAppointment = async (
  name: string,
  phone: string,
  date: string,
  time: string
): Promise<any> => {
  try {
    const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
    : '';

    const response = await fetch(`${baseUrl}/api/calendarAppointments/insert?name=${name}&phone=${phone}&date=${date}&time=${time}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Error inserting data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

export async function fetchCardData(date: string): Promise<any> {
  try {
    const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
    : '';
    const response = await fetch(`${baseUrl}/api/cards?startDate=${date}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function fetchUserAuthentication(formData: FormData): Promise<any> {
  try {
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
      : '';
      
    const response = await fetch(`${baseUrl}/api/auth?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export function signOut(): void {
  try {
        // Handle successful sign out, e.g., redirect to login page
        window.location.href = '/login';
     
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}
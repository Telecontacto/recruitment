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
export async function submitHandler(
  dateRange: { startDate: string, endDate: string },
  endpoint: string,
) {
  const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
    : '';

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dateRange),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

export const fetchApplicant = async (
  value: string,
  endpoint: string,
): Promise<any> => {
  try {
    const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
    : '';

    //console.log(`${baseUrl}${endpoint}?id=${encodeURIComponent(value)}`);

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
  time: string,
  id: number
): Promise<any> => {
  try {
    const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
    : '';

    const response = await fetch(`${baseUrl}/api/calendarAppointments/insert?name=${name}&phone=${phone}&date=${date}&time=${time}&id=${id}`, {
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

export async function fetchCardData(startDate: string, endDate: string): Promise<any> {
  try {
    const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
    : '';
    console.log('fetchCardData:', { startDate, endDate });
    const response = await fetch(
      `${baseUrl}/api/cards?startDate=${startDate}&endDate=${endDate}`,
      { method: 'GET' }
    );

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

export async function fetchAttempts(phone: string): Promise<any> {
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
      : '';
      
    const response = await fetch(`${baseUrl}/api/attempts?phone=${encodeURIComponent(phone)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching attempts: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching attempts:', error);
    throw error;
  }
}

export async function updateAttempts(
  attemptNumber: number, 
  status: string, 
  notes: string,
  id: number
): Promise<any> {
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
      : '';
      
    const response = await fetch(`${baseUrl}/api/attempts/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attemptNumber,
        status,
        notes,
        id
      })
    });

    if (!response.ok) {
      throw new Error(`Error updating attempts: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating attempts:', error);
    throw error;
  }
}

export async function updateQualification(
  status: string,
  reason: string,
  id: number,
  campaign: string
): Promise<any> {
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
      : '';
      
    const response = await fetch(`${baseUrl}/api/qualification/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        reason,
        id,
        campaign
      })
    });

    if (!response.ok) {
      throw new Error(`Error updating qualification: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating qualification:', error);
    throw error;
  }
}

export async function updatePersonalInfo(solicitorId: string, data: any) {
    console.log('Starting updatePersonalInfo:', { solicitorId, data });
    try {
        const baseUrl = typeof window === 'undefined' 
            ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
            : '';
        
        const url = `${baseUrl}/api/applicants/${solicitorId}/personal-info`;
        console.log('Making request to:', url);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            console.error('Request failed:', {
                status: response.status,
                statusText: response.statusText
            });
            throw new Error('Failed to update personal info');
        }

        const result = await response.json();
        console.log('Request successful:', result);
        return result;
    } catch (error) {
        console.error('Error in updatePersonalInfo:', error);
        throw error;
    }
}

export async function updateQuestions(solicitorId: string, data: any) {
    console.log('Starting updateQuestions:', { solicitorId, data });
    try {
        const url = `/api/applicants/${solicitorId}/questions`;
        console.log('Making request to:', url);
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            console.error('Request failed:', {
                status: response.status,
                statusText: response.statusText
            });
            throw new Error('Failed to update questions');
        }

        const result = await response.json();
        console.log('Request successful:', result);
        return result;
    } catch (error) {
        console.error('Error in updateQuestions:', error);
        throw error;
    }
}

export async function updateInterviewQuestions(solicitorId: string, route: any, data: any) {
  console.log(`Starting update${route}Questions:`, { solicitorId, data });
  try {
      const url = `/api/applicants/${solicitorId}/onsite-question/${route}`;
      console.log('Making request to:', url);
      
      const response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
          console.error('Request failed:', {
              status: response.status,
              statusText: response.statusText
          });
          throw new Error('Failed to update questions');
      }

      const result = await response.json();
      console.log('Request successful:', result);
      return result;
  } catch (error) {
      console.error('Error in updateInterviewQuestions:', error);
      throw error;
  }
}

export async function assignRecruiter(applicantId: number, recruiter: string): Promise<any> {
  console.log('Starting assignRecruiter:', { applicantId, recruiter });
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
      : '';
    
    const url = `${baseUrl}/api/assignRecruiter`;
    console.log('Making request to:', url);
          
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        applicantId,
        recruiter,
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();

    if (!response.ok) {
      console.error('Request failed:', {
        status: response.status,
        statusText: response.statusText,
        data
      });
      throw new Error(data.error || `Error assigning recruiter: ${response.status}`);
    }

    console.log('Request successful:', data);
    return data;
  } catch (error) {
    console.error('Error in assignRecruiter:', error);
    throw error;
  }
}

export async function addApplicant(data: any): Promise<any> {
  console.log('Starting addApplicant:', data);
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
      : '';
    
    const url = `${baseUrl}/api/applicants/createApplicant`;
    console.log('Making request to:', url);
          
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),  // This sends the data as JSON in the request body
    });

    console.log('Response status:', response.status);
    const responseData = await response.json();

    if (!response.ok) {
      console.error('Request failed:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      });
      throw new Error(responseData.error || `Error adding applicant: ${response.status}`);
    }

    console.log('Request successful:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error in addApplicant:', error);
    throw error;
  }
}

type ReportDataItem = {
  date: string;
  metric: string;
  value: number;
  // Add more properties as needed
};

export async function fetchReportData(startDate: string, endDate: string): Promise<ReportDataItem[]> {
  // In a real application, this would be a call to your database or API
  // For now, we'll return mock data
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock data based on date range
    const start = new Date(startDate);
    const end = new Date(endDate);
    const data: ReportDataItem[] = [];
    
    // Create a data point for each day in range
    const currentDate = new Date(start);
    while (currentDate <= end) {
      data.push({
        date: currentDate.toISOString().split('T')[0],
        metric: 'Sales',
        value: Math.floor(Math.random() * 1000),
      });
      
      data.push({
        date: currentDate.toISOString().split('T')[0],
        metric: 'Visitors',
        value: Math.floor(Math.random() * 5000),
      });
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data;
    
  } catch (error) {
    console.error('Failed to fetch report data:', error);
    throw new Error('Failed to fetch report data');
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
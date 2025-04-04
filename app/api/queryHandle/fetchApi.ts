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
  recruiter: string,
  id: number
): Promise<any> => {
  try {
    const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
    : '';

    const response = await fetch(`${baseUrl}/api/calendarAppointments/insert?name=${name}&phone=${phone}&date=${date}&time=${time}&recruiter=${recruiter}&id=${id}`, {
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

export const updateCalendarAppointment = async (
  updateData: any
): Promise<any> => {
  try {
    const baseUrl = typeof window === 'undefined' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
    : '';

    const response = await fetch(`${baseUrl}/api/calendarAppointments/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Status: updateData.Status,
        ID: updateData.ID
      })
    });

    if (!response.ok) {
      throw new Error(`Error updating data: ${response.status} ${response.statusText}`);
    }

    if(updateData.Status === 'reschedule') {
      const insertResponse = await fetch(`${baseUrl}/api/calendarAppointments/insert?name=${updateData.NombreCitado}&phone=${updateData.Telefono}&date=${updateData.Fecha}&time=${updateData.Hora}&recruiter=${updateData.CitadoA}&id=${updateData.ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!insertResponse.ok) {
        throw new Error(`Error inserting data: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating data:', error);
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
  date: string,
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
        date,
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

export async function updateExcercises(data: any) {
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
      : '';
      
    const response: Response = await fetch(`${baseUrl}/api/interviewPipeline/excercises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data
      })
    });

    if (!response.ok) {
      throw new Error(`Error updating qualification: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error updating qualification:', error);
    throw error;
  }
}

export async function updateFollowUp(
  attemptNumber: number, 
  status: string, 
  notes: string,
  date: string,
  id: number
): Promise<any> {
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
      : '';
      
    const response = await fetch(`${baseUrl}/api/interviewPipeline/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attemptNumber,
        status,
        notes,
        date,
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

export async function updateQualificationFollowUp(
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

export async function fetchReportData(startDate?: string, endDate?: string): Promise<any> {
  try {
    const baseUrl = typeof window === 'undefined' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' 
      : '';

    // If no startDate is provided, calculate date from 2 days ago
    if (!startDate) {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      startDate = twoDaysAgo.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
    
    // If no endDate is provided, use current date
    if (!endDate) {
      endDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
    
    // List of recruiters to include in the report
    const recruiters = ['Ambar Torres', 'Rose Morales', 'Nandelis Rodríguez', 'Deliz Cordero']; // Add or modify recruiters as needed
    
    const response = await fetch(`${baseUrl}/api/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        endDate,
        recruiters
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching report data:', error);
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
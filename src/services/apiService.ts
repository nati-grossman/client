const BASE_URL = 'https://localhost:7177';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchDataOptions {
  method?: RequestMethod;
  body?: any;
  timeout?: number;
}

const fetchData = async <T>(endpoint: string, method: RequestMethod = 'GET', body: any = null, timeout: number = 5000): Promise<T> => {
  const token = localStorage.getItem('token');

  const controller = new AbortController();

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const options: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: body ? JSON.stringify(body) : null,
    signal: controller.signal,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error: unknown) {
    console.error('API call failed:', error);

    // Type guard to check if the error is an instance of Error
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Request was aborted due to timeout');
      }
    } else {
      console.error('An unknown error occurred');
    }

    throw error;
  }
};


// Helper functions for making GET, POST, PUT, DELETE requests
export const getData = <T>(endpoint: string): Promise<T> => fetchData(endpoint, 'GET');
export const postData = <T>(endpoint: string, data: any): Promise<T> => fetchData(endpoint, 'POST', data);
export const putData = <T>(endpoint: string, data: any): Promise<T> => fetchData(endpoint, 'PUT', data);
export const deleteData = <T>(endpoint: string): Promise<T> => fetchData(endpoint, 'DELETE');

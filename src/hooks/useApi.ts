import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// This type can handle both our custom ApiResponse and Axios responses
type ApiMethod<T, P> = (params?: P) => Promise<AxiosResponse<T> | ApiResponse<T>>;

/**
 * Custom hook to handle API calls with loading, error, and data states
 */
function useApi<T, P = any>(apiMethod: ApiMethod<T, P>) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (params?: P) => {
      try {
        setState({ data: null, loading: true, error: null });
        const response = await apiMethod(params);
        
        // Handle both our ApiResponse and Axios response formats
        const data = 'data' in response ? 
          // If it's an Axios response
          (response as AxiosResponse<T>).data : 
          // If it's our custom ApiResponse
          (response as ApiResponse<T>).data;
          
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error });
        throw error;
      }
    },
    [apiMethod]
  );

  return {
    ...state,
    execute,
    // Reset the state
    reset: useCallback(() => {
      setState({ data: null, loading: false, error: null });
    }, []),
  };
}

export default useApi; 
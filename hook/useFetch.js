import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient'; // Đảm bảo bạn nhập đúng đường dẫn tới file chứa apiClient

export default function useFetch(url, config = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient({ url, ...config });
        setData(response.data);
      } catch (err) {
        if (err.response) {
          setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {

          setError('No response received from server');
        } else {

          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return { data, loading, error };
}

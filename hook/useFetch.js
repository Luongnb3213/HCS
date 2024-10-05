import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

export default function useFetch(url, config = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sử dụng axios với config truyền vào, mặc định là GET nếu không có config method
        const response = await axios({ url, ...config });
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(`Axios error: ${err.message}`);
        } else {
          setError(`General error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function (nếu cần)
    return () => {
      // Xử lý cleanup nếu cần thiết
    };
  }, [url, config]);

  return { data, loading, error };
}

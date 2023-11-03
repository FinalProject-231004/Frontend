import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Quiz } from '@/types/homeQuiz';

export const useFetchQuiz = (url: string) => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    let cancelRequest = false;
    const cancelToken = axios.CancelToken.source();

    const fetchQuiz = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: cancelToken.token,
        });
        if (!cancelRequest) {
          setQuiz(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelRequest) {
          setError(error as AxiosError);
        }
      }
    };

    fetchQuiz();

    return () => {
      cancelRequest = true;
      cancelToken.cancel();
    };
  }, [url]);

  return { quiz, loading, error };
};
export default useFetchQuiz;

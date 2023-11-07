import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Quiz } from '@/types/homeQuiz';

export const useFetchQuiz = (url: string) => {
  const cache: { [key: string]: Quiz[] } = {};
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (cache[url]) {
      setQuiz(cache[url]);
      setLoading(false);
      return;
    }

    let cancelRequest = false;
    const cancelToken = axios.CancelToken.source();

    const fetchQuiz = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: cancelToken.token,
        });
        if (!cancelRequest) {
          cache[url] = response.data; // 응답을 캐시에 저장합니다.
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

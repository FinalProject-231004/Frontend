import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Quiz } from '@/types/home';

const useFetchQuiz = (url: string) => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(url);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching quiz from ${url}:`, error);
        setError(error as AxiosError);
      }
    };

    fetchQuiz();
  }, [url]);

  return { quiz, loading, error };
};

export default useFetchQuiz;

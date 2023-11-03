import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Quiz } from '@/types/homeQuiz';

const quizCache: Record<string, Quiz[]> = {};

export const useFetchQuiz = (url: string) => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (quizCache[url]) {
        setQuiz(quizCache[url]);
        setLoading(false);
      } else {
        try {
          const response = await axios.get(url);
          const data = response.data;
          quizCache[url] = data;
          setQuiz(data);
          setLoading(false);
        } catch (error) {
          setError(error as AxiosError);
        }
      }
    };

    fetchQuiz();
  }, [url]);

  return { quiz, loading, error };
};

export default useFetchQuiz;

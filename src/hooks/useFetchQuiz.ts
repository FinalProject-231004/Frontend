import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { QuizData } from '@/types/home';

const useFetchQuiz = (url: string) => {
  const [quiz, setQuiz] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null); // 상태 타입을 AxiosError로 수정

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(url);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching quiz from ${url}:`, error);
        setError(error as AxiosError); // 에러 타입을 AxiosError로 변환
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [url]);

  return { quiz, loading, error };
};

export default useFetchQuiz;

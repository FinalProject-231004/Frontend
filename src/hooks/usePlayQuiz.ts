import { getAPI } from '@/apis/axios';
import { playQuizAtom } from '@/recoil/atoms/questionAtom';
import { PlayQuiz } from '@/types/questionTypes';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const usePlayQuiz = (id: number) => {
  const [questions, setQuestions] = useRecoilState<PlayQuiz[]>(playQuizAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAPI(`/api/quiz/quizQuestion/${id}`);
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        }
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { questions, loading };
};
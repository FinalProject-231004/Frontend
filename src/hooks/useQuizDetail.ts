import { useQuery } from 'react-query';
import { QuizDetail } from '@/types/homeQuiz';
import axios from 'axios';

export const useQuizDetail = (quizId: number) => {
  return useQuery<QuizDetail>(['quizDetail', quizId], async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/${quizId}`,
    );
    return data;
  });
};

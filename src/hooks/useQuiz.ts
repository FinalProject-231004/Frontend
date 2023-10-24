import { useQuery } from 'react-query';

const fetchQuiz = async (quizId: number) => {
  const response = await fetch(`/api/quiz/${quizId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useQuiz = (quizId: number) => {
  return useQuery(['quiz', quizId], () => fetchQuiz(quizId));
};

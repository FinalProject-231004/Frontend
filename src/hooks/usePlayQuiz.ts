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
          // 선택지 정보에 choiceId 값을 추가합니다.
          const updatedQuestions = response.data.map(question => ({
            ...question,
            quizChoices: question.quizChoices.map(
              (choice: { choiceId: number }) => ({
                ...choice,
                choiceId: choice.choiceId,
              }),
            ),
          }));
          setQuestions(updatedQuestions);
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

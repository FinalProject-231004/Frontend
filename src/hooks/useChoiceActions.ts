import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { questionAtom } from '@/recoil/atoms/questionAtom';
import { warningToast } from '@/utils/customtoast';

export const useChoiceActions = () => {
  const [questions, setQuestions] = useRecoilState(questionAtom);

  const addChoice = (questionId: string) => {
    const newChoiceId = uuidv4();
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === questionId
          ? {
              ...q,
              choices: [
                ...q.choices,
                {
                  id: newChoiceId,
                  text: '',
                  isAnswer: false,
                },
              ],
            }
          : q,
      ),
    );
  };

  const removeChoice = (questionId: string, choiceId: string) => {
    const targetQuestion = questions.find(q => q.id === questionId);

    if (targetQuestion && targetQuestion.choices.length <= 2) {
      warningToast('선택지는 2개 이상 필요해요 ! 🙇‍♀️');
      return;
    }

    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === questionId
          ? {
              ...q,
              choices: q.choices.filter(c => c.id !== choiceId),
            }
          : q,
      ),
    );
  };

  const handleChoiceCheck = (questionId: string, choiceId: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            choices: q.choices.map(c => ({
              ...c,
              isAnswer: c.id === choiceId, //
            })),
          };
        }
        return q;
      }),
    );
  };

  return {
    addChoice,
    removeChoice,
    handleChoiceCheck,
  };
};

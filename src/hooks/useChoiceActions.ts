import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { questionAtoms } from '@/recoil/atoms/questionAtoms';
import useModalState from '@/hooks/useModalState';

export const useChoiceActions = () => {
  const [questions, setQuestions] = useRecoilState(questionAtoms);
  const choiceModal = useModalState();

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
      choiceModal.open();
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
            choices: q.choices.map(c =>
              c.id === choiceId
                ? { ...c, isAnswer: true }
                : { ...c, isAnswer: false },
            ),
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
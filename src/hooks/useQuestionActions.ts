import { useRecoilState } from 'recoil';
import { questionAtom } from '@/recoil/atoms/questionAtom';
import { v4 as uuidv4 } from 'uuid';
import { warningToast } from '@/utils/customtoast';

export const useQuestionActions = () => {
  const [questions, setQuestions] = useRecoilState(questionAtom);

  const addQuestion = () => {
    const newQuestionId = uuidv4();
    const newQuestion = {
      id: newQuestionId,
      text: '',
      choices: [
        { id: uuidv4(), text: '', isAnswer: false },
        { id: uuidv4(), text: '', isAnswer: false },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    if (questions.length <= 1) {
      warningToast('질문은 1개 이상 필요해요 ! 🙇‍♀️');
      return;
    }
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(updatedQuestions);
  };

  return {
    addQuestion,
    removeQuestion,
  };
};

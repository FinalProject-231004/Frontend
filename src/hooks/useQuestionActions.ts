import { useRecoilState } from 'recoil';
import { questionAtoms } from '@/recoil/atoms/questionAtoms';
import { v4 as uuidv4 } from 'uuid';

export const useQuestionActions = () => {
  const [questions, setQuestions] = useRecoilState(questionAtoms);

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

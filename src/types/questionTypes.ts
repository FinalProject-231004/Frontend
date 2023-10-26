export type Choice = {
  id: string;
  text: string;
  isAnswer: boolean;
};

export type ImageInfo = {
  file: File | null;
  preview: string | null;
};

export type Question = {
  id: string;
  text: string;
  choices: Choice[];
  image?: ImageInfo;
};

export type QuestionItemProps = {
  question: Question;
  index: number;
  removeQuestion: (id: string) => void;
  setQuestions: (questions: Question[]) => void;
  questions: Question[];
};

export type ChoiceItemProps = {
  choice: Choice;
  questionId: string;
  handleChoiceCheck: (questionId: string, choiceId: string) => void;
  handleChoiceChange: (
    questionId: string,
    choiceId: string,
    text: string,
  ) => void;
  addChoice: (questionId: string) => void;
  removeChoice: (questionId: string, choiceId: string) => void;
};

export type PlayQuiz = {
  image: string;
  id: string;
  title: string;
  choices: {
    id: number;
    answer: string;
    isAnswer: boolean;
  }[];
};

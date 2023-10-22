import { atom } from 'recoil';

interface QuizState {
  title: string;
  content: string;
  category: string;
  image?: { file: File; preview: string } | null | undefined;
}

export const quizAtom = atom<QuizState>({
  key: 'quiz',
  default: {
    title: '',
    content: '',
    category: '',
    image: null,
  },
});

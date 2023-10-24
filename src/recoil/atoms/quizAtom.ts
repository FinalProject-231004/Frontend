import { atom } from 'recoil';
import { QuizThumbNailModal } from '@/types/homeQuiz';

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

export const selectedQuizState = atom<QuizThumbNailModal | null>({
  key: 'selectedQuizState',
  default: null,
});

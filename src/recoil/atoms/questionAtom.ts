import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Question } from '@/types/questionTypes';

export const questionAtom = atom<Question[]>({
  key: 'questionAtom',
  default: [
    {
      id: uuidv4(),
      text: '',
      choices: [
        { id: uuidv4(), text: '', isAnswer: false },
        { id: uuidv4(), text: '', isAnswer: false },
      ],
      image: { file: null, preview: null },
    },
  ],
});

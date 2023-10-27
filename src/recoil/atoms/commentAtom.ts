import { Comments } from '@/types/result';
import { atom } from 'recoil';

export const commentsState = atom<Comments[]>({
  key: 'commentsState',
  default: [],
});

// 각 퀴즈의 좋아요 수를 추적
import { atom } from 'recoil';

export const likesState = atom<number[]>({
  key: 'likesState',
  default: [],
});

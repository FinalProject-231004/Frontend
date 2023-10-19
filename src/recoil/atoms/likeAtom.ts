// 사용자가 좋아요를 누른 퀴즈의 id를 추적 / 사용자가 퀴즈를 좋아요 했는지 아닌지를 판단
import { atom } from 'recoil';

export const likedState = atom({
  key: 'likedState',
  default: new Set<number>(),
});

export const likesState = atom<number[]>({
  key: 'likesState',
  default: [],
});

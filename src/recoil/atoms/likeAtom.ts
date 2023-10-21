// 사용자가 좋아요를 누른 퀴즈의 id를 추적 / 사용자가 퀴즈를 좋아요 했는지 아닌지를 판단
import { atom } from 'recoil';

export const likedState = atom<Record<number, number>>({
  key: 'likedState',
  default: {},
});

export const likesState = atom<Record<number, number>>({
  key: 'likesState',
  default: {},
});

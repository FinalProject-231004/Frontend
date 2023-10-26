import { atom } from 'recoil';

export const likeAtom = atom<Record<number, boolean>>({
  key: 'likeStatusAtom',
  default: {},
});

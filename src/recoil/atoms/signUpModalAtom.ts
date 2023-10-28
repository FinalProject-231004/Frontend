import { atom } from 'recoil';

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
});

export const loginModalState = atom<boolean>({
  key: 'loginModalState',
  default: true,
});


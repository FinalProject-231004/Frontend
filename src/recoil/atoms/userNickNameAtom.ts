import { atom } from 'recoil';

export const userNickNameState = atom<string>({
  key: 'userNickNameState',
  default: '',
});
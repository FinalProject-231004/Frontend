import { atom } from 'recoil';

export const userNickNameState = atom<string>({
  key: 'userNickNameState',
  default: '',
});
export const userProfileImgState = atom<string>({
  key: 'userProfileImgState',
  default: '',
});
export const userMileageState = atom<number>({
  key: 'userMileageState',
  default: 0,
});
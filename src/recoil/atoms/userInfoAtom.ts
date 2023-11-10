import { atom } from 'recoil';

export const userRoleState = atom<string>({
  key: 'userRoleState',
  default: '',
});
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

export const attendanceState = atom({
  key: 'attendanceState',
  default: false,
});

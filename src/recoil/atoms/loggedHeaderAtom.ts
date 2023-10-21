import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false, // 로그인되지 않은 상태로 초기화
});

export const userProfileState = atom({
  key: 'userProfile',
  default: null, // 로그인된 사용자의 프로필 정보, 초기에는 null
});
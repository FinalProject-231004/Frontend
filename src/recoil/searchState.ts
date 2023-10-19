import { atom } from 'recoil';

export const searchInputState = atom<string>({
  key: 'searchInputState',
  default: '',
});

export const searchResultsState = atom<string[]>({
  key: 'searchResultsState',
  default: [],
});

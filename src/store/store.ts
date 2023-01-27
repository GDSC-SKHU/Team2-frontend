import { atom } from 'recoil';

type NameState = string | null;

type TextState = string | null;

export const nameState = atom<NameState>({
  key: 'nameState',
  default: null,
});

export const scoreState = atom<String | null>({
  key: 'scoreState',
  default: null,
});

export const textState = atom<TextState>({
  key: 'textState',
  default: '',
});

// export const resultState = atom<number | null>({
//   key: 'resultState',
//   default: null,
// });

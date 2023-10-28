import { selector } from 'recoil';
import { questionAtom } from '@/recoil/atoms/questionAtom';

type ImageActions = {
  uploadImage: (questionId: string, file: File) => void;
  removeImage: (questionId: string) => void;
};

export const uploadImageSelector = selector<ImageActions>({
  key: 'uploadImageSelector',
  get: ({ get }) => {
    const questions = get(questionAtom);

    const uploadImage = (questionId: string, file: File) => {
      const preview = URL.createObjectURL(file);
      return questions.map(q =>
        q.id === questionId ? { ...q, image: { file, preview } } : q,
      );
    };

    const removeImage = (questionId: string) => {
      return questions.map(q =>
        q.id === questionId ? { ...q, image: { ...q, image: null } } : q,
      );
    };

    return {
      uploadImage,
      removeImage,
    };
  },
});

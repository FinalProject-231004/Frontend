import { selector } from 'recoil';
import { questionAtoms } from '@/recoil/atoms/questionAtoms';
import { toast } from 'react-toastify';
import { Question } from '@/types/questionTypes';

type ImageActions = {
  uploadImage: (questionId: string, file: File) => void;
  removeImage: (questionId: string) => void;
};

export const uploadImageSelector = selector<ImageActions>({
  key: 'uploadImageSelector',
  get: ({ get }) => {
    const questions = get(questionAtoms);

    const uploadImage = (questionId: string, file: File) => {
      if (
        file.size > 5 * 1024 * 1024 ||
        !['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'].includes(
          file.type,
        )
      ) {
        toast.error('5MB 이하 용량의 파일만 업로드 가능합니다!');
        return;
      }
      const preview = URL.createObjectURL(file);
      return questions.map(q =>
        q.id === questionId ? { ...q, image: { file, preview } } : q,
      );
    };

    const removeImage = (questionId: string) => {
      return questions.map(q =>
        q.id === questionId
          ? { ...q, image: { file: null, preview: null } }
          : q,
      );
    };

    return {
      uploadImage,
      removeImage,
    };
  },
});
type RemoveImageActions = {
  removeImage: (questionId: string) => Question[];
};

export const removeImageSelector = selector<RemoveImageActions>({
  key: 'removeImageSelector',
  get: ({ get }) => {
    const questions = get(questionAtoms);

    const removeImage = (questionId: string) => {
      return questions.map(q =>
        q.id === questionId
          ? { ...q, image: { file: null, preview: null } }
          : q,
      );
    };

    return {
      removeImage,
    };
  },
});

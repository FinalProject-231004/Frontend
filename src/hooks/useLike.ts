import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { likeAtom } from '@/recoil/atoms/likeAtom';
import { useMutation } from 'react-query';
import { postAPI } from '@/apis/axios';

const setLikeStatus = async (id: number) => {
  try {
    const response = await postAPI(`/api/quiz/${id}/quizLikes`, {});
    return response.data;
  } catch (error) {
    console.error('Setting like status failed', error);
    throw new Error('Setting like status failed');
  }
};

export const useLike = (id: number, initialLikes: number) => {
  const [isLiked, setIsLiked] = useRecoilState(likeAtom); // 좋아요 상태를 각 퀴즈 ID별로 관리
  const [likes, setLikes] = useState(initialLikes); // 좋아요 개수 상태

  const mutation = useMutation(() => setLikeStatus(id), {
    onSuccess: () => {
      setIsLiked(prev => !prev);
      setLikes(prev => (isLiked ? prev - 1 : prev + 1)); // 좋아요 상태에 따라 개수 증감
    },
  });

  const handleLike = () => {
    mutation.mutate();
  };

  return {
    isLiked,
    likes,
    handleLike,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  };
};

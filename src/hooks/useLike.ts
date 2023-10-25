import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { likeAtom } from '@/recoil/atoms/likeAtom';
import { useMutation } from 'react-query';
import axios from 'axios';

const setLikeStatus = async (id: number) => {
  console.log('서버에 좋아요 상태 업데이트 요청 전송 -> 퀴즈 ID:', id);
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_APP_GENERATED_SERVER_URL
      }/api/quiz/${id}/quizLikes`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      },
    );
    console.log('서버에서 받은 응답:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('서버에서 오류 응답:', error.response.data);
    } else {
      console.error('요청 중 오류 발생:', error);
    }
    throw error;
  }
};

export const useLike = (id: number, initialLikes: number) => {
  const [likeStates, setLikeStates] = useRecoilState(likeAtom);
  const isLiked = likeStates[id] || false;
  const [likes, setLikes] = useState(initialLikes);

  const mutation = useMutation(() => setLikeStatus(id), {
    onSuccess: data => {
      console.log('Server response:', data); // 서버에서 받은 메시지 로깅
      setLikeStates(prev => ({ ...prev, [id]: !isLiked }));
      setLikes(prev => (isLiked ? prev - 1 : prev + 1));
    },
  });

  const handleLike = () => {
    console.log('좋아요 버튼 클릭 전 -> 현재 좋아요 상태:', isLiked);
    console.log('좋아요 버튼 클릭 전 -> 현재 좋아요 수:', likes);
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

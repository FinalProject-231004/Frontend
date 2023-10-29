import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { likeAtom } from '@/recoil/atoms/likeAtom';
import { useMutation } from 'react-query';
import axios from 'axios';

const setLikeStatus = async (id: number) => {
  const token = localStorage.getItem('Authorization');

  if (!token) {
    console.error('Authorization 토큰이 존재하지 않습니다.');
    throw new Error('Unauthorized');
  }

  console.log('서버에 좋아요 상태 업데이트 요청 전송 -> 퀴즈 ID:', id);
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_APP_GENERATED_SERVER_URL
      }/api/quiz/${id}/quizLikes`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
  const [likes, setLikes] = useState(initialLikes);

  // 로컬 스토리지에서 좋아요 상태를 가져와 초기값을 설정합니다.
  useEffect(() => {
    // 좋아요 상태 초기화
    const savedLikes = localStorage.getItem('likes');
    const likesObject = savedLikes ? JSON.parse(savedLikes) : {};
    const isLiked = likesObject[id] || false;
    setLikeStates(prev => ({ ...prev, [id]: isLiked }));
    setLikes(prev => (isLiked ? prev + 1 : prev));
  }, [id, setLikeStates]);

  const isLiked = likeStates[id] || false;

  const mutation = useMutation(() => setLikeStatus(id), {
    onSuccess: data => {
      console.log('Server response:', data);
      const newIsLiked = !isLiked;
      const newLikes = likes + (newIsLiked ? 1 : -1);

      // 좋아요 수가 0 미만이 되지 않도록 방지
      if (newLikes >= 0) {
        // 상태 업데이트
        setLikeStates(prev => ({ ...prev, [id]: newIsLiked }));
        setLikes(newLikes);

        // 로컬 스토리지 업데이트
        const savedLikes = localStorage.getItem('likes');
        const likesObject = savedLikes ? JSON.parse(savedLikes) : {};
        localStorage.setItem(
          'likes',
          JSON.stringify({ ...likesObject, [id]: newIsLiked }),
        );
      }
    },
  });

  // 좋아요 버튼 클릭 핸들러
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

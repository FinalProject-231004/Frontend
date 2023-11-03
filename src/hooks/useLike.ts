import { likeAtom } from '@/recoil/atoms/likeAtom';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import axios from 'axios';

export const useLike = (id: number, initialLikes: number) => {
  const [likeStates, setLikeStates] = useRecoilState(likeAtom);
  const [likes, setLikes] = useState(initialLikes);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // 로컬 스토리지에서 '좋아요' 상태 초기화
  useEffect(() => {
    const savedLikes = localStorage.getItem('likes');
    const likesObject = savedLikes ? JSON.parse(savedLikes) : {};
    const isLiked = likesObject[id] || false;
    setLikeStates(prev => ({ ...prev, [id]: isLiked }));
    setLikes(prev => (isLiked ? prev + 1 : prev));
  }, [id, setLikeStates]);

  const isLiked = likeStates[id] || false;

  const updateLikes = (likeStatus: boolean) => {
    const newLikes = likes + (likeStatus ? 1 : -1);
    if (newLikes >= 0) {
      setLikes(newLikes);
      setLikeStates(prev => ({ ...prev, [id]: likeStatus }));

      // 로컬 스토리지에 '좋아요' 상태 업데이트
      const savedLikes = localStorage.getItem('likes');
      const likesObject = savedLikes ? JSON.parse(savedLikes) : {};
      localStorage.setItem(
        'likes',
        JSON.stringify({ ...likesObject, [id]: likeStatus }),
      );
    }
  };

  const mutation = useMutation(
    () =>
      axios.post(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/quiz/${id}/quizLikes`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
          },
        },
      ),
    {
      onSuccess: () => {
        updateLikes(!isLiked);
        setIsButtonDisabled(false); // 서버 응답 후 버튼 비활성화 해제
      },
    },
  );

  const handleLike = () => {
    if (!isButtonDisabled) {
      // 버튼이 비활성화되지 않았을 때만 처리
      setIsButtonDisabled(true); // 버튼 비활성화
      updateLikes(!isLiked);
      mutation.mutate();
    }
  };

  return {
    isLiked,
    likes,
    handleLike,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  };
};

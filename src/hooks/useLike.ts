import { likeAtom } from '@/recoil/atoms/likeAtom';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import axios from 'axios';

export const useLike = (id: number, initialLikes: number) => {
  const [likeStates, setLikeStates] = useRecoilState(likeAtom);
  const [likes, setLikes] = useState(initialLikes);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
        setIsButtonDisabled(false);
      },
    },
  );

  const handleLike = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
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

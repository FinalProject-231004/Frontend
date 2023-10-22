import { useRecoilState } from 'recoil';
import { likesState, likedState } from '@/recoil/atoms/likeAtom';
import { useToggleLikeMutation } from '@/apis/likeAPI';

export const useLike = (quizId: number) => {
  const [likedQuizzes, setLikedQuizzes] = useRecoilState(likedState);
  const [likes, setLikes] = useRecoilState(likesState);
  const mutation = useToggleLikeMutation();

  const isLiked = Boolean(likedQuizzes[quizId]);

  const handleLike = () => {
    console.log('handleLike 호출했다잉?');
    console.log('현재 좋아요퀴즈즈즈즈:', likedQuizzes);
    console.log('현재 좋아요수임:', likes);
    if (mutation.isLoading) return;

    const newLikedQuizzes = { ...likedQuizzes };
    const newLikes = { ...likes };

    console.log('좋아요  전:', newLikes);
    if (isLiked) {
      delete newLikedQuizzes[quizId];
      newLikes[quizId] = (newLikes[quizId] || 0) - 1;
    } else {
      newLikedQuizzes[quizId] = 1;
      newLikes[quizId] = (newLikes[quizId] || 0) + 1;
    }
    console.log('좋아요  후:', newLikes);

    setLikedQuizzes(newLikedQuizzes);
    setLikes(newLikes);

    mutation.mutate(quizId);
  };

  return {
    isLiked,
    likes: likes[quizId] || 0,
    handleLike,
  };
};

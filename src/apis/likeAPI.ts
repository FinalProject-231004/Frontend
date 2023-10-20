import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { likesState } from '@/recoil/atoms/likeAtom';

export const toggleLikeRequest = async (id: number) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/${id}/quizLikes`,
  );
  return response.data;
};

export const useToggleLikeMutation = () => {
  const queryClient = useQueryClient();
  const [likes, setLikes] = useRecoilState(likesState);

  return useMutation(toggleLikeRequest, {
    onSuccess: data => {
      // 서버 응답에 따라 좋아요 상태 업데이트 (예: data.likeCount)
      // 만약 서버 응답에 좋아요 수가 포함되어 있지 않다면 이 부분은 생략하고
      // QuizThumbnail 컴포넌트 내에서 직접 상태 업데이트

      queryClient.invalidateQueries('someQueryKey');
    },
  });
};

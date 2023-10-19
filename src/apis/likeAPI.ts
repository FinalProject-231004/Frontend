import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export const toggleLikeRequest = async (id: number) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/${id}/quizLikes`,
  );
  return response.data;
};

export const useToggleLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(toggleLikeRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('someQueryKey'); //일단 썸..쿼리키
    },
  });
};

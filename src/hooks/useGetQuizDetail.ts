import { useQuery } from 'react-query';
import { getAPI } from '@/apis/axios';

export const useGetQuizDetail = <T = unknown>(
  endpoint: string,
  queryKey: string | (string | number)[],
) => {
  return useQuery<T>(
    queryKey,
    async () => {
      const { data } = await getAPI<T>(endpoint);
      return data;
    },
    {
      // react-query 설정
      retry: 1,
    },
  );
};

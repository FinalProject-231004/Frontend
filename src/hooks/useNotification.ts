import { useMutation, useQuery } from "react-query";
import { informApis } from '@/apis/inform';

export const useGetMessageAlert = () => {
  return useQuery('alertList', informApis.notification);
};

export function usePutReadAlert() {
  return useMutation((username:string) => {
    return informApis.notificationRead(username);
  });
}

export function useDeleteAlert() {
  return useMutation((notificationId:string) => {
    return informApis.notificationDelete(notificationId);
  });
}

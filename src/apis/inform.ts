import { AxiosResponse } from 'axios';
import { getAPI, putAPI } from './axios';
import { Notifications } from '@/types/header';

export const informApis = {
  notification: async (): Promise<Notifications[]> => {
    const response: AxiosResponse<Notifications[]> = await getAPI('/api/notification');
    return response.data;
  },

  notificationRead: async (username: string) =>
    await putAPI(`/api/notification/${username}/read`),

  notificationDelete: async (notificationId: string) =>
    await putAPI(`/api/notification/${notificationId}/delete`),
};

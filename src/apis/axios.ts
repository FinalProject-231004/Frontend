import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

// 모든 요청이 보내기 전에 실행되며, 주로 인증 및 토큰 관리
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.withCredentials = true;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);


// 모든 응답이 도착하기 전에 실행되며, 주로 응답을 가로채서 처리(로그인)
// axios.interceptors.response.use(
//   async response => {
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       !originalRequest._retry &&
//       originalRequest.url !== `${API_BASE_URL}/api/refresh`
//     ) {
//       originalRequest._retry = true;

//       const refreshResponse = await axios.post(`${API_BASE_URL}/api/refresh`);
//       const newToken = refreshResponse.data.newAccessToken;

//       originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//       return axios(originalRequest); // 401 에러가 생기면 서버에 리프레쉬 토큰으로 새로운 엑세스 토큰 요청
//     }
//     return Promise.reject(error);
//   },
// );

export const postAPI = <T = unknown, R = unknown>(
  url: string,
  data: T,
): Promise<AxiosResponse<R>> => {
  return axios.post<R>(API_BASE_URL + url, data);
};

export const putAPI = <T = unknown, R = unknown>(
  url: string,
  data: T,
): Promise<AxiosResponse<R>> => {
  return axios.put<R>(API_BASE_URL + url, data);
};

export const getAPI = <R = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<R>> => {
  return axios.get<R>(API_BASE_URL + url, config);
};

export const deleteAPI = <R = unknown>(url: string): Promise<AxiosResponse<R>> => {
  return axios.delete<R>(API_BASE_URL + url);
};

export const patchAPI = <T = unknown, R = unknown>(
  url: string,
  data: T,
): Promise<AxiosResponse<R>> => {
  return axios.patch<R>(API_BASE_URL + url, data);
};

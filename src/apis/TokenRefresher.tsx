import axios from 'axios';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router'

export default function TokenRefresher() {
  // const navigate = useNavigate();

  useEffect(() => {
    const refreshAPI = axios.create({
      baseURL: import.meta.env.VITE_APP_GENERATED_SERVER_URL,
      headers: {"Content-Type": "application/json"} 
    });

    const interceptor = axios.interceptors.response.use(
      // 성공적인 응답 처리
      async response => {
        return response;
      },
      async error => {
        const originalRequest = error.config;
        // const msg = error.response.data.message;
        // const status = error.response.status;
        
        // 재시도
        if (
          error.response.status === 401 &&
          !originalRequest._retry && // 요청이 이미 재시도 되었는지 확인
          originalRequest.url !== `${refreshAPI}/api/token/reissue` // 요청이 리프레시 토큰을 얻기 위한 요청인지 확인하기 위해 검사
        ) {
          console.log("Refreshing access token...");
          originalRequest._retry = true; // 요청이 이미 재시도되었는지 확인
    
          // 토큰 갱신 요청
          const refreshResponse = await axios.post(`${refreshAPI}/api/token/reissue`);
          const newToken = refreshResponse.data.newAccessToken; 
    
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`; // 새로 받은 엑세스 토큰을 사용
          console.log("New access token obtained.");
          return axios(originalRequest); // 401 에러가 생기면 서버에 리프레쉬 토큰으로 새로운 엑세스 토큰 요청
        }
        // 다른 모든 오류를 거부하고 처리
        return Promise.reject(error);
      },
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);
  
  return (
    <div></div>
  )
}

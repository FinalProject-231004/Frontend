import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'

export default function TokenRefresher() {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAPI = axios.create({
      baseURL: import.meta.env.VITE_APP_GENERATED_SERVER_URL,
      headers: {"Content-Type": "application/json"} // header의 Content-Type을 JSON 형식의 데이터를 전송한다
    });

    const interceptor = axios.interceptors.response.use(
      // 성공적인 응답 처리
      response => {
        // console.log('Starting Request', response)
        return response;
      },
      async error => {
        const originalConfig = error.config; // 기존에 수행하려고 했던 작업
        const msg = error.response.data.msg; // error msg from backend
        const status = error.response.status; // 현재 발생한 에러 코드
        // console.log(error);
        // console.log(status, msg);
        // access_token 재발급
        if (status === 401 ) {
          if(msg == "Expired Access Token. 토큰이 만료되었습니다") {
            // console.log("토큰 재발급 요청");
            await axios.post(
              `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/token/reissue`,{},
              // accesstoken 수정
              {headers: {
                Authorization: `${localStorage.getItem('Authorization')}`,
                Refresh: `${localStorage.getItem('Refresh')}`,
              }},
            )
            .then((res) => {
              // console.log("res : ", res);
              localStorage.setItem("Authorization", res.headers.authorization);
              localStorage.setItem("Refresh", res.headers.refresh);

              // originalConfig 헤더를 업데이트
              originalConfig.headers["Authorization"]="Bearer "+res.headers.authorization; // 헤더의 기존 데이터 -> 새로 받은 데이터로 수정
              originalConfig.headers["Refresh"]= res.headers.refresh;

              // console.log("New access token obtained.");
              return refreshAPI(originalConfig);
            })
            .catch(() => {
              // console.error('An error occurred while refreshing the token:', error);
            });
          }
          // refresh_token 재발급과 예외 처리
          // else if(msg == "만료된 리프레시 토큰입니다") {
          else{
            localStorage.clear();
            navigate("/"); 
            // window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.")
          }
        }
        else if(status == 400 || status == 404 || status == 409) {
          // window.alert(msg); 
          // console.log(msg)
        }
        // console.error('Error response:', error);
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
import axios from 'axios';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router'

export default function TokenTest() {
  // const navigate = useNavigate();

  useEffect(() => {
    const refreshAPI = axios.create({
      baseURL: import.meta.env.VITE_APP_GENERATED_SERVER_URL,
      headers: {"Content-Type": "application/json"} // header의 Content-Type을 JSON 형식의 데이터를 전송한다
    });

    const interceptor = axios.interceptors.response.use(
      // 성공적인 응답 처리
      response => {
        return response;
      },
      async error => {
        const originalConfig = error.config;
        const msg = error.response.data.message;
        const status = error.response.status;
        
        // 재시도
        if (status === 401 ) {
          if(msg == "Expired JWT token, 만료된 JWT token 입니다.") {
            console.log("Refreshing access token...");
            await axios({
              url: `import.meta.env.VITE_APP_GENERATED_SERVER_URL/member/`,
              method: "Post",
              headers: {
                accesstoken: localStorage.getItem("token"),
                refreshToken: localStorage.getItem("refreshToken"),
              },
            })
            .then((res) => {
              localStorage.setItem("token", res.data.accessToken);
              originalConfig.headers["Authorization"]="Bearer "+res.data.accessToken;
              console.log("New access token obtained.");
              return refreshAPI(originalConfig);
            })
            .then((res) =>{
              window.location.reload();
            });
          }
          else if(msg == "refresh token expired") {
            localStorage.clear();
            // navigate("/login"); // 모달창 띄워야함 나는
            window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.")
          }
          else if(msg == "mail token expired") {
            window.alert("비밀번호 변경 시간이 만료되었습니다. 다시 요청해주세요.");
          }
        }
        else if(status == 400 || status == 404 || status == 409) {
          window.alert(msg);
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
    <div>TokenTest</div>
  )
}

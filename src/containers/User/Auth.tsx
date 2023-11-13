import { useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';

const Auth = () => {
  // console.log('auth 시작')
  const code = window.location.search;
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_MAIN_SERVER_URL}/api/member/kakao/callback${code}`,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        if (response.status === 200) {
          // console.log(response)
          localStorage.setItem('Authorization', response.headers.authorization);
          localStorage.setItem('Refresh', response.headers.refresh);
          setIsLoggedIn(true);

          const responseBody = response.data;
          if (responseBody.msg === "신규유저입니다.") {
             // 여기에 알림창같은거 안떠도 되는지? ex. 신규회원은 비밀번호 변경을 권장합니다. 등등 
            navigate('/kakao/first-login');
          } else if (responseBody.msg === "기존유저입니다.") {
            navigate('/');
          }
        }

      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 403) {
            toast.error("신고누적으로 계정이 차단되었습니다.");
            navigate('/');
          } else {
            toast.error("카카오 로그인에 문제가 생겼습니다.");
            navigate('/');
          }
        } else {
          toast.error("에러가 발생했습니다.");
        }
      }
    };
    fetchData();
  }, [navigate, setIsLoggedIn, code]);

  return <div>로그인 중입니다.</div>;
};

export default Auth;
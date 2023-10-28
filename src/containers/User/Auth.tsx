import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
 
const Auth = () => {
  const code = window.location.search;
  // console.log(code);
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_MAIN_SERVER_URL
          }/api/member/kakao/callback${code}`,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        if (response.status === 200) {
        localStorage.setItem('Authorization', response.headers.authorization);
        localStorage.setItem('Refresh', response.headers.refresh);
        setIsLoggedIn(true);
        navigate('/');  
        }

      } catch (error) {
        console.log('kakao 소셜 로그인 에러 : ', error);
        // window.alert('소셜 로그인에 실패하였습니다.');
        toast.error("카카오 로그인에 문제가 생겼습니다.");

        window.location.href = `/`;
      }
    };

    fetchData();
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Auth;
// import { postAPI } from '@/apis/axios';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Auth = () => {
  const code = window.location.search;
  console.log(code);
  // const searchParams = new URLSearchParams(window.location.search);
  // const code = searchParams.get('code');
  // console.log(code);

  const navigate = useNavigate();
  const API_BASE_URL: string = 'import.meta.env.VITE_APP_GENERATED_SERVER_URL';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await postAPI(`/member/kakao/callback${code}`,'');
        const response = await axios.post(`${API_BASE_URL}/api/member/kakao/callback${code}`);
        console.log(response);

        // 토큰을 받아서 localStorage 같은 곳에 저장하는 코드를 여기에 쓴다.
        if (response.status === 200) {
        localStorage.setItem('Authorization', response.headers.authorization);
        // checkUser();
        navigate('/');
      }
      } catch (error) {
        console.log('kakao 소셜 로그인 에러 : ', error);
        window.alert('소셜 로그인에 실패하였습니다.');
        window.location.href = `/`;
      }
    };

    fetchData();
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Auth;

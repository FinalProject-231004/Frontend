import { useNavigate } from "react-router";
// import axios from "axios";
// import { toast } from "react-toastify";
import { useEffect } from "react";
import { postAPI } from '@/apis/axios';

const Auth = () => {
  const code = window.location.search;
  console.log(code);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postAPI(`/member/kakao${code}`);
        console.log(response);

        // 토큰을 받아서 localStorage 같은 곳에 저장하는 코드를 여기에 쓴다.
        if (response.data.statusCode === 200) {
        localStorage.setItem('Authorization', response.headers.authorization);
        localStorage.setItem('Refresh', response.headers.refresh);
        navigate('/');
      }
      } catch (error) {
        console.log('kakao 소셜 로그인 에러 : ', error);
        window.alert('소셜 로그인에 실패하였습니다.');
//         toast.error("카카오 로그인에 문제가 생겼습니다.");

        window.location.href = `/login`;
      }
    };

    fetchData();
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Auth;

// const Auth = () => {
//   console.log("라우팅 탔음")

//   const code = new URL(window.location.href);
//   const codeValue = code.searchParams.get("code");
//   const navigate = useNavigate();
//   console.log(codeValue)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${
//             import.meta.env.VITE_APP_GENERATED_SERVER_URL
//           }/api/member/kakao/callback?code=${codeValue}`,
//           {
//             headers: {
//               "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//             },
//           }
//         );

//         if (res.status === 200) {
//           toast.success("카카오 계정을 통해 로그인 되었습니다.");
//           localStorage.setItem("Authorization", res.headers.authorization);
//           localStorage.setItem("Refresh", res.headers.refresh);
//           // navigate("/");
//         }
//         window.location.reload();
//       } catch (error) {
//         toast.error("카카오 로그인에 문제가 생겼습니다.");
//         navigate("/");
//       }
//     };
//     fetchData();
//   }, []);

//   return <></>;
// };

// export default Auth;

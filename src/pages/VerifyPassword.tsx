import { getAPI, postAPI } from '@/apis/axios';
import { CustomizedButtons, UserInfoInput } from '@/components';
import { nickName, varifyPw } from '@/types/myPage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyPassword() {
  const [nickName, setNickName] = useState('');
  const [pwInput, setPwInput] = useState('');
  const navigate = useNavigate();

  const success = () =>
    toast.success('인증 성공!!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const wrongPw = () =>
    toast.error('비밀번호가 일치하지 않습니다.', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  useEffect(() => {
    getNickName();
  }, []);

  const validateInfo = {
    enterPassword: pwInput,
  };

  const getNickName = async () => {
    try {
      const response = await getAPI<nickName>('/api/member/validatePassword');
      // console.log(response.data.data);
      setNickName(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const postPw = async (info: varifyPw) => {
    try {
      await postAPI('/api/member/validate/password', info);
      // console.log(response);
      success();
      navigate('/mypage');
      return (
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      );
    } catch (error) {
      console.error('Error:', error);
      wrongPw();
      return (
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      );
    }
  };

  return (
    <div className="w-[1920px] h-[1080px] mx-auto">
      <div className="w-[1080px] mx-auto">
        <div className="mt-24 mb-5">
          <h1>비밀번호 재확인</h1>
          <p>
            회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번
            확인해주세요.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-10 ">
          <div className="w-full py-16 px-10 border-t-2 border-b flex flex-col justify-center items-center gap-9">
            <div className="w-[700px] flex justify-between items-center">
              <p className="w-full text-2xl">아이디</p>
              <UserInfoInput
                inputVal={nickName}
                onChange={() => {}}
                type="text"
                placeholder="아이디"
                size="medium"
                borderColor={''}
                focusBorderColor={''}
              />
            </div>
            <div className="w-[700px] flex justify-between items-center">
              <p className="w-full text-2xl">비밀번호</p>
              <UserInfoInput
                inputVal={pwInput}
                onChange={e => {
                  setPwInput(e.target.value);
                }}
                type="password"
                placeholder="비밀번호"
                size="medium"
                borderColor={''}
                focusBorderColor={''}
              />
            </div>
          </div>
          <CustomizedButtons
            size="small"
            fontcolor="white"
            fontSize="24px"
            BtnName="확인"
            btnbg="#0078ff"
            btnhoverbg={''}
            btnactivebg={''}
            borderradius="6px"
            onClick={() => {
              sessionStorage.setItem('selectedTab', 'info'); // 'info' 값을 저장
              postPw(validateInfo);
            }}
          />
        </div>
      </div>
    </div>
  );
}

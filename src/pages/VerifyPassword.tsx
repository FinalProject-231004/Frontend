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
      // console.error('Error:', error);
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
      // console.error('Error:', error);
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
    <div className="w-screen min-h-[1080px] mx-auto flex justify-center items-center">
      <div className="w-[896px] h-[599px] mx-auto flex flex-col justify-center items-center">
        <div className="mt-24 mb-[12px] flex flex-col justify-center items-center">
          <h1 className='text-[32px] text-blue '>비밀번호 재확인</h1>
          {/* <p className='mt-2  text-center text-deep_dark_gray'>
            회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번
            확인해주세요.
          </p> */}
        </div>
        <div className="flex flex-col justify-center items-center gap-[46px]">
          <div className="w-full py-16 flex flex-col justify-center items-center gap-[64px]">
            <div className="w-[896px] flex flex-col justify-between items-center">
              <p className="w-full text-2xl mb-[12px]">아이디</p>
              <UserInfoInput
                disabled={true}
                inputVal={nickName}
                onChange={() => {}}
                type="text"
                placeholder="아이디"
                size="xl"
                borderColor={''}
                focusBorderColor={''}
              />
            </div>
            <div className="w-[896px] flex flex-col justify-between items-center">
              <p className="w-full text-2xl mb-[12px]">비밀번호</p>
              <UserInfoInput
                inputVal={pwInput}
                onChange={e => {
                  setPwInput(e.target.value);
                }}
                type="password"
                placeholder="비밀번호"
                size="xl"
                borderColor={''}
                focusBorderColor={''}
              />
            </div>
          </div>
          {/* <button className='w-[130px] h=[72px] border-[1.5px] border-blue rounded-[6px] px-[22px] py-[24px] text-[24px] text-blue hover:bg-blue hover:text-white'
          onClick={() => {
            sessionStorage.setItem('selectedTab', 'info'); // 'info' 값을 저장
            postPw(validateInfo);
          }}
          >
            확인
          </button> */}
          <div className='w-full flex justify-end'>
            <CustomizedButtons
              size="signUp"
              fontcolor="white"
              fontSize="24px"
              BtnName="확인하기"
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
    </div>
  );
}

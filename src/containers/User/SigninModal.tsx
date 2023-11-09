import { loginModalState, modalState } from '@/recoil/atoms/signUpModalAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { useEffect, useState } from 'react';
import { postAPI } from '@/apis/axios';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import SignUpModal from './SignUpModal';
import { postSignIn } from '@/types/header';
import { useEnterKey } from '@/hooks/useEnterKey';
import axios, { AxiosError } from 'axios';
import { SignInErrorResponse } from '@/types/header'
import { useMobile } from '@/hooks';

function SignInModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [allCheckMessag, setAllCheckMessag] = useState('');
  const [loginMoadal, setLoginMoadal] = useRecoilState(loginModalState);
  const isMobile = useMobile();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const data = {
    username: idInput,
    password: pwInput,
  };

  const login = async (info: postSignIn) => {
    try {
      const response = await postAPI('/api/member/login', info);
      if (response.status === 200) {
        localStorage.setItem('Authorization', response.headers.authorization);
        localStorage.setItem('Refresh', response.headers.refresh);
        setIsLoggedIn(true);
        closeModal();
      }
      // console.log('Success:', response.data);
    } catch (error: unknown) { 
      if (axios.isAxiosError(error)) {
        // Axios 오류 처리
        const serverError = error as AxiosError<SignInErrorResponse>;
        if (serverError && serverError.response) {
          // console.error('Error:', serverError.response.data.msg);
          setAllCheckMessag(serverError.response.data.msg);
        }
      } else {
        // console.error('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIdInput('');
      setPwInput('');
      setAllCheckMessag('');
    }
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const signUpHandler = () => {
    setLoginMoadal(false);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // 기본 제출 이벤트 방지
    if (idInput === '' || pwInput === '') {
      setAllCheckMessag('모든 정보를 입력해주세요.');
      return;
    } else {
      setAllCheckMessag('');
    }
    login(data);
  };

  const enterKeyHandler = useEnterKey(handleSubmit);

  const kakaoLogin: () => void = () => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_APP_FE_URL}/login/kakao&response_type=code`;
    window.location.href = kakaoURL;
  };
  
  return (
    <>
      <button
        className="w-[84.77px] h-[36px] rounded-[18px] text-blue border border-[#0078ff] hover:bg-blue hover:text-white"
        onClick={openModal}
      >
        로그인
      </button>
      <Modal
        onRequestClose={closeModal}
        isOpen={isOpen}
        width={isMobile? '343px':'713px'}
        height={isMobile? '277px' : '576px'}
        bgColor="#F1F8FF"
      >
        {loginMoadal ? (
          <form onSubmit={handleSubmit} onKeyDown={enterKeyHandler} className="flex flex-col justify-center items-center">
            <h1 className="text-4xl text-blue font-extrabold py-[40px] sm:text-base sm:py-4">로그인</h1>
            <div className=" w-9/12 pb-[45px] flex flex-col gap-5 relative sm:gap-3 sm:pb-6">
              <div >
                <UserInfoInput
                  type="text"
                  placeholder="아이디"
                  size="medium"
                  focusBorderColor="white"
                  borderColor='none'
                  inputVal={idInput}
                  onChange={e => {
                    setIdInput(e.target.value);
                  }}
                />
              </div>
              <UserInfoInput
                type="password"
                placeholder="비밀번호"
                size="medium"
                focusBorderColor="white"
                borderColor='none'
                inputVal={pwInput}
                onChange={e => {
                  setPwInput(e.target.value);
                }}
              />
              <div className="mt-[6px] text-xs text-[#F92316] absolute right-2 bottom-6 sm:text-[6px] sm:bottom-2">
                {allCheckMessag}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-4 sm:gap-3">
              <CustomizedButtons
                type="submit"
                size="large"
                fontSize="26px"
                fontcolor="#fff"
                BtnName="로그인 하기"
                btnbg="#0078FF"
                btnhoverbg=""
                btnactivebg={''}
                borderradius="12px"
                onClick={() => {}}
              />
              <CustomizedButtons
                size="large"
                fontcolor="#000"
                fontSize="26px"
                BtnName={
                  <div className="flex justify-center items-center">
                    <i className="fa-solid fa-comment mr-2"></i>
                    <p>카카오로 시작하기</p>
                  </div>
                }
                btnbg="#FEE500"
                btnhoverbg="#FEE500"
                btnactivebg={''}
                borderradius="12px"
                onClick={kakaoLogin}
                />
              <p
                className="pt-5 text-xl font-medium text-center text-blue border-b-2 border-solid border-blue cursor-pointer 
                sm:text-[10px] sm:p-0 sm:border-0 sm:underline"
                onClick={signUpHandler}
              >
                회원가입하기
              </p>
            </div>
          </form>
        ) : (
          <SignUpModal />
        )}
      </Modal>
    </>
  );
}

export default SignInModal;

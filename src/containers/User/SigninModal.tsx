import { loginModalState, modalState } from '@/recoil/atoms/signUpModalAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { useEffect, useState } from 'react';
import { postAPI } from '@/apis/axios';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import SignUpModal from './SignUpModal';
import { postSignIn } from '@/types/header';

function SignInModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [allCheckMessag, setAllCheckMessag] = useState('');
  const [loginMoadal, setLoginMoadal] = useRecoilState(loginModalState);

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
    } catch (error) {
      // console.error('Error:', error);
      setAllCheckMessag('아이디 혹은 비밀번호가 일치하지 않습니다!')
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

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 제출 이벤트 방지
    if (idInput === '' || pwInput === '') {
      setAllCheckMessag('모든 정보를 입력해주세요.');
      return;
    } else {
      setAllCheckMessag('');
    }
    login(data);
  };

  const kakaoLogin: () => void = () => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_APP_FE_URL}/login/kakao&response_type=code`;
    window.location.href = kakaoURL;
  };
  
  return (
    <>
      <button
        className="w-[84.77px] h-[36px] rounded-[18px] text-blue border border-[#0078ff]"
        onClick={openModal}
      >
        로그인
      </button>
      {/* <Button size='small' fontColor='var(--navy)' BtnName='로그인' BtnBg='#fff' BtnHoverBg='' BtnActiveBg='' borderRadius='18px' onClick={openModal} /> */}
      <Modal
        onRequestClose={closeModal}
        isOpen={isOpen}
        width="713px"
        height="590px"
        bgColor="#F1F8FF"
      >
        {loginMoadal ? (
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
            <h1 className="text-[34px] text-blue my-[40px]">로그인</h1>
            <div className="w-[530px] mb-[45px] relative">
              <div className="mb-[22px]">
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
              <div className="mt-[6px] text-[12px] text-[#F92316] absolute right-0">{allCheckMessag}</div>
            </div>

            <div className="flex flex-col justify-center items-center gap-4">
              <CustomizedButtons
                size="large"
                fontSize="26px"
                fontcolor="#fff"
                BtnName="로그인 하기"
                btnbg="#0078FF"
                btnhoverbg=""
                btnactivebg={''}
                borderradius="12px"
                onClick={() => {
                  if (idInput === '' || pwInput === '') {
                    setAllCheckMessag('모든 정보를 입력해주세요.');
                    return;
                  } else {
                    setAllCheckMessag('');
                  }
                  login(data);
                }}
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
                className="w-[118px] mt-5 mb-6 text-xl font-medium text-center text-navy border-b-2 border-solid border-navy cursor-pointer"
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

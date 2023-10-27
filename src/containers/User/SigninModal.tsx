import { loginModalState, modalState } from '@/recoil/atoms/signUpModalAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { useEffect, useState } from 'react';
import { postAPI } from '@/apis/axios';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import SignUpModal from './SignUpModal';

function SignInModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [allCheckMessag, setAllCheckMessag] = useState('');
  const [loginMoadal, setLoginMoadal] = useRecoilState(loginModalState);

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  type postData = {
    username: string;
    password: string;
  };

  const data = {
    username: idInput,
    password: pwInput,
  };

  const login = async (info: postData) => {
    try {
      const response = await postAPI('/api/member/login', info);
      if (response.status === 200) {
        setIsLoggedIn(true);
        closeModal();
      }
      // console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
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
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[34px] text-blue my-[40px]">로그인</h1>
            <div className="w-[530px] mb-[40px]">
              <div className="mb-[22px]">
                <UserInfoInput
                  type="text"
                  placeholder="아이디"
                  size="medium"
                  focusBorderColor="white"
                  borderColor="navy"
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
                borderColor="navy"
                inputVal={pwInput}
                onChange={e => {
                  setPwInput(e.target.value);
                }}
              />
            </div>

            <div className="mb-2 text-[12px]">{allCheckMessag}</div>

            <div className="flex flex-col justify-center items-center gap-4">
              <CustomizedButtons
                size="large"
                fontSize="26px"
                fontColor="#fff"
                BtnName="로그인 하기"
                BtnBg="#0078FF"
                BtnHoverBg=""
                BtnActiveBg={''}
                borderRadius="12px"
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
                fontColor="#000"
                fontSize="26px"
                BtnName={
                  <div className="flex justify-center items-center">
                    <i className="fa-solid fa-comment mr-2"></i>
                    <p>카카오로 시작하기</p>
                  </div>
                }
                BtnBg="#FEE500"
                BtnHoverBg="#FEE500"
                BtnActiveBg={''}
                borderRadius="12px"
                onClick={kakaoLogin}
                />
              <p
                className="w-[118px] mt-5 mb-6 text-xl font-medium text-center text-white border-b-2 border-solid border-white cursor-pointer"
                onClick={signUpHandler}
              >
                회원가입하기
              </p>
            </div>
          </div>
        ) : (
          <SignUpModal />
        )}
      </Modal>
    </>
  );
}

export default SignInModal;

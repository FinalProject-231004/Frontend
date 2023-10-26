import { loginModalState, modalState } from '@/recoil/atoms/signUpModalAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components/common'
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
  // const token = useRecoilValue(isLoggedInState);

  type postData = {
    username: string;
    password: string;
  };

  const data = {
    username: idInput,
    password: pwInput,
  };

  const login =async (info:postData) => {
    try {
      const response = await postAPI('/api/member/login',info);
      if (response.status === 200) {
        console.log(response.headers); 
        localStorage.setItem('Authorization', response.headers.authorization);
        localStorage.setItem('Refresh', response.headers.refresh); 
        // console.log( 'authoriztion : ',response.headers['authorization']); 
        // console.log('refresh : ',response.headers['refrezsh']); 
        setIsLoggedIn(true);
        closeModal();
      }
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 토큰을 가져와서
    // 토큰이 있다면 isLoggedIn 상태를 true로 업데이트
    const token = localStorage.getItem('Authorization');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() =>{
    if(!isOpen) {
      setIdInput('');
      setPwInput('');
      setAllCheckMessag('');
    }
  },[isOpen])

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const signUpHandler = () => {
    setLoginMoadal(false);
  };
  

  return (
    <>
      <button className='w-[84.77px] h-[36px] rounded-[18px] text-blue border border-[#0078ff]' onClick={openModal}>로그인</button>
      {/* <Button size='small' fontColor='var(--navy)' BtnName='로그인' BtnBg='#fff' BtnHoverBg='' BtnActiveBg='' borderRadius='18px' onClick={openModal} /> */}
      <Modal onRequestClose={closeModal} isOpen={isOpen} width='713px' height='590px' bgColor='#0078FF'>
        {loginMoadal ? (
          <div className='flex flex-col justify-center items-center'>
          <h1 className='text-[34px] text-white my-[40px]'>로그인</h1>
            <div className='w-[530px] mb-[40px]'> 
              <div className='mb-[22px]'>
                <UserInfoInput 
                  type='text' placeholder='아이디' size='medium' focusBorderColor='white' borderColor='navy'
                  inputVal={idInput}
                  onChange={(e) => {
                    setIdInput(e.target.value);
                  } } />
              </div>
              <UserInfoInput
                type='password' placeholder='비밀번호' size='medium' focusBorderColor='white' borderColor='navy'
                inputVal={pwInput}
                onChange={(e) => {
                setPwInput(e.target.value);
                }} />          
            </div>

            <div className='mb-2 text-[12px]'>
              {allCheckMessag}
            </div>

            <div className='flex flex-col justify-center items-center gap-4'>
              <CustomizedButtons size='large' fontSize='26px' fontColor='#fff' BtnName='로그인 하기' BtnBg='navy' BtnHoverBg='' BtnActiveBg={''} borderRadius='12px' 
                onClick={()=>{
                  if (idInput === '' || pwInput === '') {
                    setAllCheckMessag('모든 정보를 입력해주세요.');
                    return;
                  } else {
                    setAllCheckMessag('');
                  }
                  login(data);
                }} />
                <CustomizedButtons size='large' fontColor='#000' fontSize='26px'
                BtnName={
                  <div className='flex justify-center items-center'>
                    <i className="fa-solid fa-comment mr-2"></i>
                    <p>카카오로 시작하기</p>
                  </div>} 
                BtnBg='#FEE500' BtnHoverBg='#FEE500' BtnActiveBg={''} borderRadius='12px' 
                onClick={() => {
                  console.log("카카오 인증 시작")
                  window.location.href =
                  'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e0d3b3077a5d847a09593bf8a6ff851a&redirect_uri=https://yulmoo.world/api/member/kakao/callback';
                }}
                />
              <p className="w-[118px] mt-5 mb-6 text-xl font-medium text-center text-white border-b-2 border-solid border-white cursor-pointer" onClick={signUpHandler}>회원가입하기</p>
            </div>
          </div>
        ) : (
          <SignUpModal />
        )}
        
      </Modal>
    </>
  )
}

export default SignInModal
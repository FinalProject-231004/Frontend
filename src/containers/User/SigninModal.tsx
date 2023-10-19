import { modalState } from '@/recoil/modalState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import UserInfoInput from '@/components/common/UserInfoInput';
import { useEffect, useState } from 'react';
import { postAPI } from '@/apis/axios';
import { isLoggedInState } from '@/recoil/loggedHeaderState';

function SignInModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [allCheckMessag, setAllCheckMessag] = useState('');

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  // const token = useRecoilValue(isLoggedInState);

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 토큰을 가져와서
    // 토큰이 있다면 isLoggedIn 상태를 true로 업데이트
    const token = localStorage.getItem('Authorization');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
        console.log( 'authoriztion : ',response.headers['authorization']); 
        console.log('refresh : ',response.headers['refresh']); 
        // const token = localStorage.getItem('Authorization');
        // if(token) setIsLoggedIn(true);
        setIsLoggedIn(true);
        closeModal();
      }
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <button className='w-[84.77px] h-[36px] rounded-[18px] text-blue border border-[#0078ff]' onClick={openModal}>로그인</button>
      {/* <Button size='small' fontColor='var(--navy)' BtnName='로그인' BtnBg='#fff' BtnHoverBg='' BtnActiveBg='' borderRadius='18px' onClick={openModal} /> */}
      <Modal onRequestClose={closeModal} width='713px' height='530px' bgColor='#0078FF'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-[34px] text-white mb-[40px] mt-[40px]'>로그인</h1>
          <div className='flex w-full flex-col justify-center items-center'>
            <div className='w-full'>
              <UserInfoInput 
                type='text' placeholder='아이디' size='large' focusBorderColor='blue' borderColor='black'
                inputVal={idInput}
                onChange={(e) => {
                  setIdInput(e.target.value);
                } } />
            </div>
            <div className='w-full'>
              <UserInfoInput
                type='password' placeholder='비밀번호' size='large' focusBorderColor='blue' borderColor='black'
                inputVal={pwInput}
                onChange={(e) => {
                  setPwInput(e.target.value);
                }} />
            </div>
          </div>
          
          {allCheckMessag}

          <p className="w-[118px] my-9 text-xl font-medium text-center text-white border-b-2 border-solid border-white">회원가입하기</p>

          <div className='flex flex-col justify-center items-center'>
            <Button size={''} fontColor='#000' 
              BtnName={
                <div>
                  <i className="fa-solid fa-comment"></i>
                  카카오로 시작하기
                </div>} 
              BtnBg='#FEE500' BtnHoverBg='#FEE500' BtnActiveBg={''} borderRadius='12px' 
              onClick={() => {
                console.log("카카오 인증 시작")
                window.location.href =
                'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e0d3b3077a5d847a09593bf8a6ff851a&redirect_uri=https://yulmoo.world/api/member/kakao/callback';
              }}
              />
            <Button size='' fontColor='#fff' BtnName='로그인 하기' BtnBg='navy' BtnHoverBg='' BtnActiveBg={''} borderRadius='12px' 
              onClick={()=>{
                if (idInput === '' || pwInput === '') {
                  setAllCheckMessag('모든 정보를 입력해주세요.');
                  return;
                }
                login(data);
              }} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default SignInModal
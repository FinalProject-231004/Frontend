import { modalState } from '@/recoil/modalState';
import { useRecoilState } from 'recoil';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import UserInfoInput from '../../components/UserInfoInput';
import { useState } from 'react';
import { postAPI } from '@/apis/axios';

function SigninModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [allCheckMessag, setAllCheckMessag] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  type postData = {
    username: string;
    password: string;
  }

  const data = {
    username: idInput,
    password: pwInput,
  }

  const login =async (info:postData) => {
    try {
      const response = await postAPI('/api/member/login',info);
      if (response.status === 200) {
        localStorage.setItem('Authorization', response.headers.authorization);
      }
      // 로그인 성공시 모달창이 닫혀야겠지?? dispatch하면 이상하겠지..?(고민)
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <Button size='small' fontColor='var(--navy)' BtnName='로그인' BtnBg='#fff' BtnHoverBg='' BtnActiveBg='' borderRadius='18px' onClick={openModal} />
      <Modal onRequestClose={closeModal} width='713px' height='517px' bgColor='#0078FF'>
        <h1>로그인</h1>
        <div>
          <div>
            <UserInfoInput 
              type='text' placeholder='아이디' size='large' focusBorderColor={''} 
              inputVal={idInput}
              onChange={(e) => {
                setIdInput(e.target.value);
              }} />
          </div>
          <div>
            <UserInfoInput
              type='password' placeholder='비밀번호' size='large' focusBorderColor={''} 
              inputVal={pwInput}
              onChange={(e) => {
                setPwInput(e.target.value);
              }} />
          </div>
        </div>
        
        {allCheckMessag}

        <div className='flex'>
          <Button size={''} fontColor='#000' 
            BtnName={
              <div>
                <i className="fa-solid fa-comment"></i>
                카카오로 시작하기
              </div>} 
            BtnBg='#FEE500' BtnHoverBg='#FEE500' BtnActiveBg={''} borderRadius='12px' 
            onClick={()=>{}} 
            // onClick={() => {
            //   window.location.href =
            //   'https://kauth.kakao.com/oauth/authorize?client_id=56b6a4d5c01dd2b5b1dd41102d18d9f1&redirect_uri=http://day-trip.s3-website.ap-northeast-2.amazonaws.com/kakao/callback&response_type=code';
            // }}
            />
          <Button size='' fontColor='#fff' BtnName='로그인 하기' BtnBg='var(--navy)' BtnHoverBg='var(--blue)' BtnActiveBg={''} borderRadius='12px' 
            onClick={()=>{
              if (idInput === '' || pwInput === '') {
                setAllCheckMessag('모든 정보를 입력해주세요.');
                return;
              }
              // if (!isId || !isNickName || !isPw || !isPwCheck) {
              //   setAllCheckMessag('입력값을 확인해주세요.');
              //   return;
              // }
              login(data);
            }} />
        </div>
        
      </Modal>
    </>
  )
}

export default SigninModal
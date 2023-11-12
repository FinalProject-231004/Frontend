import { useState } from 'react';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { useMobile, useModalState } from '@/hooks';
import { deleteAPI } from '@/apis/axios';
import { deletePw } from '@/types/myPage';
import { useNavigate } from 'react-router';
import { logOut } from '@/utils/authHelpers';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import { validatePw } from '@/hooks/useValidation';

export default function DeleteAccount() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const deleteAccountModal = useModalState();
  const [enterPassword, setInputPw] = useState('');
  const [isPw, setIsPw] = useState(false);
  const [pwMessage, setPwMessage] = useState('');
  const isMobile = useMobile(); 

  const pwData = {
    enterPassword: enterPassword,
  };

  const deleteAccount = async (enterPassword: deletePw) => {
    try {
      // console.log(enterPassword);
      await deleteAPI('/api/member/delete', enterPassword);
      // console.log('회원탈퇴 성공!', response);
      logOut();
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      // console.error('Error:', error);
      setPwMessage('비밀번호가 일치하지 않습니다');
      setIsPw(true);
    }
  };

  const closeModal = () => {
    deleteAccountModal.close();
    setInputPw('');
    setIsPw(false);
    setPwMessage('');
  };

  return (
    <>
      <button
        onClick={deleteAccountModal.open}
        className="w-[130px] h-[72px] text-[24px] text-blue rounded-[6px] border-2 border-blue hover:bg-navy 
        sm:w-[65px] sm:h-[36px] sm:text-xs sm:border
      ">
        회원탈퇴
      </button>
      <Modal
        onRequestClose={closeModal}
        width={!isMobile? '713px' : '356px'}
        height={!isMobile? '368px' : '184px'}
        bgColor="#0E2958"
        isOpen={deleteAccountModal.isOpen}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="py-[46px] text-[34px] text-blue font-extrabold sm:text-[16px] sm:py-[23px]">
            정말 탈퇴하실 건가요?
          </h1>
          <div className='relative'>
            <div className="relative flex justify-center items-center z-10">
              <UserInfoInput
                inputVal={enterPassword}
                type="password"
                placeholder="비밀번호"
                size="medium"
                borderColor="blue"
                focusBorderColor={''}
                onChange={e => {
                  setInputPw(e.target.value);
                  setIsPw(validatePw(e.target.value));
                }}
              />
              {isPw && (
                <i className="far fa-circle-xmark absolute top-18 right-[17px] text-[37px] text-red z-20 sm:text-base"></i>
              )}
            </div>

            <div className="my-[6px] absolute right-0 text-[16px] text-white font-hairline sm:text-[10px] sm:my-[3px]">
              {pwMessage}
            </div>
          </div>

          <div className="pt-[60px] sm:pt-[30px]">
            <CustomizedButtons
              size="large"
              fontcolor="white"
              fontSize="24px"
              BtnName="네...탈퇴할게요🥲"
              btnbg="#0078FF"
              btnhoverbg={''}
              btnactivebg={''}
              borderradius="28.5px"
              onClick={() => {
                deleteAccount(pwData);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

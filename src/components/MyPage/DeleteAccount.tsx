import { useState } from 'react';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { useModalState } from '@/hooks';
import { deleteAPI } from '@/apis/axios';
import { deletePw } from '@/types/myPage';
import { useNavigate } from 'react-router';
import { logOut } from '@/utils/authHelpers';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';

export default function DeleteAccount() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const deleteAccountModal = useModalState();
  const [enterPassword, setInputPw] = useState('');
  const [isPw, setIsPw] = useState(false);
  const [pwMessage, setPwMessage] = useState('');

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
      console.error('Error:', error);
      setPwMessage('비밀번호가 일치하지 않습니다');
      setIsPw(true);
    }
  };

  const validatePw = (pw: string) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,20}$/;
    setIsPw(pattern.test(pw));
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
        className="w-[130px] h-[72px] text-[24px] text-blue rounded-[6px] border-2 border-blue hover:bg-navy"
      >
        회원탈퇴
      </button>
      <Modal
        onRequestClose={closeModal}
        width="713px"
        height="368px"
        bgColor="#0E2958"
        isOpen={deleteAccountModal.isOpen}
      >
        <div className="h-[368px] flex flex-col justify-center items-center">
          <h1 className="mb-[46px] text-[34px] text-blue">
            정말 탈퇴하실 건가요?
          </h1>

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
                validatePw(e.target.value);
              }}
            />

            {isPw && (
              <i className="fa-regular fa-circle-xmark absolute top-18 right-[17px] h-[37px] w-[37px] text-[37px] text-[#F92316] z-20"></i>
            )}
          </div>
          <div className="relative w-[530px]">
            <div className="absolute right-0 my-[6px] text-[12px] text-white font-hairline">
              {pwMessage}
            </div>
          </div>

          <div className="mt-[60px]">
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

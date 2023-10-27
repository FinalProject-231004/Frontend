import { putAPI } from '@/apis/axios';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { useState } from 'react';
import { putData } from '@/types/myPage';
import { useModalState } from '@/hooks';

export default function ChangePwModal() {
  const newPwModal = useModalState();
  const [updatePw, setUpdatePw] = useState('');
  const [checkPw, setCheckPw] = useState('');

  const [isPw, setIsPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [pwMessage, setPwMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  const [allCheckMessag, setAllCheckMessag] = useState('');

  const data = {
    newPassword: checkPw,
  };

  const putPw = async (pw: putData) => {
    try {
      const response = await putAPI('/api/member/update/password', pw);
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const validatePw = (pw: string) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,20}$/;
    setIsPw(pattern.test(pw));
  };
  const validatepwCheck = (pwCheck: string) => {
    if (pwCheck === updatePw) {
      setIsPwCheck(true);
      setPwCheckMessage('');
    } else {
      setIsPwCheck(false);
      setPwCheckMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  const saveBtnHandler = () => {
    if (!isPw || !isPwCheck) {
      setAllCheckMessag('입력값을 확인해주세요.');
      return;
    }
    putPw(data);
    closeModal();
    setUpdatePw('');
    setCheckPw('');
  };

  const closeModal = () => {
    newPwModal.close();
    setUpdatePw('');
    setCheckPw('');
  };

  return (
    <>
      <button
        onClick={newPwModal.open}
        className="bg-blue rounded-r-md text-[24px] text-white hover:bg-navy w-[131px] h-[72px]"
      >
        변경하기
      </button>
      <Modal
        onRequestClose={closeModal}
        width="713px"
        height="442px"
        bgColor="#F1F8FF"
        isOpen={newPwModal.isOpen}
      >
        <div className="h-[442px] flex flex-col justify-center items-center">
          <h1 className="mb-[46px] text-[34px] text-blue">비밀번호 변경하기</h1>

          <div className="relative flex justify-center items-center z-10">
            <UserInfoInput
              inputVal={updatePw}
              type="password"
              placeholder="비밀번호"
              size="medium"
              borderColor="blue"
              focusBorderColor={''}
              onChange={e => {
                setUpdatePw(e.target.value);
                validatePw(e.target.value);
                setPwMessage(
                  '알파벳 대소문자/숫자/특수문자 적어도 하나씩 포함하여 8자 이상, 20자 이하',
                ); //알파벳 대소문자 숫자 특수문자
                if (isPw === true) setPwMessage('');
              }}
            />

            {isPw ? (
              <i className="fa-regular fa-circle-check absolute top-18 right-[17px] h-[37px] w-[37px] text-[37px] text-blue z-20"></i>
            ) : (
              <i className="fa-regular fa-circle-xmark absolute top-18 right-[17px] h-[37px] w-[37px] text-[37px] text-[#F92316] z-20"></i>
            )}
          </div>
          <div>
            {updatePw.length > 0 && (
              <div className="my-[6px] text-[16px] text-[#F92316] font-hairline">
                {pwMessage}
              </div>
            )}
          </div>

          <div className="mt-[10px] relative flex justify-center items-center z-10">
            <UserInfoInput
              inputVal={checkPw}
              type="password"
              placeholder="비밀번호 확인"
              size="medium"
              borderColor="blue"
              focusBorderColor={''}
              onChange={e => {
                setCheckPw(e.target.value);
                validatepwCheck(e.target.value);
              }}
            />
          </div>
          {checkPw.length > 0 && (
            <div className="text-[16px] my-[6px] text-[#F92316] font-hairline">
              {pwCheckMessage}
            </div>
          )}

          <div className="text-xs text-center mb-2 text-white">
            {allCheckMessag}
          </div>

          <CustomizedButtons
            size="large"
            fontcolor="white"
            fontSize="24px"
            BtnName="저장하기"
            btnbg="#0078FF"
            btnhoverbg="navy"
            btnactivebg={''}
            borderradius="28.5px"
            onClick={saveBtnHandler}
          />
        </div>
      </Modal>
    </>
  );
}

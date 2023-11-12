import { putAPI } from '@/apis/axios';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { useState } from 'react';
import { changedPw } from '@/types/myPage';
import { validatePw } from '@/hooks/useValidation'
import { useMobile, useModalState } from '@/hooks';
import { toast } from 'react-toastify';

export default function ChangePwModal() {
  const newPwModal = useModalState();
  const [updatePw, setUpdatePw] = useState('');
  const [checkPw, setCheckPw] = useState('');

  const [isPw, setIsPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [pwMessage, setPwMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  // const [allCheckMessag, setAllCheckMessag] = useState('');
  const isMobile = useMobile(); 

  const data = {
    newPassword: updatePw,
    newCheckPassword: checkPw,
  };

  const putPw = async (pw: changedPw) => {
    try {
      await putAPI('/api/member/update/password', pw);
      // console.log(response);
      toast.success('비밀번호 변경 완료!!');
    } catch (error) {
      // console.error('Error:', error);
    }
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
      setPwCheckMessage('입력값을 확인해주세요.');
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
    setPwMessage('');
    setPwCheckMessage('');
  };

  return (
    <>
      <button
        onClick={newPwModal.open}
        className="bg-blue rounded-r-md text-[24px] text-white hover:bg-navy w-[131px] h-[72px] sm:w-[65px] sm:h-[36px] sm:text-xs"
      >
        변경하기
      </button>
      <Modal
        onRequestClose={closeModal}
        width={!isMobile? '713px' : '356px'}
        height={!isMobile? '442px' : '230px'}
        bgColor="#F1F8FF"
        isOpen={newPwModal.isOpen}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[34px] py-[42px] font-extrabold text-blue sm:text-[16px] sm:py-[21px]">비밀번호 변경하기</h1>

          <div className='pb-[] flex flex-col justify-center items-center gap-[34px] sm:gap-[22px]'>
            <div className='relative'>
              <div className="relative flex justify-center items-center">
                <UserInfoInput
                  inputVal={updatePw}
                  type="password"
                  placeholder="비밀번호"
                  size="medium"
                  borderColor="blue"
                  focusBorderColor={''}
                  onChange={e => {
                    setUpdatePw(e.target.value);
                    setIsPw(validatePw(e.target.value));
                    !isMobile? (
                      setPwMessage('영소문자/숫자/특수문자 각각 1가지 이상 포함 8자리 이상 20자리 이하')
                    ) : (
                      setPwMessage('영소문자/숫자/특수문자 각각 1가지 이상 포함 8-20자리')
                    )
                    if (isPw === true) setPwMessage('');
                  }}
                />

                {isPw ? (
                  <i className="far fa-circle-check absolute top-18 right-[17px] text-[37px] text-blue z-20 sm:text-base "></i>
                ) : (
                  <i className="far fa-circle-xmark absolute top-18 right-[17px] text-[37px] text-red z-20 sm:text-base"></i>
                )}
              </div>

              {updatePw.length >= 0 && isPw===false && (
                <div className="pt-1 text-[16px] text-red font-hairline absolute right-0 sm:text-[10px] sm:pt-[2px]">
                  {pwMessage}
                </div>
              )}
            </div>
            
            <div className="relative">
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

            {checkPw.length >= 0 && (
              <div className="pt-1 text-[16px] text-red font-hairline absolute right-0 sm:text-[10px] sm:pt-[2px]">
                {pwCheckMessage}
              </div>
            )}
            </div>
          
          
            {/* <div className="text-xs text-center mb-2 text-white">
              {allCheckMessag}
            </div> */}

            <CustomizedButtons
              size="large"
              fontcolor="white"
              fontSize={!isMobile?'24px':'10px'}
              BtnName="저장하기"
              btnbg="#0078FF"
              btnhoverbg="navy"
              btnactivebg={''}
              borderradius="28.5px"
              onClick={saveBtnHandler}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

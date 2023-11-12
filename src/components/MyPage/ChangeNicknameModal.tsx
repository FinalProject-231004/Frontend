import { postAPI, putAPI } from '@/apis/axios';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { ChangeEvent, useState } from 'react';
import { newNickname } from '@/types/myPage';
import { AxiosError } from 'axios';
import { useMobile, useModalState } from '@/hooks';
import { validateNickName } from '@/hooks/useValidation'
import { useRecoilState } from 'recoil';
import { userNickNameState } from '@/recoil/atoms/userInfoAtom';
import { toast } from 'react-toastify';

export default function ChangeNicknameModal() {
  const newNicknameModal = useModalState();
  const [newNickname, setNewNickname] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [availableMsg, setAvailableMsg] = useState('');
  const [oriNickname,setOriNickname] = useRecoilState(userNickNameState);
  const isMobile = useMobile(); 

  const updateNickname = {
    newNickname: newNickname,
  };

  const duplicateVerify = async (nickName: newNickname) => {
    try {
      await postAPI('/api/member/validate/nickname', nickName);
      // console.log(response);
      setErrorMsg('');
      setAvailableMsg('사용 가능한 닉네임입니다!');
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.error('Axios Error:', error.response?.data);
        setErrorMsg(error.response?.data.msg);
      } else {
        // console.error('Unknown Error:', error);
      }
    }
  };

  const putNickname = async (nickName: newNickname) => {
    try {
      await putAPI('/api/member/update/nickname', nickName);
      // console.log(response);
      setOriNickname(newNickname);
      toast.success('닉네임 변경 완료!!');
      closeModal();
    } catch (error) {
      if (error instanceof AxiosError) {
      //  console.error('Error:', error.response);
       setErrorMsg(error.response?.data.msg);
      //  console.log('errorMsg', errorMsg)
      }
    }
  };

  const nicknameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nickNameValue = e.target.value
    setNewNickname(nickNameValue);
    const isValNickName = validateNickName(nickNameValue);
    if (!isValNickName && nickNameValue.length >= 2) {
      setAvailableMsg('')
      setErrorMsg('한글/숫자/소문자 한 가지 이상 2자 이상 5자 이하');
    } else if(!isValNickName && nickNameValue.length < 2) {
      setAvailableMsg('')
      setErrorMsg('한글/숫자/소문자 한 가지 이상 2자 이상 5자 이하');
    } 
    else {
      setErrorMsg('');
    }
  };

  const closeModal = () => {
    newNicknameModal.close();
    setNewNickname('');
    setAvailableMsg('');
    setErrorMsg('');
  };

  return (
    <>
      <button
        onClick={newNicknameModal.open}
        className="bg-blue rounded-r-md text-[24px] text-white hover:bg-navy w-[131px] h-[72px] sm:w-[65px] sm:h-[36px] sm:text-xs"
      >
        변경하기
      </button>
      <Modal
        onRequestClose={closeModal}
        width={!isMobile? '713px' : '356px'}
        height={!isMobile? '368px' : '184px'}
        bgColor="#F1F8FF"
        isOpen={newNicknameModal.isOpen}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="py-[46px] text-[34px] font-extrabold text-blue sm:text-[16px] sm:py-[23px]">닉네임 변경하기</h1>

          <div className="relative">
            <div className="w-[530px] relative flex justify-center items-center z-10 sm:w-full">
              <UserInfoInput
                inputVal={newNickname}
                type="text"
                placeholder={oriNickname}
                size="medium"
                borderColor="blue"
                focusBorderColor={''}
                onChange={e => {
                  nicknameOnChange(e);
                  if (errorMsg) setAvailableMsg('');
                }}
              />
              <button
                className="w-[131px] h-[72px] rounded-r-[6px] bg-[#3E3E3E] text-white text-[24px] absolute z-20 right-0 sm:w-[65px] sm:h-[35px] sm:text-xs"
                onClick={() => {
                  duplicateVerify(updateNickname);
                }}
              >
                중복확인
              </button>
            </div>
            {newNickname.length >= 0 && (
              <div className="my-[6px] absolute right-0 text-[16px] text-[#F92316] font-hairline sm:text-[10px] sm:my-[3px]">
                {errorMsg}
              </div>
            )}
            <div
              className="my-[6px] absolute text-[16px] right-0 font-hairline sm:text-[10px] sm:my-[3px]"
              // style={{ color: isNicknameAvailable === true ? 'blue' : isNicknameAvailable === false ? '#0078FF' : '#F92316' }}
            >
              {availableMsg}
            </div>
          </div>

          <div className="pt-[60px] sm:pt-[30px]">
            <CustomizedButtons
              size="large"
              fontcolor="white"
              fontSize={!isMobile?'24px':'10px'}
              BtnName="저장하기"
              btnbg="#0078FF"
              btnhoverbg={''}
              btnactivebg={''}
              borderradius="28.5px"
              onClick={() => {
                putNickname(updateNickname);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

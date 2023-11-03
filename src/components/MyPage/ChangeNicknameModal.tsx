import { postAPI, putAPI } from '@/apis/axios';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { ChangeEvent, useState } from 'react';
import { newNickname } from '@/types/myPage';
import { AxiosError } from 'axios';
import { useModalState } from '@/hooks';
import { useSetRecoilState } from 'recoil';
import { userNickNameState } from '@/recoil/atoms/userInfoAtom';

export default function ChangeNicknameModal() {
  const newNicknameModal = useModalState();
  const [newNickname, setNewNickname] = useState('');
  const [isNickName, setIsNickName] = useState(false);
  const [conditionMsg, setConditionMsg] = useState('');
  const [duplicateMsg, setDuplicateMsg] = useState('');
  // const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const setNickname = useSetRecoilState(userNickNameState);

  const updateNickname = {
    newNickname: newNickname,
  };

  const duplicateVerify = async (nickName: newNickname) => {
    try {
      await postAPI('/api/member/validate/nickname', nickName);
      // console.log(response);
      setDuplicateMsg('사용 가능한 닉네임입니다!');
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.error('Axios Error:', error.response?.data);
        // if (error.response && error.response.data.errorMessage) {
        //   setDuplicateMsg('이미 사용 중인 닉네임입니다!');
        // } else if(error.response && error.response.data.msg) {
        //   setConditionMsg('한글/영소문자/숫자 포함 2자리 이상 5자리 이하');
        // }
      } else {
        // console.error('Unknown Error:', error);
      }
    }
  };

  const putNickname = async (nickName: newNickname) => {
    try {
      await putAPI('/api/member/update/nickname', nickName);
      // console.log(response);
      setNickname(newNickname);
      closeModal();
    } catch (error) {
      // console.error('Error:', error);
    }
  };

  const validateNickName = (id: string) => {
    const pattern = /^(?=.*[a-z\uAC00-\uD7A3\d]).{2,5}$/;
    setIsNickName(pattern.test(id));
  };

  const nicknameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
    validateNickName(e.target.value);
    setConditionMsg('한글/영소문자/숫자 포함 2자리 이상 5자리 이하');
    if (isNickName === true) setConditionMsg('');
  };

  const closeModal = () => {
    newNicknameModal.close();
    setNewNickname('');
    setDuplicateMsg('');
  };

  return (
    <>
      <button
        onClick={newNicknameModal.open}
        className="bg-blue rounded-r-md text-[24px] text-white hover:bg-navy w-[131px] h-[72px]"
      >
        변경하기
      </button>
      <Modal
        onRequestClose={closeModal}
        width="713px"
        height="368px"
        bgColor="#F1F8FF"
        isOpen={newNicknameModal.isOpen}
      >
        <div className="h-[368px] flex flex-col justify-center items-center">
          <h1 className="mb-[46px] text-[34px] text-blue">닉네임 변경하기</h1>

          <div className="relative">
            <div className="w-[530px] relative flex justify-center items-center z-10">
              <UserInfoInput
                inputVal={newNickname}
                type="text"
                placeholder="닉네임"
                size="medium"
                borderColor="blue"
                focusBorderColor={''}
                onChange={e => nicknameOnChange(e)}
              />
              <button
                className="w-[131px] h-[72px] rounded-r-[6px] bg-[#3E3E3E] text-white text-[24px] absolute z-20 right-0"
                onClick={() => {
                  duplicateVerify(updateNickname);
                }}
              >
                중복확인
              </button>
            </div>
            {newNickname.length > 0 && (
              <div className="my-[6px] absolute text-[16px] text-[#F92316] font-hairline">
                {conditionMsg}
              </div>
            )}
            <div
              className="my-[6px] absolute text-[16px] right-0 font-hairline"
              // style={{ color: isNicknameAvailable === true ? 'blue' : isNicknameAvailable === false ? '#0078FF' : '#F92316' }}
            >
              {duplicateMsg}
            </div>
          </div>

          <div className="mt-[60px]">
            <CustomizedButtons
              size="large"
              fontcolor="white"
              fontSize="24px"
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

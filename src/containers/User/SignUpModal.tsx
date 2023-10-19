import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalState';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import UserInfoInput from '@/components/common//UserInfoInput';
import { useEffect, useState } from 'react';
import { userNickNameState } from '@/recoil/userNickNameState';
import { postAPI } from '@/apis/axios';

function SignUpModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [idInput, idHandleChange] = useState<string>('');
  const [nickNameInput, nameHandleChange] = useRecoilState(userNickNameState);
  const [pwInput, pwHandleChange] = useState<string>('');
  const [pwCheckInput, pwCheckHandleChange] = useState<string>('');

  const [isNickName, setIsNickName] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);

  const [idMessage, setIdMessage] = useState('');
  const [nickNameMessage, setNickNameMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  const [allCheckMessag, setAllCheckMessag] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 유효성 검사
  const validateId = (id: string) => {
    const pattern = /^[a-z][a-z\d]{3,14}$/;
    setIsId(pattern.test(id));
  };
  const validateNickName = (id: string) => {
    const pattern = /^(?=.*[가-힣\d])[가-힣\d]{2,5}$/;
    setIsNickName(pattern.test(id));
  };
  const validatePw = (pw: string) => {
    const pattern =
      /^(?=.*[A-Za-z])(?=.*[\d])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~|/\\])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~|/\\]{8,20}$/;
    setIsPw(pattern.test(pw));
  };
  const validatepwCheck = (pwCheck: string) => {
    if (pwCheck === pwInput) {
      setIsPwCheck(true);
      setPwCheckMessage('');
    } else {
      setIsPwCheck(false);
      setPwCheckMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  // const validationClass = (isSuccess: boolean) => (isSuccess ? 'text-green-600' : 'text-red-600');

  type postData = {
    username: string;
    password: string;
    nickname: string;
  };

  const signUp = async (info: postData) => {
    try {
      const response = await postAPI('/api/member/signup', info);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const data = {
    username: idInput,
    password: pwInput,
    nickname: nickNameInput,
  };

  useEffect(() => {
    if (isId) setIdMessage('');
    if (isPw) setPwMessage('');
    if (isNickName) setNickNameMessage('');
  }, [isId, isPw, isNickName]);

  return (
    <>
      <Button
        size="small"
        fontColor="navy"
        BtnName="회원가입"
        BtnBg="transperate"
        BtnHoverBg=""
        BtnActiveBg=""
        borderRadius="18px"
        onClick={openModal}
      />
      <Modal
        onRequestClose={closeModal}
        width="713px"
        height="589px"
        bgColor="#0078FF"
      >
        <div>
          <UserInfoInput
            type="text"
            placeholder="아이디"
            size={''}
            focusBorderColor={''}
            inputVal={idInput}
            onChange={e => {
              idHandleChange(e.target.value);
              validateId(e.target.value);
              setIdMessage('알파벳 소문자/숫자 포함 4자리 이상 15자리 이하');
              if (isId === true) setIdMessage('');
            }}
          />
          {idInput.length >= 0 && (
            <div>
              {/* <div className={`message ${validationClass(isId)}`}>
                {idMessage}
              </div> */}
              {idMessage}
            </div>
          )}
        </div>

        <div>
          <UserInfoInput
            type="text"
            placeholder="닉네임"
            size={''}
            focusBorderColor={''}
            inputVal={nickNameInput}
            onChange={e => {
              nameHandleChange(e.target.value);
              validateNickName(e.target.value);
              setNickNameMessage('한글 또는 숫자 포함 2자리 이상 5자리 이하'); // 한글,숫자,영문 소문자 하나 이상 조합(공백 )으로 변경
              if (isNickName === true) setNickNameMessage('');
            }}
          />
          {nickNameInput.length >= 0 && <div>{nickNameMessage}</div>}
        </div>

        <div>
          <UserInfoInput
            type="password"
            placeholder="비밀번호"
            size={''}
            focusBorderColor={''}
            inputVal={pwInput}
            onChange={e => {
              pwHandleChange(e.target.value);
              validatePw(e.target.value);
              setPwMessage(
                '8자리 이상 20자리 이하에 영문/숫자/특수문자(공백 제외) 1가지 조합 이상 ',
              ); //알파벳 대소문자 숫자 특수문자
              if (isPw === true) setPwMessage('');
            }}
          />
          {pwInput.length >= 0 && <div>{pwMessage}</div>}
        </div>

        <div>
          <UserInfoInput
            type="password"
            placeholder="비밀번호 확인"
            size={''}
            focusBorderColor={''}
            inputVal={pwCheckInput}
            onChange={e => {
              pwCheckHandleChange(e.target.value);
              validatepwCheck(e.target.value);
            }}
          />
          {pwCheckInput.length >= 0 && <div>{pwCheckMessage}</div>}
        </div>

        <div>{allCheckMessag}</div>

        <Button
          size={''}
          fontColor={''}
          BtnName="가입하기"
          BtnBg="navy"
          BtnHoverBg={''}
          BtnActiveBg={''}
          borderRadius={''}
          onClick={() => {
            if (
              idInput === '' ||
              nickNameInput === '' ||
              pwInput === '' ||
              pwCheckInput === ''
            ) {
              setAllCheckMessag('모든 정보를 입력해주세요.');
              return;
            }
            if (!isId || !isNickName || !isPw || !isPwCheck) {
              setAllCheckMessag('입력값을 확인해주세요.');
              return;
            }
            signUp(data);
          }}
        />
      </Modal>
    </>
  );
}

export default SignUpModal;

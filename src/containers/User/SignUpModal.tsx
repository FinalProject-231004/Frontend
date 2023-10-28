import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginModalState, modalState } from '@/recoil/atoms/signUpModalAtom';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { useEffect, useState } from 'react';
import { postAPI } from '@/apis/axios';

function SignUpModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [idInput, idHandleChange] = useState<string>('');
  const [nickNameInput, nameHandleChange] = useState('');
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

  const setLoginModal = useSetRecoilState(loginModalState);

  const closeModal = () => {
    setIsOpen(false);
  };

  // 유효성 검사
  const validateId = (id: string) => {
    const pattern = /^[a-z][a-z\d]{4,14}$/;
    setIsId(pattern.test(id));
  };
  const validateNickName = (id: string) => {
    const pattern = /^(?=.*[a-z\uAC00-\uD7A3\d]).{2,5}$/;
    setIsNickName(pattern.test(id));
  };
  const validatePw = (pw: string) => {
    const pattern =
      /^(?=.*[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;:"<>,.?/~`])(?!.*\s).{8,20}$/;
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

  type postData = {
    username: string;
    password: string;
    nickname: string;
  };

  const signUp = async (info: postData) => {
    try {
      const response = await postAPI('/api/member/signup', info);
      console.log('Success:', response.data);
      setLoginModal(true);
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

  useEffect(() => {
    if (!isOpen) {
      setLoginModal(true);
      idHandleChange('');
      nameHandleChange('');
      pwHandleChange('');
      pwCheckHandleChange('');
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        onRequestClose={closeModal}
        isOpen={isOpen}
        width="713px"
        height="589px"
        bgColor="#F1F8FF"
      >
        <div className="flex flex-col justify-around  items-center">
          <p className="my-[42px] text-[34px] text-blue">회원가입</p>

          <div className="w-[530px] h-[350px] flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <UserInfoInput
                  type="text"
                  placeholder="아이디"
                  size="small"
                  focusBorderColor={''}
                  inputVal={idInput}
                  onChange={e => {
                    idHandleChange(e.target.value);
                    validateId(e.target.value);
                    setIdMessage(
                      '알파벳 소문자/숫자 포함 4자리 이상 15자리 이하',
                    );
                    if (isId === true) setIdMessage('');
                  }}
                  borderColor={''}
                />
                {idInput.length >= 0 && (
                  <div className="mt-1 ml-1 text-[11.5px] text-blue font-hairline">
                    {idMessage}
                  </div>
                )}
              </div>

              <div>
                <UserInfoInput
                  type="text"
                  placeholder="닉네임"
                  size="small"
                  focusBorderColor={''}
                  inputVal={nickNameInput}
                  onChange={e => {
                    nameHandleChange(e.target.value);
                    validateNickName(e.target.value);
                    setNickNameMessage(
                      '한글 또는 숫자 포함 2자리 이상 5자리 이하',
                    ); // 한글,숫자,영문 소문자 하나 이상 조합(공백 )으로 변경
                    if (isNickName === true) setNickNameMessage('');
                  }}
                  borderColor={''}
                />
                {nickNameInput.length >= 0 && (
                  <div className="mt-1 ml-1 text-[11.5px] text-blue font-hairline">
                    {nickNameMessage}
                  </div>
                )}
              </div>
            </div>

            <div>
              <UserInfoInput
                type="password"
                placeholder="비밀번호"
                size="medium"
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
                borderColor={''}
              />
              {pwInput.length >= 0 && (
                <div className="mt-1 ml-1 text-[11.5px] text-blue font-hairline">
                  {pwMessage}
                </div>
              )}
            </div>

            <div>
              <UserInfoInput
                type="password"
                placeholder="비밀번호 확인"
                size="medium"
                focusBorderColor={''}
                borderColor={''}
                inputVal={pwCheckInput}
                onChange={e => {
                  pwCheckHandleChange(e.target.value);
                  validatepwCheck(e.target.value);
                }}
              />
              {pwCheckInput.length >= 0 && (
                <div className="mt-1 ml-1 text-[11.5px] text-blue font-hairline">
                  {pwCheckMessage}
                </div>
              )}
            </div>

            <div className="text-xs text-center mb-2 text-blue">
              {allCheckMessag}
            </div>
          </div>

          <CustomizedButtons
            size="signUp"
            fontcolor="white"
            fontSize="21px"
            BtnName="가입하기"
            btnbg="#0078ff"
            btnhoverbg={''}
            btnactivebg={''}
            borderradius="28.5px"
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
        </div>
      </Modal>
    </>
  );
}

export default SignUpModal;

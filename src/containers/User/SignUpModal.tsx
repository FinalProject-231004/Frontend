import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginModalState, modalState } from '@/recoil/atoms/signUpModalAtom';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { postAPI } from '@/apis/axios';
import axios, { AxiosError } from 'axios';
import { signUpData } from '@/types/header';
import { validateId, } from '@/hooks/useValidation';
import { useEnterKey } from '@/hooks/useEnterKey';
import { ToastContainer, toast } from 'react-toastify';

function SignUpModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [idInput, idHandleChange] = useState<string>('');
  const [nickNameInput, nameHandleChange] = useState('');
  const [pwInput, pwHandleChange] = useState<string>('');
  const [pwCheckInput, pwCheckHandleChange] = useState<string>('');

  const [isNickName, setIsNickName] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  // const [isPwCheck, setIsPwCheck] = useState(false);

  const [idMessage, setIdMessage] = useState('');
  const [nickNameMessage, setNickNameMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  // const [checkMsg, setCheckMsg] = useState(true);
  const [resultMsg, setResultMsg] = useState('');
  // const checkMsgColor = checkMsg ? 'blue' : 'red';

  const setLoginModal = useSetRecoilState(loginModalState);

  // 각 입력 필드에 대한 참조 생성
  const idInputRef = useRef<HTMLInputElement>(null);
  const nickNameInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const pwCheckInputRef = useRef(null);

  // Tab 키로 다음 입력 필드로 이동하는 함수
  useEffect(() => {
    // 첫 번째 input에 포커스를 설정하기 전에 ref의 존재 여부를 확인
    if (idInputRef.current) {
      idInputRef.current.focus();
    }
  }, []);

  const handleTab = (event: React.KeyboardEvent, nextRef: React.RefObject<HTMLInputElement> | null) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else {
        // 마지막 input에서 Tab을 눌렀을 경우, 첫 번째 input으로 돌아가도록 설정
        idInputRef.current?.focus();
      }
    }
  };
  
  // 유효성 검사
  // const validateId = (id: string) => {
  //   const pattern = /^[a-z][a-z\d]{3,14}$/;
  //   setIsId(pattern.test(id));
  // };
  const validateNickName = (id: string) => {
    const pattern = /^(?=.*[a-z\uAC00-\uD7A3\d]).{2,5}$/;
    setIsNickName(pattern.test(id));
  };
  const validatePw = (pw: string) => {
    const pattern = /^(?=.*[a-z])(?=.*\d)(?=.*\W).{8,20}$/;
    setIsPw(pattern.test(pw));
  };
  const validatepwCheck = (pwCheck: string) => {
    if (pwCheck === pwInput) {
      // setIsPwCheck(true);
      setPwCheckMessage('');
    } else {
      // setIsPwCheck(false);
      setPwCheckMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  const notifySuccess = () => toast.success('회원가입 완료!!🎉', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

    type ErrorResponse = {
      errorMessage: string;
      // 서버가 반환할 수 있는 다른 속성들...
    }

  const signUp = async (info: signUpData) => {
    try {
      await postAPI('/api/member/signup', info);
      // console.log('Success:', response.data);
      setLoginModal(true);
      notifySuccess();
      return(
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
          />
      )
    } catch (error: unknown) { 
      if (axios.isAxiosError(error)) {
        // Axios 오류 처리
        const serverError = error as AxiosError<ErrorResponse>;
        if (serverError && serverError.response) {
          // console.error('Error:', serverError.response.data.errorMessage);
          setResultMsg(serverError.response.data.errorMessage);
        }
      } else {
        // console.error('An unexpected error occurred');
      }
    }
  };

  const data = {
    username: idInput,
    password: pwInput,
    nickname: nickNameInput,
    checkPassword: pwCheckInput,
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
      setResultMsg('');
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signUp(data);
  };

  const enterKeyHandler = useEnterKey(handleSubmit);

  return (
    <>
      <Modal
        onRequestClose={closeModal}
        isOpen={isOpen}
        width="713px"
        height="589px"
        bgColor="#F1F8FF"
      >
        <form onSubmit={handleSubmit} onKeyDown={enterKeyHandler} className="flex flex-col justify-around items-center">
          <p className="my-[42px] text-[34px] text-blue">회원가입</p>

          <div className="w-[530px] h-[337px] mb-[9px] flex flex-col justify-between relative">
            <div className="flex justify-between">
              <div className='relative'>
                <UserInfoInput
                  ref={idInputRef}
                  type="text"
                  placeholder="아이디"
                  size="small"
                  focusBorderColor='red'
                  inputVal={idInput}
                  borderColor='none'
                  onChange={e => {
                    const idValue = e.target.value;
                    idHandleChange(idValue);
                    setIsId(validateId(idValue)); 
                    setIdMessage('알파벳 소문자 또는 숫자 포함 4자 이상 15자 이하');
                    if (isId === true) {setIdMessage(''); }
                  }}
                  onKeyDown={(e) => handleTab(e, nickNameInputRef)}
                />
                {idInput.length >= 0 && (
                  <div className="mt-1 ml-1 text-[11.5px] text-red font-hairline absolute">
                    {idMessage}
                  </div>
                )}
              </div>

              <div className='relative'>
                <UserInfoInput
                  ref={nickNameInputRef}
                  type="text"
                  placeholder="닉네임"
                  size="small"
                  focusBorderColor={''}
                  borderColor='none'
                  inputVal={nickNameInput}
                  onChange={e => {
                    nameHandleChange(e.target.value);
                    validateNickName(e.target.value);
                    setNickNameMessage(
                      '한글/숫자/소문자 한 가지 이상 2자 이상 5자 이하',
                    );
                    if (isNickName === true) setNickNameMessage('');
                  }}
                  onKeyDown={(e) => handleTab(e, pwInputRef)}
                />
                {nickNameInput.length >= 0 && (
                  <div className="mt-1 ml-1 text-[11.5px] text-red font-hairline absolute">
                    {nickNameMessage}
                  </div>
                )}
              </div>
            </div>

            <div className='relative'>
              <UserInfoInput
                ref={pwInputRef}
                type="password"
                placeholder="비밀번호"
                size="medium"
                focusBorderColor={''}
                inputVal={pwInput}
                borderColor='none'
                onChange={e => {
                  pwHandleChange(e.target.value);
                  validatePw(e.target.value);
                  setPwMessage(
                    '영소문자/숫자/특수문자(공백 제외) 각각 1가지 이상 포함 8자리 이상 20자리 이하',
                  );
                  if (isPw === true) setPwMessage('');
                }}
                onKeyDown={(e) => handleTab(e, pwCheckInputRef)}
              />
              {pwInput.length >= 0 && (
                <div className="mt-[6px] text-[11.5px] text-red font-hairline absolute right-0">
                  {pwMessage}
                </div>
              )}
            </div>
            
            <div className='relative h-[105px]'>
              <div className='relative'>
                <UserInfoInput
                  ref={pwCheckInputRef}
                  type="password"
                  placeholder="비밀번호 확인"
                  size="medium"
                  focusBorderColor={''}
                  borderColor='none'
                  inputVal={pwCheckInput}
                  onChange={e => {
                    pwCheckHandleChange(e.target.value);
                    validatepwCheck(e.target.value);
                  }}
                  onKeyDown={(e) => handleTab(e, null)}
                />
                {pwCheckInput.length >= 0 && (
                  <div className="mt-[6px] text-[12px] text-red font-hairline absolute right-0">
                    {pwCheckMessage}
                  </div>
                )}
              </div>
              <div className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] text-red'>{resultMsg}</div>
            </div>
          </div>
          
          <div className='h-[70px] flex flex-col items-center justify-between relative'>
            <CustomizedButtons
              type="submit"
              size="signUp"
              fontcolor="white"
              fontSize="21px"
              BtnName="가입하기"
              btnbg="#0078ff"
              btnhoverbg='#0e2958'
              btnactivebg={''}
              borderradius="28.5px"
              onClick={() => {}}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default SignUpModal;
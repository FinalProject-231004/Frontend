import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginModalState, modalState } from '@/recoil/atoms/signUpModalAtom';
import { CustomizedButtons, Modal, UserInfoInput } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { postAPI } from '@/apis/axios';
import axios, { AxiosError } from 'axios';
import { signUpData } from '@/types/header';
import { validateId, validateNickName, validatePw, validatePwCheck } from '@/hooks/useValidation';
import { useEnterKey } from '@/hooks/useEnterKey';
import { ToastContainer, toast } from 'react-toastify';
import { SignUpErrorResponse } from '@/types/header'
import * as React from "react";
import { PwVisibilityToggle } from '@/components'
import { useMobile } from '@/hooks';

function SignUpModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [idInput, idHandleChange] = useState<string>('');
  const [nickNameInput, nameHandleChange] = useState('');
  const [pwInput, pwHandleChange] = useState<string>('');
  const [pwCheckInput, pwCheckHandleChange] = useState<string>('');

  const [isNickName, setIsNickName] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);

  const [idMessage, setIdMessage] = useState('');
  const [nickNameMessage, setNickNameMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  const [resultMsg, setResultMsg] = useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const [showCheckPw, setShowCheckPw] = React.useState(false);
  // const checkMsgColor = checkMsg ? 'blue' : 'red';
  const isMobile = useMobile();

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
        const serverError = error as AxiosError<SignUpErrorResponse>;
        if (serverError && serverError.response) {
          // console.error('Error:', serverError.response);
          setPwCheckMessage(serverError.response.data.msg);
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
        width={isMobile? '343px':'713px'}
        height={isMobile? '350px' : '589px'}
        bgColor="#F1F8FF"
      >
        <form onSubmit={handleSubmit} onKeyDown={enterKeyHandler} className="flex flex-col justify-around items-center">
          <p className="text-[34px] text-blue font-extrabold py-9 sm:py-4 sm:text-base">회원가입</p>

          <div className="flex flex-col justify-between gap-6 relative sm:gap-0">
            
            <div className="flex justify-between sm:flex-col sm:items-end">
              {!isMobile ? (
                <>
                  <div className='relative'>
                    <label htmlFor='userId' className='text-deep_dark_gray sm:text-xs '>아이디</label>
                    <UserInfoInput
                      id = 'userId'
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
                        const isValid = validateId(idValue);
                        setIsId(isValid);
                        if (!isValid && idValue.length >= 4) {
                          setIdMessage('알파벳 소문자/숫자 포함 4자리 이상 15자리 이하');
                        } else if(!isValid && idValue.length < 4) {
                          setIdMessage('알파벳 소문자/숫자 포함 4자리 이상 15자리 이하');
                        } else {
                          setIdMessage('');
                        }
                      }}
                      onKeyDown={(e) => handleTab(e, nickNameInputRef)}
                    />
                    {idInput.length >= 0 && (
                    <div className="ml-1 text-[11.5px] text-red font-hairline absolute">
                      {idMessage}
                    </div>)}
                  </div>
                  <div className='relative'>
                    <label htmlFor='userNickname' className='text-deep_dark_gray sm:text-xs'>닉네임</label>
                    <UserInfoInput
                      id = 'userNickname'
                      ref={nickNameInputRef}
                      type="text"
                      placeholder="닉네임"
                      size="small"
                      focusBorderColor={''}
                      borderColor='none'
                      inputVal={nickNameInput}
                      onChange={e => {
                        const nickanemValue = e.target.value;
                        nameHandleChange(nickanemValue);
                        const isValNickname = validateNickName(nickanemValue);
                        setIsNickName(isValNickname);
                        if (!isValNickname && nickanemValue.length >= 2) {
                          setNickNameMessage('한글/숫자/소문자 한 가지 이상 2자 이상 5자 이하');
                        } else if(!isValNickname && nickanemValue.length < 2) {
                          setNickNameMessage('한글/숫자/소문자 한 가지 이상 2자 이상 5자 이하');
                        } else {
                          setNickNameMessage('');
                        }
                      }}
                      onKeyDown={(e) => handleTab(e, pwInputRef)}
                    />
                    {nickNameInput.length >= 0 && (
                      <div className="ml-1 text-[11.5px] text-red font-hairline absolute">
                        {nickNameMessage}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className='flex justify-center items-center gap-3'>
                    <div>
                      <label htmlFor='userId' className='text-deep_dark_gray text-xs '>아이디</label>
                      <UserInfoInput
                        id = 'userId'
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
                          const isValid = validateId(idValue);
                          setIsId(isValid);
                          if (!isValid && idValue.length >= 4) {
                            setIdMessage('아이디: 알파벳 소문자/숫자 포함 4자리 이상 15자리 이하');
                          } else if(!isValid && idValue.length < 4) {
                            setIdMessage('아이디: 알파벳 소문자/숫자 포함 4자리 이상 15자리 이하');
                          } else {
                            setIdMessage('');
                          }
                        }}
                        onKeyDown={(e) => handleTab(e, nickNameInputRef)}
                      />
                    </div>
                    <div>
                      <label htmlFor='userNickname' className='text-deep_dark_gray text-xs'>닉네임</label>
                      <UserInfoInput
                        id = 'userNickname'
                        ref={nickNameInputRef}
                        type="text"
                        placeholder="닉네임"
                        size="small"
                        focusBorderColor={''}
                        borderColor='none'
                        inputVal={nickNameInput}
                        onChange={e => {
                          const nickanemValue = e.target.value;
                          nameHandleChange(nickanemValue);
                          const isValNickname = validateNickName(nickanemValue);
                          setIsNickName(isValNickname);
                          if (!isValNickname && nickanemValue.length >= 2) {
                            setNickNameMessage('닉네임: 한글/숫자/소문자 한 가지 이상 2자 이상 5자 이하');
                          } else if(!isValNickname && nickanemValue.length < 2) {
                            setNickNameMessage('닉네임: 한글/숫자/소문자 한 가지 이상 2자 이상 5자 이하');
                          } else {
                            setNickNameMessage('');
                          }
                        }}
                        onKeyDown={(e) => handleTab(e, pwInputRef)}
                      />
                    </div>
                  </div>
                  <div className='text-[10px] text-red font-hairline pt-1'>
                    {idInput.length >= 0 && (
                      <p>{idMessage}</p>
                    )}
                    {nickNameInput.length >= 0 && (
                      <p>{nickNameMessage}</p>
                    )}
                  </div>
                </>
              )} 
            </div>

            <div className='sm:pb-3'>
              <label htmlFor='userPw' className='text-deep_dark_gray sm:text-xs'>비밀번호</label>
              <div className=' flex items-center'>
                <UserInfoInput
                  id = 'userPw standard-adornment-password'
                  ref={pwInputRef}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호"
                  size="medium"
                  focusBorderColor={''}
                  inputVal={pwInput}
                  borderColor='none'
                  onChange={e => {
                    const pwValue = e.target.value; 
                    pwHandleChange(pwValue);
                    const isValPw = validatePw(pwValue);
                    setIsPw(isValPw);
                    if (!isValPw && pwValue.length >= 8) {
                      setPwMessage('영소문자/숫자/특수문자 각각 1가지 이상 포함 8-20자리');
                    } else if(!isValPw && pwValue.length < 8) {
                      setPwMessage('영소문자/숫자/특수문자 각각 1가지 이상 포함 8-20자리');
                    } else {
                      setPwMessage('');
                    }
                  }}
                  onKeyDown={(e) => handleTab(e, pwCheckInputRef)}
                />
                <PwVisibilityToggle showPassword={showPassword} setShowPassword={setShowPassword} />
              </div>
                  
              {pwInput.length >= 0 && (
                <div className="text-[11.5px] text-red font-hairline absolute right-0 sm:text-[10px]">
                  {pwMessage}
                </div>
              )}
            </div>
            
            <div className='sm:pb-3'>
              <div className=''>
                <label htmlFor='checkPw' className='text-deep_dark_gray sm:text-xs'>비밀번호 확인</label>
                <div className=' flex items-center relative'>
                  <UserInfoInput
                    id = 'checkPw'
                    ref={pwCheckInputRef}
                    type={showCheckPw ? 'text' : 'password'}
                    placeholder="비밀번호 확인"
                    size="medium"
                    focusBorderColor={''}
                    borderColor='none'
                    inputVal={pwCheckInput}
                    onChange={e => {
                      const checkPwValue = e.target.value; 
                      pwCheckHandleChange(checkPwValue);
                      const isCheckPw = validatePwCheck(pwInput,checkPwValue);
                      isCheckPw? setPwCheckMessage('') : setPwCheckMessage('비밀번호가 일치하지 않습니다.')
                    }}
                    onKeyDown={(e) => handleTab(e, null)}
                  />
                  <PwVisibilityToggle showPassword={showCheckPw} setShowPassword={setShowCheckPw} />
                </div>
                {pwCheckInput.length >= 0 && (
                  <div className="mt-[2px] text-[11.5px] text-red font-hairline absolute right-0 text-right sm:text-[10px]">
                    {pwCheckMessage}
                  </div>
                )}
              </div>
              <div className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red'>{resultMsg}</div>
            </div>
          </div>
          
          <div className='pt-11 pb-7 flex flex-col items-center justify-between relative sm:pt-5 sm:pb-0'>
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
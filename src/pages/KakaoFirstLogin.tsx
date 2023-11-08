import { postAPI } from '@/apis/axios';
import { UserInfoInput } from '@/components';
import { kakaoVarifyPw } from '@/types/myPage';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { validatePw, validatePwCheck } from '@/hooks/useValidation';
import 'react-toastify/dist/ReactToastify.css';
import { useEnterKey } from '@/hooks/useEnterKey';

export default function KakaoFirstLogin() {
  const [kakaopwInput, setKakaoPwInput] = useState('');
  const [newPwInput, setNewPwInput] = useState('');
  const [checkPwInput, setCheckPwInput] = useState('');
  const [pwMessage, setMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');

  const navigate = useNavigate();

  const success = () =>
    toast.success('변경 완료!!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const wrongPw = () =>
    toast.error('비밀번호가 일치하지 않습니다.', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const validateInfo = {
    password: kakaopwInput,
    newPassword: newPwInput,
    newCheckPassword: checkPwInput,
  };

  const postPw = async (info: kakaoVarifyPw) => {
    try {
      await postAPI('/api/member/kakao/first-login', info);
      // console.log(response);
      success();
      navigate('/');
      return (
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      );
    } catch (error) {
      // console.error('카카오 에러:', error);
      wrongPw();
      return (
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      );
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    postPw(validateInfo);
  };

  const enterKeyHandler = useEnterKey(handleSubmit);

  return (
    <div className="w-screen min-h-[1080px] mx-auto flex justify-center items-center">
    <div className="w-[896px] h-[781px] mx-auto flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className='text-[32px] text-blue font-extrabold'>카카오 비밀번호 설정</h1>
      </div>
      <form className="flex flex-col justify-center items-center gap-[46px]" onSubmit={handleSubmit} onKeyDown={enterKeyHandler}>
        <div className="w-full py-16 flex flex-col justify-center items-center gap-[25px]">
          
          <div className="w-[896px] h-[155px] relative">
            <p className="w-full text-2xl mb-[12px]">현재 비밀번호</p>
            <UserInfoInput
              inputVal={kakaopwInput}
              onChange={e => {
                setKakaoPwInput(e.target.value);
              }}
              type="password"
              placeholder="비밀번호"
              size="xl"
              borderColor={''}
              focusBorderColor={''}
            />
             <div className="text-[12px] text-deep-dark-gray text-right font-hairline absolute right-0 bottom-0">
              카카오 신규회원은 사이트의 원활한 사용을 위해 초기 비밀번호를 변경해주세요|
              초기 비밀번호는 <span className='text-blue'>"카카오계정 앞 2자리" + "quiz8@@"</span>입니다. <br />
              ex. 카카오계정: <span className='text-blue'>ab</span>cd123@naver.com 
              퀴즈팝 초기 비밀번호: <span className='text-blue'>"abquiz8@@"</span>
            </div>
          </div>

          <div className="w-[896px] h-[137px] relative">
            <label htmlFor='newPassword' className="w-full text-2xl ">변경할 비밀번호</label>
            <div className='mt-[12px]'>
              <UserInfoInput
                id='newPassword'
                inputVal={newPwInput}
                onChange={e => {
                  const newPassword = e.target.value;
                  setNewPwInput(newPassword);
                  validatePw(newPassword) ? setMessage('') : setMessage('영소문자/숫자/특수문자(공백 제외) 각각 1가지 이상 포함 8자리 이상 20자리 이하')
                }}
                type="password"
                placeholder="변경할 비밀번호"
                size="xl"
                borderColor={''}
                focusBorderColor={''}
              />
            </div>
            <div className="text-[12px] text-red font-hairline absolute right-0 bottom-0">
              {pwMessage}
            </div>
          </div>

          <div className="w-[896px] h-[137px] relative">
            <label htmlFor='checkPw' className="w-full text-2xl mb-[12px]">비밀번호 확인</label>
            <div className='mt-[12px]'>
              <UserInfoInput
                id='checkPw'
                inputVal={checkPwInput}
                onChange={e => {
                  const checkPassword = e.target.value;
                  setCheckPwInput(checkPassword);
                  validatePwCheck(checkPassword, newPwInput) ? setPwCheckMessage('') : setPwCheckMessage('비밀번호가 일치하지 않습니다.');
                }}
                type="password"
                placeholder="비밀번호 확인"
                size="xl"
                borderColor={''}
                focusBorderColor={''}
              />
            </div>
            {checkPwInput.length >= 0 && (
              <div className="text-[12px] text-red font-hairline absolute right-0 bottom-0">
                {pwCheckMessage}
              </div>
            )}
          </div>
        </div>
        
        <div className='w-[414px] flex justify-between'>
          <button type='submit' className='w-[130px] h-[72px] border-[1.5px] border-blue rounded-[6px] px-[15px] py-[17px] text-[24px] text-blue hover:bg-blue hover:text-white'
            onClick={() => {
              sessionStorage.setItem('selectedTab', 'info');  
              postPw(validateInfo);
            }}
          >
            확인하기
          </button>
          <button type='button' className='w-[197px] h-[72px] border-[1.5px] border-blue rounded-[6px] text-[24px] text-blue hover:bg-blue hover:text-white'
          onClick={() => { navigate('/')}}
          >
            다음에 변경하기
          </button>
        </div>
      </form>
    </div>
  </div>


    // <div className="w-[1920px] h-[1080px] mx-auto">
    //   <div className="w-[1080px] mx-auto flex flex-col justify-center items-center">
    //     <div className="w-full mt-24 mb-5 text-center">
    //       <h1 className='text-[32px] text-blue mb-4'>카카오 비밀번호 설정</h1>
    //       <p className='text-[20px]'>
    //         카카오 신규회원은 사이트의 원활한 사용을 위해 초기 비밀번호를 변경해주세요. <br />
    //         초기 비밀번호는 "카카오계정 앞 <span className='text-blue'>2자리</span>" + <span className='text-[#22B465]'>"quiz8@@"</span>입니다.
    //         ex. 카카오계정: <span className='text-blue'>ab</span>cd123@naver.com <br />
    //         퀴즈팝 초기 비밀번호: "<span className='text-blue'>ab</span><span className='text-[#22B465]'>quiz8@@</span>" 
    //       </p> 
    //     </div>
    //     <div className="w-full flex flex-col justify-center items-center gap-10 ">
    //       <div className="w-full py-16 px-10 border-t-2 border-b flex flex-col justify-center items-center gap-9">
    //         <div className="w-[800px] h-[94px] flex justify-between items-center">
    //           <p className="w-full text-2xl">현재 비밀번호</p>
    //           <UserInfoInput
    //             inputVal={kakaopwInput}
    //             onChange={e => {
    //               setKakaoPwInput(e.target.value);
    //             }}
    //             type="password"
    //             placeholder="비밀번호"
    //             size="medium"
    //             borderColor={''}
    //             focusBorderColor={''}
    //           />
    //         </div>

    //         <div className='w-[800px] h-[94px] relative'>
    //           <div className="flex justify-between items-center">
    //             <p className="w-full text-2xl">변경할 비밀번호</p>
    //             <UserInfoInput
    //               inputVal={newPwInput}
    //               onChange={e => {
    //                 const newPassword = e.target.value;
    //                 setNewPwInput(newPassword);
    //                 validatePw(newPassword) ? setMessage('') : setMessage('영소문자/숫자/특수문자(공백 제외) 각각 1가지 이상 포함 8자리 이상 20자리 이하')
    //               }}
    //               type="password"
    //               placeholder="변경할 비밀번호"
    //               size="medium"
    //               borderColor={''}
    //               focusBorderColor={''}
    //             />
    //           </div>
    //           <div className="text-[13px] text-red font-hairline absolute right-0 bottom-0">
    //             {pwMessage}
    //           </div>
    //         </div>

    //         <div className='w-[800px] h-[94px] relative'>
    //           <div className='flex justify-between items-center'>
    //             <p className="w-full text-2xl">비밀번호 확인</p>
    //             <UserInfoInput
    //               inputVal={checkPwInput}
    //               onChange={e => {
    //                 const checkPassword = e.target.value;
    //                 setCheckPwInput(checkPassword);
    //                 validatePwCheck(checkPassword, newPwInput) ? setPwCheckMessage('') : setPwCheckMessage('비밀번호가 일치하지 않습니다.');
    //               }}
    //               type="password"
    //               placeholder="비밀번호 확인"
    //               size="medium"
    //               borderColor={''}
    //               focusBorderColor={''}
    //             />
    //           </div>
    //           {checkPwInput.length >= 0 && (
    //             <div className="text-[13px] text-red font-hairline absolute right-0 bottom-0">
    //               {pwCheckMessage}
    //             </div>
    //           )}
    //         </div>
    //       </div>
          
    //       <div className='w-[800px] flex items-center justify-end gap-3'>
    //         <CustomizedButtons
    //           size="signUp"
    //           fontcolor="white"
    //           fontSize="24px"
    //           BtnName="변경하기"
    //           btnbg="#0078ff"
    //           btnhoverbg={''}
    //           btnactivebg={''}
    //           borderradius="6px"
    //           onClick={() => {
    //             sessionStorage.setItem('selectedTab', 'info');  
    //             postPw(validateInfo);
    //           }}
    //         />
    //         <CustomizedButtons
    //           size="mileage"
    //           fontcolor="white"
    //           fontSize="24px"
    //           BtnName="다음에 변경하기"
    //           btnbg="#3E3E3E"
    //           btnhoverbg={''}
    //           btnactivebg={''}
    //           borderradius="6px"
    //           onClick={() => {
    //             navigate('/');
    //           }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

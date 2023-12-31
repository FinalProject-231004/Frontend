import { getAPI, postAPI } from '@/apis/axios';
import { UserInfoInput } from '@/components';
import { useEnterKey } from '@/hooks/useEnterKey';
import { nickName, varifyPw } from '@/types/myPage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyPassword() {
  const [nickName, setNickName] = useState('');
  const [pwInput, setPwInput] = useState('');
  const navigate = useNavigate();

  const success = () =>
    toast.success('인증 성공!!', {
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

  useEffect(() => {
    getNickName();
  }, []);

  const validateInfo = {
    enterPassword: pwInput,
  };

  const getNickName = async () => {
    try {
      const response = await getAPI<nickName>('/api/member/validatePassword');
      // console.log(response.data.data);
      setNickName(response.data.data);
    } catch (error) {
      // console.error('Error:', error);
    }
  };

  const postPw = async (info: varifyPw) => {
    try {
      await postAPI('/api/member/validate/password', info);
      // console.log(response);
      success();
      sessionStorage.setItem('selectedTab', 'info');
      navigate('/mypage');
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
      // console.error('Error:', error);
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
    <div className="w-screen h-screen mx-auto flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center sm:pt-[157px]">
        <div className="pb-[12px] flex flex-col justify-center items-center sm:pb-0">
          <h1 className='text-[32px] text-blue font-extrabold sm:text-[16px]'>비밀번호 재확인</h1>
        </div>
        <form className="flex flex-col justify-center items-center gap-[46px] sm:gap-[25px]" onSubmit={handleSubmit} onKeyDown={enterKeyHandler}>
          <div className="w-full py-16 flex flex-col justify-center items-center gap-[64px] sm:gap-[32px] sm:py-[32px]">
            <div className="w-[896px] flex flex-col justify-between items-center sm:w-full">
              <p className="w-full text-2xl mb-[12px] sm:text-sm sm:mb-[6px]">아이디</p>
              <UserInfoInput
                disabled={true}
                inputVal={nickName}
                onChange={() => {}}
                type="text"
                placeholder="아이디"
                size="xl"
                borderColor={''}
                focusBorderColor={''}
              />
            </div>
            <div className="w-[896px] flex flex-col justify-between items-center sm:w-full">
              <p className="w-full text-2xl mb-[12px] sm:text-sm sm:mb-[6px]">비밀번호</p>
              <UserInfoInput
                inputVal={pwInput}
                onChange={e => {
                  setPwInput(e.target.value);
                }}
                type="password"
                placeholder="비밀번호"
                size="xl"
                borderColor={''}
                focusBorderColor={''}
              />
            </div>
          </div>
          
          <div className='w-[300px] flex justify-between sm:w-[150px]'>
            <button type='submit' className='w-[130px] h-[72px] border-[1.5px] border-blue rounded-[6px] text-[24px] text-blue hover:bg-blue hover:text-white
              sm:w-[65px] sm:h-[36px] sm:text-xs sm:border
            '>
              확인하기
            </button>
            <button type='button' className='w-[130px] h-[72px] border-[1.5px] border-blue rounded-[6px] text-[24px] text-blue hover:bg-blue hover:text-white
            sm:w-[65px] sm:h-[36px] sm:text-xs sm:border'
            onClick={() => { navigate('/mypage')}}
            >
              취소하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

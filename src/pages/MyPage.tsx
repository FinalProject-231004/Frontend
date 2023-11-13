import { useEffect, useState } from 'react';
import MileageHistory from '@/components/MyPage/MileageHistory';
import UpdateMyInfo from '@/components/MyPage/UpdateMyInfo';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { userNickNameState } from '@/recoil/atoms/userInfoAtom';

export default function MyPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('mileage'); // 처음에는 마일리지를 선택한 상태로 설정
  const nickName = useRecoilValue(userNickNameState)

  useEffect(() => {
    const savedTab = sessionStorage.getItem('selectedTab');
    if (savedTab) {
      setSelected(savedTab);
      sessionStorage.removeItem('selectedTab'); // 저장된 값을 삭제
    }
  }, []);  

  return (
    <div className="w-[100vw] flex justify-center sm:items-center">
      <div className='flex pr-[250px] sm:flex-none sm:pr-0 sm:flex-col'>
        <aside className='mt-[148px] flex-shrink-0 sm:mt-[224px] sm:flex sm:flex-col sm:items-center sm:w-[100vw]'>
          <div className='text-[32px] mb-[105px] text-blue font-extrabold sm:mt-[44px] sm:mb-[42px] sm:text-[16px] sm:text-center'>안녕하세요,<br/>{nickName}님!</div>
          <ul className='text-[24px] w-[247px] sm:flex sm:text-xs sm:w-auto sm:gap-5'>
            <li 
              className={`border-b-2 pb-[20px] cursor-pointer sm:pb-[8px] ${selected === 'mileage' ? 'text-blue border-blue' : ''}`} 
              onClick={() => setSelected('mileage')}
            >
              마일리지
            </li>
            <li 
              className={`border-b-2 py-[20px] cursor-pointer sm:pt-0 sm:pb-[8px] ${selected === 'info' ? 'text-blue border-blue' : ''}`} 
              onClick={() => {
                setSelected('info');
                navigate('/mypage/verify-password');
              }}
            >
              내 정보 수정
            </li>
          </ul>
        </aside>  

        <main className="w-[1080px] sm:w-full">
          {selected === 'mileage' && <MileageHistory />}
          {selected === 'info' && <UpdateMyInfo />}
        </main>
        
      </div>
    </div>
  );
}

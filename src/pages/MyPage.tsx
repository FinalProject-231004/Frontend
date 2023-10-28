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
    <div className="w-[1920px] h-[1080px] mx-auto flex ">
      <aside className='mt-[148px] ml-[173px] flex-shrink-0'>
        <div className='text-[32px] mb-[105px] text-blue font-extrabold'>안녕하세요,<br/>{nickName}님!</div>
        <ul className='text-[24px] w-[247px]'>
          <li 
            className={`border-b-2 pb-[20px] cursor-pointer ${selected === 'mileage' ? 'text-blue border-blue' : ''}`} 
            onClick={() => setSelected('mileage')}
          >
            마일리지
          </li>
          <li 
            className={`border-b-2 py-[20px] cursor-pointer ${selected === 'info' ? 'text-blue border-blue' : ''}`} 
            onClick={() => {
              setSelected('info');
              navigate('/mypage/verify-password');
            }}
          >
            내 정보 수정
          </li>
        </ul>
      </aside>  

      <main className="w-[1080px]">
        {selected === 'mileage' && <MileageHistory />}
        {selected === 'info' && <UpdateMyInfo />}
      </main>
      
    </div>
  );
}

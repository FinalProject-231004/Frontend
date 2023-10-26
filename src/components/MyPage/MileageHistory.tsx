// import { useNavigate } from 'react-router';
import { useState } from 'react';
// import MileageRewardHistory from './MileageRewardHistory';
// import MileageUsageHistory from './MileageUsageHistory';
import { useRecoilValue } from 'recoil';
import { userMileageState } from '@/recoil/atoms/userInfoAtom';
import HistoryList from './HistoryList';
import { getAPI } from '@/apis/axios';

export default function MileageHistory() {
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('usage'); 
  const mileageValue = useRecoilValue(userMileageState);

  const MileageUsage = async () => {
    try {
      const response = await getAPI('/api/mypage/purchase-history');
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div className="h-full mt-[246px] flex flex-col items-center justify-start ">
      <div className='mb-[60px]'>
        <p className='text-[28px] text-blue mb-[12px]'>마일리지</p>

        <div className='flex justify-between w-[988px]'>
          <div className='w-[620px] h-[70px] py-[22px] px-[25px] flex justify-between items-center  border-[1.5px] border-blue rounded-[6px] bg-white text-[24px]'>
            <p className='text-blue'>{mileageValue}원</p>
            <p className='text-[#D3D3D3]'>2023.10.26 업데이트 기준</p>
          </div>
          <button className='w-[347px] h-[72px] border-0 rounded-[6px] cursor-pointer bg-blue text-white text-[24px]'
            // onClick={()=>navigate('/mileageShop')}
          >
            내 마일리지 사용하러 가기
          </button>
        </div>
      </div>

      <div>
        <div className='flex justify-between'>
          <h1 className='text-[28px] text-blue mb-2 '>마일리지 이용내역</h1>
          <div className='flex'>
            <p className={`w-[47px] h-[22px] border-r-2 border-blue text-[18px] cursor-pointer ${activeTab === 'usage' ? 'text-blue' : ''}`}
               onClick={() => {
                setActiveTab('usage');
                MileageUsage
              }}
            >
              사용
            </p>
            <p className={`w-[47px] text-[18px] cursor-pointer ${activeTab === 'reward' ? 'text-blue' : ''}`}
               onClick={() => setActiveTab('reward')}
            >
              적립
            </p>
          </div>
        </div>
        
        {activeTab === 'usage' && <HistoryList cost={''} title={''} count={''} email={''} date={''} />}
        {activeTab === 'reward' && <HistoryList cost={''} title={''} count={''} email={''} date={''} />}
      </div>
      
    </div>
  )
}

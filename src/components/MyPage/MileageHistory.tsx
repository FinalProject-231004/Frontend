// import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userMileageState } from '@/recoil/atoms/userInfoAtom';
import HistoryList from './HistoryList';
import { getAPI } from '@/apis/axios';
import {
  mileageGetHistory,
  mileageGetHistoryRes,
  mileageUsingHistory,
  mileageUsingHistoryRes,
} from '@/types/myPage';
import { CurrentDate } from '../index';
import './MileageHistory.css';

export default function MileageHistory() {
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('usage');
  const [usageHistory, setUsageHistory] = useState<
    mileageUsingHistory[] | null
  >(null);
  const [rewardHistory, setRewardHistory] = useState<
    mileageGetHistory[] | null
  >(null);

  const mileageValue = useRecoilValue(userMileageState);

  const MileageUsage = async () => {
    try {
      const response = await getAPI<mileageUsingHistoryRes>(
        '/api/mypage/purchase-history',
      );
      // console.log( '사용내역',response.data.data);
      setUsageHistory(response.data.data);
      // console.log('usageHistory',usageHistory);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const MileageGetHistory = async () => {
    try {
      const response = await getAPI<mileageGetHistoryRes>(
        '/api/mypage/mileage-gethistory',
      );
      // console.log('적립내역', response.data.data);
      setRewardHistory(response.data.data);
      // console.log(rewardHistory);
    } catch (error) {
      // console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === 'usage') {
        await MileageUsage();
      } else if (activeTab === 'reward') {
        await MileageGetHistory();
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <div className="h-full mt-[246px] flex flex-col items-end justify-start ">
      <div className="mb-[60px]">
        <p className="text-[28px] text-blue mb-[12px]">마일리지</p>

        <div className="flex justify-between w-[988px]">
          <div className="w-[620px] h-[70px] py-[22px] px-[25px] flex justify-between items-center  border-[1.5px] border-blue rounded-[6px] bg-white text-[24px]">
            <div className="text-[#D3D3D3] flex justify-between items-center">
              <CurrentDate />
              <p className="ml-2"> 업데이트 기준</p>
            </div>

            <p className="text-blue">{mileageValue} M</p>
          </div>
          <button
            className="w-[347px] h-[72px] border-0 rounded-[6px] cursor-pointer bg-blue text-white text-[24px]"
            // onClick={()=>navigate('/mileageShop')}
          >
            내 마일리지 사용하러 가기
          </button>
        </div>
      </div>

      <div>
        <div className="w-[988px] flex justify-between items-center">
          <h1 className="text-[28px] text-blue mb-2 ">마일리지 이용내역</h1>
          <div className="flex">
            <div className="flex items-center h-[22px]">
              <p
                className={`w-[47px] border-r-2 border-blue text-[18px] cursor-pointer ${
                  activeTab === 'usage' ? 'text-blue' : ''
                }`}
                onClick={() => {
                  setActiveTab('usage');
                }}
              >
                사용
              </p>
              <p
                className={`flex-grow text-[18px] cursor-pointer text-left pl-[10px] ${
                  activeTab === 'reward' ? 'text-blue' : ''
                }`}
                onClick={() => {
                  setActiveTab('reward');
                }}
              >
                적립
              </p>
            </div>
          </div>
        </div>

        {activeTab === 'usage' ? (
          usageHistory && usageHistory.length > 0 ? (
            usageHistory.map((item, index) => (
              <HistoryList
                key={index}
                price="usage"
                cost={item.totalPrice}
                itemName={item.itemName}
                quantity={item.quantity}
                email={item.email}
                date={item.orderedAt}
              />
            ))
          ) : (
            <div className="empty-data">사용 내역이 없습니다.</div>
          )
        ) : null}

        {activeTab === 'reward' ? (
          rewardHistory && rewardHistory.length > 0 ? (
            rewardHistory.map((item, index) => (
              <HistoryList
                key={index}
                price="reward"
                cost={item.points}
                itemName={item.description}
                quantity={null}
                email=""
                date={item.date}
              />
            ))
          ) : (
            <div className="empty-data">적립 내역이 없습니다.</div>
          )
        ) : null}
      </div>
    </div>
  );
}

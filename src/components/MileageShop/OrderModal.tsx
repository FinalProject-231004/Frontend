import { CustomizedButtons, Modal, UserInfoInput } from '..';
import { useRef, useState } from 'react';
import { orderModalProps, orderItemInfo } from '@/types/mileageShop';
import { postAPI } from '@/apis/axios';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userMileageState } from '@/recoil/atoms/userInfoAtom';
import axios from 'axios';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import { useMobile } from '@/hooks';

export default function OrderModal( {itemId, itemName, price, isOpen, close}:orderModalProps ) {
  const [email, setEmail] = useState('');
  const [num, setNum] = useState(1);
  const [checkMsg, setCheckMsg] = useState('');
  const headerRef = useRef<HTMLHeadingElement>(null);
  const setMileage = useSetRecoilState(userMileageState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const isMobile = useMobile(); 

  const closeModal = () => {
    close();
    setEmail('');
    setNum(1);
    setCheckMsg('');
  };

  const itemInfo = {
    itemId: itemId,
    quantity: num,
    email: email,
  }

  const orderItem = async (info:orderItemInfo) => {
    try {
      await postAPI('/api/mileageshop/orders',info);
      // console.log(response);
      toast.success('얏호! 구매 완료!');
      setMileage((prevMileage) => {
        const updatedMileage = prevMileage - (price * num);
        return updatedMileage > 0 ? updatedMileage : 0;
      });
      closeModal();
    } catch (error) {
      // console.log(error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.msg;
        if (errorMessage) {
          // console.error(errorMessage);
          setCheckMsg(errorMessage);
        } else {
          // console.error('오류가 발생했습니다.');
        }
      } else {
        // console.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  }

  return (
    <Modal
        onRequestClose={closeModal}
        width={!isMobile? '713px' : '356px'}
        height={!isMobile? '400px' : '200px'}
        bgColor="#F1F8FF"
        isOpen={isOpen}
      >
        <div className="h-[400px] flex flex-col justify-center items-center sm:h-[200px]">
          <h1
            ref={headerRef}
            className={`px-24 pb-[15px] text-center text-blue sm:px-12 sm:pb-[12.5px] ${
              itemName.length>18 ? 'text-[24px] sm:text-xs' : 'text-[32px] sm:text-[16px]'
            }`}
          >
            {itemName}
          </h1>

          <div className='pb-[15px] flex flex-col justify-center items-center sm:pb-[12.5px]'>
            <p className='text-[20px] sm:text-[10px]'>수량</p>
            <div className='flex gap-3 sm:gap-1'>
              <p className='text-[25px] cursor-pointer sm:text-[12.5px]' 
                onClick={()=>{
                  if (num > 1) {
                    setNum(num - 1);
                }}}
                >-</p>
              <p className='text-[25px] sm:text-[12.5px]'>{num}</p>
              <p className='text-[25px] cursor-pointer sm:text-[12.5px]' onClick={()=>{setNum(num+1)}}>+</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex justify-center items-center z-10">
              <UserInfoInput
                inputVal={email}
                type="email"
                placeholder="수령 받으실 이메일을 입력해주세요"
                size="medium"
                borderColor="blue"
                focusBorderColor={''}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="absolute right-0 pt-[4px] text-[16px] text-blue font-hairline sm:text-[10px] sm:pt-[2px]">
              재발송은 불가하오니 이메일 작성에 유의해주세요!
            </div>
            <div className='text-red text-[16px] absolute right-0 pt-[26px] font-hairline sm:text-[10px] sm:pt-[13px]'>
              {checkMsg}
            </div>
          </div>

          <div className="pt-[62px] flex gap-8 sm:gap-4 sm:pt-[31px]">
            <CustomizedButtons
              size="mileage"
              fontcolor="white"
              fontSize={!isMobile?'20px':'10px'}
              BtnName="취소하기"
              btnbg="#3E3E3E"
              btnhoverbg={''}
              btnactivebg={''}
              borderradius="28.5px"
              onClick={closeModal}
            />
            <CustomizedButtons
              size="mileage"
              fontcolor="white"
              fontSize={!isMobile?'20px':'10px'}
              BtnName="결제하기"
              btnbg="#0078FF"
              btnhoverbg={''}
              btnactivebg={''}
              borderradius="28.5px"
              onClick={() => {
                if(isLoggedIn) {
                  email? orderItem(itemInfo) : setCheckMsg('이메일을 입력해 주세요!')
                } else {
                  toast.error('로그인 후 이용해주세요!!');
                }
              }}
            />
          </div>
        </div>
      </Modal>
  )
}

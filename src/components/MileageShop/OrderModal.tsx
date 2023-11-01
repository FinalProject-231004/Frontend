import { CustomizedButtons, Modal, UserInfoInput } from '..';
import { useState } from 'react';
import { orderModalProps, orderItemInfo } from '@/types/mileageShop';
import { postAPI } from '@/apis/axios';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { userMileageState } from '@/recoil/atoms/userInfoAtom';
import axios from 'axios';

export default function OrderModal( {itemId, itemName, price, isOpen, close}:orderModalProps ) {
  const [email, setEmail] = useState('');
  const [num, setNum] = useState(1);
  const [checkMsg, setCheckMsg] = useState('');
  const setMileage = useSetRecoilState(userMileageState);

  const closeModal = () => {
    close();
    setEmail('');
    setNum(0);
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
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.errorMessage;
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
        width="713px"
        height="390px"
        bgColor="#F1F8FF"
        isOpen={isOpen}
      >
        <div className="h-[390px] flex flex-col justify-center items-center">
          <h1 className="mb-[15px] text-[34px] text-blue">
            {itemName}
          </h1>

          <div className='mb-[15px] flex flex-col justify-center items-center'>
            <p className='text-[20px]'>수량</p>
            <div className='flex gap-3'>
              <p className='text-[25px] cursor-pointer' 
                onClick={()=>{
                  if (num > 1) {
                    setNum(num - 1);
                }}}
                >-</p>
              <p className='text-[25px]'>{num}</p>
              <p className='text-[25px] cursor-pointer' onClick={()=>{setNum(num+1)}}>+</p>
            </div>
          </div>

          <div className="relative flex justify-center items-center z-10">
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
          <div className="relative w-[530px]">
            <div className="absolute right-0 mt-[6px] text-[16px] text-blue font-hairline">
              재발송은 불가하오니 이메일 작성에 유의해주세요!
            </div>
            <div className='text-red text-[16px] absolute right-0 mt-[28px]'>
              {checkMsg}
            </div>
          </div>

          <div className="mt-[70px] flex gap-[32px]" >
            <CustomizedButtons
              size="mileage"
              fontcolor="white"
              fontSize="20px"
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
              fontSize="20px"
              BtnName="결제하기"
              btnbg="#0078FF"
              btnhoverbg={''}
              btnactivebg={''}
              borderradius="28.5px"
              onClick={() => {
                email? orderItem(itemInfo) : setCheckMsg('이메일을 입력해 주세요!')
              }}
            />
          </div>
        </div>
      </Modal>
  )
}

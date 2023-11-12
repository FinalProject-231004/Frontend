import { getAPI } from '@/apis/axios'
import ChangeNicknameModal from './ChangeNicknameModal'
import ChangeProfile from './ChangeProfile'
import ChangePwModal from './ChangePwModal'
import { useEffect, useState } from 'react'
import { updateInfoResponse } from '@/types/myPage'
import DeleteAccount from './DeleteAccount'
import { useRecoilState } from 'recoil'
import { userNickNameState } from '@/recoil/atoms/userInfoAtom'

export default function UpdateMyInfo() {
  const [userNickname, setUserNickname] = useRecoilState(userNickNameState);
  const [userPw, setUserPw] = useState('');
  const [profileImg, setProfileImg] = useState<string | null>('');

  const getUserInfo = async () => {
    try {
      const response = await getAPI<updateInfoResponse>('/api/member/update/view');
      // console.log(response.data.data);
      const data = response.data.data
      setUserNickname(data.nickname);
      setUserPw(data.password);
      setProfileImg(data.image);
    } catch (error) {
      // console.error('Error:', error);
    }
  }

  useEffect(()=>{getUserInfo();},[])

  return (
    <div className="h-full mt-[148px] flex flex-col items-center justify-start sm:mt-[42px]">
      <ChangeProfile profileImg={profileImg}/>

      <div className="w-[896px] h-[482px] mt-[59px] flex flex-col justify-start items-start gap-16 sm:w-full sm:h-full sm:mt-[31px] sm:gap-8 sm:px-[25px]">
        <div className="w-full">
          <p className='text-[28px] text-blue mb-[12px] font-extrabold sm:text-[14px] sm:mb-[6px]'>닉네임 변경하기</p>
          <div className='w-full flex'>
            <input value={userNickname} type="text" disabled 
            className='w-[764px] h-[72px] pl-[25px] rounded-l-[6px] border-blue border-[1.5px] border-r-0 text-[24px] text-blue bg-[#F1F8FF]
              sm:w-[277px] sm:h-[36px] sm:text-xs sm:border sm:pl-[13px]
            '/>
            <ChangeNicknameModal />
          </div>
        </div>
        <div className="mb-[110px] w-full sm:mb-[22px]">
          <p className='text-[28px] text-blue mb-[12px] font-extrabold sm:text-[14px] sm:mb-[6px]'>비밀번호 변경하기</p>
          <div className='w-full flex'>
            <input value={userPw} type="password" disabled 
            className='w-[764px] h-[72px] pl-[25px] rounded-l-[6px] border-blue border-[1.5px] border-r-0 text-[24px] text-blue bg-[#F1F8FF]
              sm:w-[277px] sm:h-[36px] sm:text-xs sm:border sm:pl-[13px]
            '/>
            <ChangePwModal />
          </div>
        </div>

        <div className='w-full flex justify-center'>
          <DeleteAccount />
        </div>
      </div>
    </div>
  )
}

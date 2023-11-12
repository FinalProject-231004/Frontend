import { userProfileImgState } from '@/recoil/atoms/userInfoAtom';
import axios from 'axios';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

type changeProfileProps = {
  profileImg: string | null;
}

export default function ChangeProfile({profileImg}:changeProfileProps) {
  const [imgFile, setImgFile] = useState<string | null>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const updateImg = useSetRecoilState(userProfileImgState)
  const API_BASE_URL: string = import.meta.env.VITE_APP_GENERATED_SERVER_URL;

  const saveImgFile = () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error('5MB 이하만 업로드 가능해요 🙇‍♀️');
          return;
        }
        if (
          !['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'].includes(
            file.type,
          )
        ) {
          toast.error('지원하지 않는 파일 형식입니다!');
          return;
        }
      } 
      if (file) {
        const image = window.URL.createObjectURL(file);
        setImgFile(image);
        // 새로운 FormData 생성
        const newFormData = new FormData();
        newFormData.append('newImage', file);

        // FormData를 상태로 설정
        setFormData(newFormData);
      }
    }
    // console.log(formData);
  };

  const putProfile = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/member/update/profile`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          Authorization: `${localStorage.getItem('Authorization')}` 
        },
      });
      toast.success('이미지 변경 완료!!');
      if (imgFile !== null) { 
        updateImg(imgFile);
      }
      // console.log(response);
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="w-[222px] h-[222px] flex items-center justify-center rounded-full overflow-hidden sm:w-[111px] sm:h-[111px]">
            <img src={imgFile || profileImg || '/img/bonobono.png'} alt="profile" className="w-full h-full object-cover" />
        </div>
 
        <div className="mt-[19px] flex justify-between items-center">
          <label
            className=" hover:border-blue hover:text-blue border-b-2 text-[20px] cursor-pointer sm:text-xs"
            htmlFor="profileImg"
          >
            이미지 변경
          </label>
          <input
            className="hidden"
            name="profileImage"
            type="file"
            id="profileImg"
            accept="image/*"
            onChange={saveImgFile}
            ref={fileInputRef}
          />
          <button
            className="w-[59px] h-[30px] ml-[10px] text-blue-600 border border-blue-600 rounded hover:bg-blue hover:text-white
              sm:w-[40px] sm:h-[16px] sm:text-xs
            "
            onClick={putProfile}
          >
            저장
          </button>
        </div>
      </div>
  )
}

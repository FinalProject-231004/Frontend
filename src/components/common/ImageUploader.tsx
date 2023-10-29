import { toast } from 'react-toastify';
import { ImageInfo } from '@/types/questionTypes';

interface ImageUploaderProps {
  id: string;
  image: ImageInfo | null | undefined;
  uploadImage: (file: File, questionId: string) => void;
  removeImage: (questionId: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  image,
  removeImage,
  uploadImage,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
      uploadImage(file, id);
    }
  };
  return (
    <div>
      <button
        type="button"
        className={`w-[105px] h-[34px] rounded-[6px] shadow-md shadow-slate-200 ${
          image?.file ? 'bg-[#FF6347]' : 'bg-navy'
        } hover:border  hover:${
          image?.file ? 'border-[#FF6347]' : 'border-navy'
        } active:scale-105 transition-transform  duration-2000`}
        onClick={() => {
          if (image?.file) {
            removeImage(id);
          } else {
            document.getElementById(`image-upload-${id}`)?.click();
          }
        }}
      >
        <p className="font-tmoney text-base text-white">
          {image?.file ? '이미지삭제' : '이미지추가'}
        </p>
      </button>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .bmp"
        onChange={handleImageChange}
        id={`image-upload-${id}`}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUploader;

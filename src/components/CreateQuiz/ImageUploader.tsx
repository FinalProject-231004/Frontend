import { Question } from '@/types/questionTypes';
import { toast } from 'react-toastify';

interface ImageUploaderProps {
  question: Question;
  removeImage: (questionId: string) => void;
  uploadImage: (id: string, file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  question,
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
      uploadImage(question.id, file);
    }
  };
  return (
    <div>
      <button
        className={`w-[128px] h-[37px] rounded-[6px] ${
          question.image?.file ? 'bg-[#FF6347]' : 'bg-navy'
        } hover:border  hover:${
          question.image?.file ? 'border-[#FF6347]' : 'border-navy'
        } active:scale-105 transition-transform  duration-2000`}
        onClick={() => {
          if (question.image?.file) {
            removeImage(question.id);
          } else {
            document.getElementById(`image-upload-${question.id}`)?.click();
          }
        }}
      >
        <p className="font-tmoney text-xl">
          {question.image?.file ? '이미지삭제' : '이미지추가'}
        </p>
      </button>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .bmp"
        onChange={handleImageChange}
        id={`image-upload-${question.id}`}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUploader;

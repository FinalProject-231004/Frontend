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
      uploadImage(question.id, file);
    }
  };

  return (
    <div>
      <button
        className={`w-[128px] h-[37px] rounded-[6px] ${
          question.image?.file ? 'bg-[#FF6347]' : 'bg-navy'
        } hover:border-4 hover:${
          question.image?.file ? 'border-[#FF6347]' : 'border-[#FF6347]'
        } active:scale-105 transition-transform  duration-200`}
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
      {/* {question.image?.preview && (
        <div
          className="w-[600px] h-[400px] mx-auto mt-[10px] mb-[20px] border-4 border-blue rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${question.image.preview})` }}
        ></div>
      )} */}
    </div>
  );
};

export default ImageUploader;

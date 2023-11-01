import { QuestionItemProps } from '@/types/questionTypes';
import { BsFillTrashFill } from 'react-icons/bs';
import { ImageUploader } from '@/components';
import { useRecoilValue } from 'recoil';
import { uploadImageSelector } from '@/recoil/selectors/imageSelectors';
import { toast } from 'react-toastify';

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  index,
  removeQuestion,
  setQuestions,
  questions,
}) => {
  const { removeImage } = useRecoilValue(uploadImageSelector);

  const handleImageUpload = async (file: File, questionId: string) => {
    const updatedQuestions = questions.map(q =>
      q.id === questionId
        ? {
            ...q,
            image: { file, preview: URL.createObjectURL(file) },
          }
        : q,
    );
    setQuestions(updatedQuestions);
    toast.success(' 이미지 업로드 성공 ! 😎');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3 mt-8">
        <h3 className="text-xl text-blue font-extrabold">질문 {index + 1}</h3>
        <div className="flex items-center justify-end rounded-[6px] gap-[10px]">
          <ImageUploader
            id={question.id}
            image={question.image}
            uploadImage={file => handleImageUpload(file, question.id)}
            removeImage={questionId => {
              const updatedQuestions = removeImage(questionId);
              if (Array.isArray(updatedQuestions)) {
                setQuestions(updatedQuestions);
                toast.error(' 이미지를 삭제했어요 ! 🧺');
              }
            }}
          />
          <button
            className=" w-[34px] h-[34px] text-xl flex items-center justify-center rounded-[6px] bg-[#3E3E3E] border hover:border-4 hover:border-[#3E3E3E] text-white active:scale-105 transition-transform  duration-200"
            onClick={e => {
              e.preventDefault();
              removeQuestion(question.id);
            }}
          >
            <BsFillTrashFill size={22} />
          </button>
        </div>
      </div>
      <input
        className="w-full h-[40px] px-6 mb-[10px] text-lg focus:outline-none bg-blue rounded-md text-white custom-placeholder shadow-sm shadow-slate-300"
        placeholder="질문을 입력해 주세요"
        value={question.text}
        onChange={e => {
          const updatedQuestions = questions.map(q =>
            q.id === question.id ? { ...q, text: e.target.value } : q,
          );
          setQuestions(updatedQuestions);
        }}
      />
      {question.image?.preview && (
        <div
          className="w-[720] h-[400px] mx-auto mt-[10px] mb-[20px] border-4 border-blue rounded-2xl bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${question.image.preview})` }}
        ></div>
      )}
    </div>
  );
};

export default QuestionItem;

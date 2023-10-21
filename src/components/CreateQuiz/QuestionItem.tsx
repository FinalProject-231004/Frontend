import { Question } from '@/types/questionTypes';
import { BsFillTrashFill } from 'react-icons/bs';
import ImageUploader from './ImageUploader';
import { useRecoilValue } from 'recoil';
import { uploadImageSelector } from '@/recoil/selectors/imageSelectors';

interface QuestionItemProps {
  question: Question;
  index: number;
  removeQuestion: (id: string) => void;
  setQuestions: (questions: Question[]) => void;
  questions: Question[];
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  index,
  removeQuestion,
  setQuestions,
  questions,
}) => {
  const { uploadImage, removeImage } = useRecoilValue(uploadImageSelector);

  return (
    <div>
      <div className="flex items-center justify-between mb-[12px] mt-8 px-3 py-1">
        <h3 className="text-[30px] text-blue font-tmoney font-extrabold">
          질문 {index + 1}
        </h3>
        <div className="flex items-center justify-end rounded-[6px] gap-[10px] text-white">
          <ImageUploader
            question={question}
            uploadImage={(questionId, file) => {
              const updatedQuestions = uploadImage(questionId, file);
              if (Array.isArray(updatedQuestions)) {
                setQuestions(updatedQuestions);
              }
            }}
            removeImage={questionId => {
              const updatedQuestions = removeImage(questionId);
              if (Array.isArray(updatedQuestions)) {
                setQuestions(updatedQuestions);
              }
            }}
          />
          <button
            className=" w-[37px] h-[37px] text-xl flex items-center justify-center rounded-[6px] bg-[#3E3E3E] border hover:border-4 hover:border-[#3E3E3E] active:scale-105 transition-transform  duration-200"
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
        className="w-full h-[51px] px-6 mb-[10px] text-2xl border focus:outline-none bg-blue rounded-md text-white"
        placeholder="질문을 입력해 주세요"
        value={question.text}
        onChange={e => {
          const updatedQuestions = questions.map(q =>
            q.id === question.id ? { ...q, text: e.target.value } : q,
          );
          setQuestions(updatedQuestions);
        }}
      />
    </div>
  );
};

export default QuestionItem;

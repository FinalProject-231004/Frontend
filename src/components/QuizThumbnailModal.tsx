import { QuizThumbnailProps } from '@/types/homeQuiz';
import QuizThumbnail from './QuizThumbnail';
import { AiOutlineClose } from 'react-icons/ai';

interface QuizThumbnailModalProps {
  quiz: QuizThumbnailProps['quiz'];
  onClose: () => void;
}

const QuizThumbnailModal: React.FC<QuizThumbnailModalProps> = ({
  quiz,
  onClose,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-500">
      <div className="bg-[#F1F8FF] w-[1208px] h-[973px] p-16 items-center absolute rounded-[30px] shadow-md shadow-slate-200">
        <h1 className="w-full h-[194px] title justify-start">{quiz.title}</h1>
        <div className="">
          <QuizThumbnail quiz={quiz} />
          {/* Quiz의 content 요기 와야함 */}
        </div>
        <div>{/* 댓글 */}</div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-blue"
        >
          <AiOutlineClose size={28} />
        </button>

        <div className="absolute bottom-4 right-4 flex space-x-4">
          <button type="button" className="flex">
            공유하기
          </button>
          <button type="button" className="flex">
            시작하기
          </button>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-slate-200 opacity-70 -z-[500]"></div>
    </div>
  );
};

export default QuizThumbnailModal;

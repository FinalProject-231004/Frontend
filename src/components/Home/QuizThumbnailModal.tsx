import { QuizDetail, QuizThumbnailModalProps } from '@/types/homeQuiz';
import { QuizCustomButton, CommentSection, QuizInfo } from '@/components';
import { useGetQuizDetail, useLike } from '@/hooks';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router';

const QuizThumbnailModal: React.FC<QuizThumbnailModalProps> = ({
  id,
  onClose,
}) => {
  const { data: quizDetail } = useGetQuizDetail<QuizDetail>(`/api/quiz/${id}`, [
    'quizDetail',
    id,
  ]);

  const { isLiked, likes, handleLike } = useLike(id, quizDetail?.likes || 0);
  const navigate = useNavigate();
  if (!quizDetail) return null;

  console.log(quizDetail.id);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-500">
      <div className="bg-[#F1F8FF] w-[1208px] h-[973px] my-auto rounded-[30px] shadow-md shdow-slate-200 overflow-hidden flex-nowrap">
        <div className="h-full p-16 justify-items-center">
          <div className="relative flex mb-[90px]">
            <h1 className="text-center text-blue font-extrabold text-[32px] w-full mt-1">
              {quizDetail?.title}
            </h1>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-0 text-blue"
            >
              <AiOutlineClose size={28} />
            </button>
          </div>

          <div className="flex w-full h-[600px] justify-items-center">
            <div className="w-1/2">
              <QuizInfo
                image={quizDetail.image}
                title={quizDetail.title}
                onLike={handleLike}
                likes={{ isLiked, count: likes }}
                viewCount={quizDetail.viewCount}
                content={quizDetail.content}
              />
            </div>

            <div className="w-1/2">
              <div className="w-[520px] mx-auto">
                <CommentSection
                  comments={quizDetail.comments || []}
                  quizId={quizDetail.id}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-5 w-full justify-end mt-5">
            <QuizCustomButton theme="white" onClick={() => {}}>
              공유하기
            </QuizCustomButton>
            <QuizCustomButton
              theme="blue"
              onClick={() => {
                navigate(`/play-quiz/${quizDetail.id}`);
              }}
            >
              시작하기
            </QuizCustomButton>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-slate-200 opacity-70 -z-[500]"></div>
    </div>
  );
};

export default QuizThumbnailModal;

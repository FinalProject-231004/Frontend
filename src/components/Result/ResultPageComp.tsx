import { QuizCustomButton, QuizInfo, CommentSection } from '@/components';
import { useGetQuizDetail, useLike } from '@/hooks';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { QuizResultProps } from '@/types/questionTypes';

const ResultPageComp: React.FC<QuizResultProps> = ({ msg, data }) => {
  const quizId = data.id;
  console.log(data);
  const { data: QuizResult } = useGetQuizDetail<QuizResultProps>(
    `/api/quiz/result/${quizId}`,
    ['QuizResult', quizId],
  );
  console.log(quizId);
  const { isLiked, likes, handleLike } = useLike(quizId, data.likes || 0);
  const navigate = useNavigate();
  if (!QuizResult) return null;

  return (
    <div className="w-[1080px] h-full mx-auto">
      <div className="grid grid-cols-1 mb-[90px]">
        <button
          type="button"
          onClick={() => {}}
          className="flex justify-end text-blue"
        >
          <AiOutlineClose size={28} />
        </button>
        <h1 className="title text-center text-blue font-extrabold text-[32px]">
          {msg}🔥
        </h1>

        <div className="w-full h-[600px] mb-2 flex justify-items-center">
          <div className="w-1/2">
            <QuizInfo
              image={data.image}
              title={data.title}
              onLike={handleLike}
              likes={{ count: likes, isLiked }}
              viewCount={data.viewCount}
              content={data.content}
            />
          </div>
          <div className="flex w-1/2 items-end">
            <CommentSection comments={data.comments} quizId={quizId} />
          </div>
        </div>

        <div className="flex gap-5 w-full h-full justify-end mb-[90px]">
          <QuizCustomButton theme="white" onClick={() => {}}>
            공유하기
          </QuizCustomButton>
          <QuizCustomButton
            theme="blue"
            onClick={() => {
              navigate(`/`);
            }}
          >
            메인으로
          </QuizCustomButton>
        </div>
      </div>
    </div>
  );
};

export default ResultPageComp;

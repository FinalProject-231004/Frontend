import {
  QuizCustomButton,
  QuizInfo,
  CommentSection,
  ShareModal,
} from '@/components';
import { useLike } from '@/hooks';
import { useNavigate } from 'react-router';
import { QuizResultProps } from '@/types/result';
import { useState } from 'react';
import { useParams } from 'react-router';

const ResultPageComp: React.FC<QuizResultProps> = ({ msg, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { isLiked, likes, handleLike } = useLike(Number(id), data?.likes || 0);
  const navigate = useNavigate();
  if (!data) return null;

  return (
    <div className="w-[1080px] h-full mx-auto">
      <h1 className="mt-[152px] mb-[80px] text-blue font-extrabold text-center text-[28px]">
        {msg}🔥
      </h1>

      <div className="w-full h-full mb-2 flex mx-auto">
        <div className="w-1/2">
          <div className="w-[520px] mr-auto">
            <QuizInfo
              image={data.image}
              title={data.title}
              onLike={handleLike}
              likes={{ count: likes, isLiked }}
              viewCount={data.viewCount}
              content={data.content}
            />
          </div>
        </div>
        <div className="flex w-1/2">
          <div className="w-[520px] ml-auto">
            <CommentSection comments={data.comments} quizId={Number(id)} />
          </div>
        </div>
      </div>

      <ShareModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        id={id}
        pathType="result" // Specify the path type here
      />

      <div className="flex gap-5 justify-end mt-8">
        <QuizCustomButton theme="white" onClick={() => setIsModalOpen(true)}>
          공유하기
        </QuizCustomButton>
        <QuizCustomButton
          theme="dark"
          onClick={() => navigate('/play-quiz/${id}')}
        >
          다시하기
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
  );
};

export default ResultPageComp;

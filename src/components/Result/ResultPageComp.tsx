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
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

const ResultPageComp: React.FC<QuizResultProps> = ({ msg, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { isLiked, likes, handleLike } = useLike(Number(id), data?.likes || 0);
  const navigate = useNavigate();
  if (!data) return null;

  const handleCopyLink = () => {
    const baseURL = window.location.origin;
    const shareURL = `${baseURL}/quiz/${id}`;
    navigator.clipboard.writeText(shareURL).then(
      () => {
        toast.success('링크 복사 완료! 🤗');
      },
      err => {
        console.error('Could not copy text: ', err);
      },
    );
  };

  return (
    <div className="w-[1080px] h-full mx-auto">
      <h1 className="mt-[152px] mb-[80px]  text-blue font-extrabold text-center text-[24px]">
        {msg}🔥
      </h1>

      <div className="w-full h-[600px] mb-2 flex mx-auto">
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
        handleCopyLink={handleCopyLink}
      />

      <div className="flex gap-5 w-full justify-end">
        <QuizCustomButton theme="white" onClick={() => setIsModalOpen(true)}>
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
  );
};

export default ResultPageComp;

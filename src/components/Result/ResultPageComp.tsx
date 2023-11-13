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
import { toast } from 'react-toastify';
import axios from 'axios';

const ResultPageComp: React.FC<QuizResultProps> = ({ msg, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { isLiked, likes, handleLike } = useLike(Number(id), data?.likes || 0);
  const navigate = useNavigate();
  if (!data) return null;

  const handleReport = async (quizId: number) => {
    try {
      const token = localStorage.getItem('Authorization');
      if (!token) {
        toast.error('로그인이 필요합니다.');
        return;
      }

      await axios.post(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/report/quiz/${quizId}`,
        {},
        { headers: { Authorization: token } },
      );

      toast.success(`'${data.title}' 퀴즈가 신고되었습니다.`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.msg ||
          '신고 처리 중 오류가 발생했습니다.';
        toast.error(errorMessage);
      } else {
        toast.error('신고 처리 중 오류가 발생했습니다.');
      }
    }
  };

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
        pathType="result"
      />

      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          className="flex mt-[45px] items-center"
          onClick={() => handleReport(data.id)}
        >
          🚫
          <span className=" text-slate-300 ml-1 underline ">
            {' '}
            부적절한 퀴즈{' '}
            <span className="font-extrabold underline text-red">신고하기</span>
          </span>
        </button>
        <div className="flex gap-5">
          <QuizCustomButton theme="white" onClick={() => setIsModalOpen(true)}>
            공유하기
          </QuizCustomButton>
          <QuizCustomButton
            theme="dark"
            onClick={() => navigate(`/play-quiz/${id}`)}
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
    </div>
  );
};

export default ResultPageComp;

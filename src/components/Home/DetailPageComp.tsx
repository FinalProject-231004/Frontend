import { QuizDetail, DetailPageCompProps } from '@/types/homeQuiz';
import {
  QuizCustomButton,
  CommentSection,
  QuizInfo,
  ShareModal,
} from '@/components';
import { useGetQuizDetail, useLike } from '@/hooks';
import { AiFillHome } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useState } from 'react';

const DetailPageComp: React.FC<DetailPageCompProps> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data: quizDetail } = useGetQuizDetail<QuizDetail>(`/api/quiz/${id}`, [
    'quizDetail',
    id,
  ]);

  const { isLiked, likes, handleLike } = useLike(
    Number(id),
    quizDetail?.likes || 0,
  );
  if (!quizDetail) return null;

  console.log(quizDetail.id);

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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-[#F1F8FF] w-[1080px] h-[800px] mt-16 rounded-[30px] shadow-md shdow-slate-200 overflow-hidden flex-nowrap">
        <div className="p-16 h-full flex flex-col justify-between">
          <div
            className="flex justify-end text-blue -mt-4 cursor-pointer z-[999]"
            onClick={() => {
              navigate('/');
            }}
          >
            <AiFillHome size={35} />
          </div>
          <h1 className="-mt-24 mb-10 text-center text-blue font-extrabold text-[32px]">
            {quizDetail?.title}
          </h1>
          <div className="w-[952px] flex h-[400px] justify-center items-center">
            <div className="w-1/2 h-[472px]">
              <div className="w-[456px] mr-auto">
                <QuizInfo
                  image={quizDetail.image}
                  title={quizDetail.title}
                  onLike={handleLike}
                  likes={{ isLiked, count: likes }}
                  viewCount={quizDetail.viewCount}
                  content={quizDetail.content}
                />
              </div>
            </div>
            <div className="w-1/2 h-[472px]">
              <div className="w-[456px] ml-auto">
                <CommentSection
                  comments={quizDetail.comments}
                  quizId={quizDetail.id}
                />
              </div>
            </div>
          </div>

          <ShareModal
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            handleCopyLink={handleCopyLink}
          />

          <div className="flex gap-5 w-full justify-end">
            <QuizCustomButton
              theme="white"
              onClick={() => setIsModalOpen(true)}
            >
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

export default DetailPageComp;

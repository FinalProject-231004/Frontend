import { DetailPageCompProps } from '@/types/homeQuiz';
import {
  QuizCustomButton,
  CommentSection,
  QuizInfo,
  ShareModal,
} from '@/components';
import { useLike } from '@/hooks';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';

const DetailPageComp: React.FC<DetailPageCompProps> = ({ id, quizDetail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleShare = () => {
    setIsModalOpen(true);
  };

  const { isLiked, likes, handleLike } = useLike(
    Number(id),
    quizDetail?.likes || 0,
  );

  if (!quizDetail) {
    return <div className="hidden">Loading...</div>;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-[#F1F8FF] w-[1080px] h-[800px] mt-16 rounded-[30px] shadow-md shdow-slate-200 overflow-hidden flex-nowrap">
        <div className="p-16 h-full flex flex-col justify-between">
          <div className="flex items-center">
            <div
              className="w-[30px] text-blue cursor-pointer z-[999]"
              onClick={() => {
                navigate(-1);
              }}
            >
              <BsFillArrowLeftCircleFill size={35} />
            </div>
            <h1 className="max-w-4/5 mx-auto text-center text-blue font-extrabold text-[28px]  break-words max-w-[766px]">
              {quizDetail?.title}
            </h1>
          </div>
          <div className="w-full h-[510px] mt-14 flex justify-center items-center">
            <div className="w-1/2 h-full">
              <div className="w-[446px] mr-auto">
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
            <div className="w-1/2 h-full border-l-2 border-dotted">
              <div className="max-w-[446px] ml-auto">
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
            id={id.toString()}
            pathType="detail"
          />

          <div className="flex gap-5 w-full justify-end">
            <QuizCustomButton theme="white" onClick={handleShare}>
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

export default React.memo(DetailPageComp);

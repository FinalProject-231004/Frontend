import { DetailPageCompProps } from '@/types/homeQuiz';
import {
  QuizCustomButton,
  CommentSection,
  QuizInfo,
  ShareModal,
} from '@/components';
import { useLike, useWindowSize } from '@/hooks';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const DetailPageComp: React.FC<DetailPageCompProps> = ({ id, quizDetail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const handleShare = () => {
    setIsModalOpen(true);
  };

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

      toast.success(`'${quizDetail.title}' 퀴즈가 신고되었습니다.`);
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

  const { isLiked, likes, handleLike } = useLike(
    Number(id),
    quizDetail?.likes || 0,
  );

  if (!quizDetail) {
    return <div className="hidden">Loading...</div>;
  }

  const backBtnSize = windowSize <= 393 ? 28 : 35;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="bg-[#F1F8FF] w-[1080px] h-[820px] mt-16 rounded-[30px] shadow-md shdow-slate-200 overflow-hidden flex-nowrap md:w-[90vw] md:h-[85vh] sm:w-[393px] sm:h-[600px] sm:fixed sm:bottom-0 sm:rounded-t-[30px] sm:rounded-b-none">
        <div className="p-14 h-full flex flex-col justify-between md:p-10 sm:p-8">
          <div className="flex items-center">
            <div
              className="text-blue cursor-pointer z-[999] md:pb-10 sm:-mt-1"
              onClick={() => {
                navigate(-1);
              }}
            >
              <BsFillArrowLeftCircleFill size={backBtnSize} />
            </div>
            <h1 className="max-w-4/5 mx-auto text-center text-blue font-extrabold text-[28px]  break-words max-w-[835px] md:max-w-[520px] md:text-2xl overflow-y-auto md:pb-10 sm:text-lg">
              {quizDetail?.title}
            </h1>
          </div>
          <div className="w-full h-[510px] mt-16 flex justify-center items-center md:items-start md:flex-col md:-mt-10 md:w-full md:h-auto sm:mt-0 sm:h-auto sm:items-start sm:flex-col">
            <div className="w-1/2 h-full md:w-0">
              <div className="w-[446px] mr-auto md:w-0 sm:w-[329px]">
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
            <div className="w-1/2 h-full  md:border-none sm:border-none md:w-0 sm:w-full">
              <div className="max-w-[490px] ml-auto h-[200px]">
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

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="flex mt-[37px] items-center md:mt-8 sm:hidden"
              onClick={() => handleReport(quizDetail.id)}
            >
              🚫
              <span className=" text-slate-300 ml-1 underline items-center mr-1 sm:text-xs">
                {' '}
                부적절한 퀴즈{' '}
                <span className="font-extrabold underline text-red">
                  신고하기
                </span>
              </span>
            </button>
            <div className="flex justify-end gap-4 md:mt-0 md:gap-10 md:items-center">
              <div className="sm:flex sm:gap-2 sm:ml-36">
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
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-slate-200 opacity-70 -z-[500]"></div>
    </div>
  );
};

export default React.memo(DetailPageComp);

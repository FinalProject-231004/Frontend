import { QuizCustomButton, QuizInfo, CommentSection } from '@/components';
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
    const currentURL = `${window.location.origin}/api/quiz/result/${id}`;
    navigator.clipboard.writeText(currentURL).then(
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
      <div className="grid grid-cols-1 mb-[90px]">
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
            <CommentSection comments={data.comments} quizId={Number(id)} />
          </div>
        </div>

        <div
          className={`${
            isModalOpen ? 'fixed' : 'hidden'
          } inset-0 flex items-center justify-center z-[500] `}
        >
          <div className="w-[713px] h-[308px] font-extrabold flex justify-center items-center bg-white p-6 rounded-xl shadow-lg shadow-slate-200">
            <div className="flex flex-col">
              <h2 className="text-[34px] text-center text-blue mb-4">
                나의 결과를 친구에게 공유할래요!
              </h2>

              <div className="flex flex-col text-2xl">
                <button
                  onClick={() => {
                    toast.warn('서비스 준비 중 입니다!🙄');
                  }}
                  className="mt-4 h-[57px] bg-[#FFEB00] border-blue p-2 rounded-full"
                >
                  <div className="flex justify-center">
                    <img
                      src="/kakaotalk.png"
                      alt="kakaotalk"
                      className="max-w-[35px] mr-2"
                    />
                    카톡으로 공유하기
                  </div>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="mt-4 h-[57px] bg-blue border-2 border-blue text-white p-2 rounded-full"
                >
                  링크 복사하기
                </button>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 bg-slate-200 opacity-40 -z-[500]"
            onClick={() => setIsModalOpen(false)}
          ></div>
        </div>

        <div className="flex gap-5 w-full h-full justify-end mb-[90px]">
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
    </div>
  );
};

export default ResultPageComp;

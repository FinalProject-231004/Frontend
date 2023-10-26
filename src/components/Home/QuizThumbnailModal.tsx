import { useState } from 'react';
import { QuizThumbnailModalProps } from '@/types/homeQuiz';
import { QuizCustomButton, Comment } from '..';
import { useQuizDetail, useLike } from '@/hooks';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const QuizThumbnailModal: React.FC<QuizThumbnailModalProps> = ({
  id,
  onClose,
}) => {
  const { data: quizDetail } = useQuizDetail(id);
  const { isLiked, likes, handleLike } = useLike(id, quizDetail?.likes || 0);
  const [showAllComments, setShowAllComments] = useState(false);
  const navigate = useNavigate();
  if (!quizDetail) return null;
  const handleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };
  console.log(quizDetail.id);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-500">
      <div className="bg-[#F1F8FF] w-[1208px] max-h-[100%] h-[973px] rounded-[30px] shadow-md shdow-slate-200 overflow-hidden flex-nowrap">
        <div className="p-16 justify-items-center">
          <div className="grid grid-cols-1 mb-[90px]">
            <button
              type="button"
              onClick={onClose}
              className="flex justify-end text-blue"
            >
              <AiOutlineClose size={28} />
            </button>
            <h1 className="text-center text-blue font-extrabold text-[32px]">
              {quizDetail?.title}
            </h1>
          </div>

          <div className="flex w-full h-[559px] justify-items-center">
            <div className="w-1/2">
              <div className="w-[510px] mx-auto">
                <img
                  className="w-full h-[282px] object-cover mb-5"
                  src={quizDetail?.image}
                  alt={quizDetail?.title}
                />
                <div className="flex gap-4 justify-end text-2xl mb-5">
                  <button
                    className="flex items-center gap-1"
                    type="button"
                    onClick={handleLike}
                  >
                    {isLiked ? <BiSolidLike size={28} /> : <BiLike size={28} />}
                    {likes}
                  </button>
                  <div className="flex items-center gap-1">
                    <FaRegEye size={28} />
                    {quizDetail?.viewCount}
                  </div>
                </div>
                <div>{quizDetail?.content}</div>
              </div>
            </div>

            <div className="flex w-1/2">
              <div className="w-[510px] mx-auto">
                {quizDetail?.comments
                  ?.slice(0, showAllComments ? quizDetail.comments.length : 3)
                  .map(comment => (
                    <Comment key={comment.id} commentData={comment} />
                  ))}
                {quizDetail?.comments && quizDetail.comments.length > 3 && (
                  <button
                    onClick={handleShowAllComments}
                    className="text-blue underline"
                  >
                    {showAllComments ? '- 댓글 접기' : '+ 댓글 더보기'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full h-full justify-end mt-12">
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

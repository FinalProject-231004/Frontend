import { useState } from 'react';
import { QuizThumbnailProps } from '@/types/homeQuiz';
// import { BiLike, BiSolidLike } from 'react-icons/bi';
// import { useLike } from '@/hooks';
import { FaRegEye } from 'react-icons/fa';
import QuizThumbnailModal from './QuizThumbnailModal';

const QuizThumbnail: React.FC<QuizThumbnailProps> = ({ quiz }) => {
  // const { isLiked, likes, handleLike } = useLike(quiz.id, quiz.likes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-[255px]">
      <img
        className="h-[135px] w-full object-cover "
        src={quiz.image}
        alt={quiz.title}
        onClick={handleImageClick}
      />
      <div className="flex mt-2 justify-between items-center">
        <div>
          <h4 className="mt-2 font-extrabold">{quiz.title}</h4>

          <div className="gap-5">
            {/* <button
            className="flex items-center gap-1"
            type="button"
            onClick={handleLike}
          >
            {isLiked ? <BiSolidLike size={20} /> : <BiLike size={20} />}
            {likes}
          </button> */}
            <div className="flex items-center gap-1 text-slate-400">
              <FaRegEye size={20} />
              {quiz.viewCount}
            </div>
          </div>
          {isModalOpen && (
            <QuizThumbnailModal
              id={quiz.id}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizThumbnail;

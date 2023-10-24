import React from 'react';
import { QuizThumbnailProps } from '@/types/homeQuiz';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { FaRegEye } from 'react-icons/fa';
import { useLike } from '@/hooks';
import QuizThumbnailModal from './QuizThumbnailModal';

const QuizThumbnail: React.FC<QuizThumbnailProps> = ({ quiz }) => {
  const { isLiked, likes, handleLike } = useLike(quiz.id, quiz.likes);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-[347px]">
      <img
        className="h-[185px] w-full object-cover "
        src={quiz.image}
        alt={quiz.title}
        onClick={handleImageClick}
      />
      <div className="flex mt-2 mb-8  justify-between items-center">
        <h4 className="text-lg mt-2 font-extrabold">{quiz.title}</h4>

        <div className="flex gap-5 text-[18px]">
          <button
            className="flex items-center gap-1"
            type="button"
            onClick={handleLike}
          >
            {isLiked ? <BiSolidLike size={20} /> : <BiLike size={20} />}
            {likes}
          </button>
          <div className="flex items-center gap-1">
            <FaRegEye size={20} />
            {quiz.viewCount}
          </div>
          {isModalOpen && (
            <QuizThumbnailModal
              quiz={quiz}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizThumbnail;

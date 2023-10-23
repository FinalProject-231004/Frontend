import React from 'react';
import { QuizThumbnailProps } from '@/types/homeQuiz';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { FaRegEye } from 'react-icons/fa';
import { useLike } from '@/hooks';

const QuizThumbnail: React.FC<QuizThumbnailProps> = ({ quiz }) => {
  const { isLiked, likes, handleLike, isLoading } = useLike(
    quiz.id,
    quiz.likes,
  );

  return (
    <div className="w-[347px]">
      <img
        src={quiz.image}
        alt={quiz.title}
        className="h-[185px] w-full object-cover"
      />
      <div className="flex mt-2 justify-between">
        <h4 className="text-lg mt-2">{quiz.title}</h4>

        <div className="flex gap-5">
          <div>
            <button type="button" onClick={handleLike} disabled={isLoading}>
              {isLiked ? <BiSolidLike size={25} /> : <BiLike size={25} />}
            </button>
            {likes}
          </div>
          <div>
            <FaRegEye size={25} />
            {quiz.viewCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizThumbnail;

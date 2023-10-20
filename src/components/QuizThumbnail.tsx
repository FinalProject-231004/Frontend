import React from 'react';
import { QuizThumbnailProps } from '@/types/home';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { FaRegEye } from 'react-icons/fa';
import { useLike } from '@/hooks/useLike';

const QuizThumbnail: React.FC<QuizThumbnailProps> = ({ quiz }) => {
  const { isLiked, likes, handleLike } = useLike(quiz.id);

  return (
    <div className="w-[347px]">
      <h4 className="hidden">{quiz.category}</h4>
      <h4 className="text-lg mt-2">{quiz.title}</h4>
      <img
        src={quiz.image}
        alt={quiz.title}
        className="h-[185px] w-full object-cover"
      />
      <div className="flex mt-2 justify-between">
        <div>{quiz.username}</div>

        <button onClick={handleLike}>
          {isLiked ? <BiSolidLike size={25} /> : <BiLike size={25} />}
          {likes || 0}
        </button>

        <button>
          <FaRegEye size={25} />
          {quiz.viewNum}
        </button>
      </div>
    </div>
  );
};

export default QuizThumbnail;

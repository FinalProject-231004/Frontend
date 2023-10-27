import { QuizInfoProps } from '@/types/result';
import { BiSolidLike, BiLike } from 'react-icons/bi';
import { FaRegEye } from 'react-icons/fa';

const QuizInfo: React.FC<QuizInfoProps> = ({
  image,
  title,
  onLike,
  likes,
  viewCount,
  content,
}) => (
  <div className="w-full">
    <div className="w-[510px] mx-auto">
      <img
        className="w-full h-[282px] object-cover mb-5"
        src={image}
        alt={title}
      />
      <div className="flex gap-4 justify-end text-2xl mb-5">
        <button
          className="flex items-center gap-1"
          type="button"
          onClick={onLike}
        >
          {likes.isLiked ? <BiSolidLike size={28} /> : <BiLike size={28} />}
          {likes.count}
        </button>
        <div className="flex items-center gap-1">
          <FaRegEye size={28} />
          {viewCount}
        </div>
      </div>
      <div className="text-2xl">{content}</div>
    </div>
  </div>
);

export default QuizInfo;

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
  <div className="mx-auto h-full md:w-[79.5vw] md:h-[32vh] md:mx-0">
    <img
      className="w-full h-[282px] object-cover mb-3 md:h-[30vh] sm:w-[100vw] sm:h-[20vh]"
      src={image}
      alt={title}
    />
    <div className="flex gap-4 justify-end text-xl mb-5 md:-mt-[87px] md:pr-4">
      <div className="flex gap-5 md:bg-offwhite md:bg-opacity-80 md:border-white md:border-2 md:shadow-sm md:shadow-slate-500 md:text-black md:py-3 md:px-5 md:rounded-full md:z-50">
        <button
          className="flex items-center gap-1"
          type="button"
          onClick={onLike}
        >
          {likes.isLiked ? <BiSolidLike size={28} /> : <BiLike size={28} />}
          {likes.count}
        </button>
        <div className="flex justify-center items-center gap-1">
          <FaRegEye size={28} />
          {viewCount}
        </div>
      </div>
    </div>
    <div className="text-xl break-words max-w-[446px] md:text-base md:max-w-[79.5vw] md:h-12 md:mt-8 md:overflow-y-auto">
      {content}
    </div>
  </div>
);

export default QuizInfo;

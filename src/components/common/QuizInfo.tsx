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
  <div className="mx-auto h-full md:w-[82vw] md:h-[32vh] md:mx-0 flex flex-col sm:w-[100vw]">
    <img
      className="flex w-full h-[282px] object-cover md:w-[80vw] md:h-[30vh] md:-mt-[60px] sm:w-[84.5%] sm:h-[160px] sm:overflow-y-auto"
      src={image}
      alt={title}
    />
    <div className="flex gap-4 mt-2 justify-end text-xl mb-5 md:-mt-[85px] md:pr-6 md:text-2xl sm:-mt-[45px] sm:pr-6 sm:text-lg">
      <div className="flex items-center gap-5 md:bg-offwhite md:bg-opacity-80 md:border-white md:border-2 md:shadow-sm md:shadow-slate-500 md:text-black md:rounded-full md:w-fit md:px-8 md:-mt-2 md:h-[60px] md:mr-5 md:z-50 sm:bg-offwhite sm:bg-opacity-80 sm:border-white sm:border-2 sm:shadow-sm sm:shadow-slate-500 sm:text-black sm:rounded-full sm:w-fit sm:px-6 sm:-mt-2 sm:h-[40px] sm:mr-12 sm:z-50 sm:text-base">
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
    <div className="text-xl break-words max-w-[446px] md:text-base md:max-w-[79.5vw] md:mt-6 md:overflow-y-auto sm:text-sm sm:max-w-[329px] sm:mt-0 sm:mb-5 sm:overflow-y-auto">
      {content}
    </div>
  </div>
);

export default QuizInfo;

import React, { useCallback, useEffect, useState } from 'react';
import { QuizThumbnailProps } from '@/types/homeQuiz';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const QuizThumbnail: React.FC<QuizThumbnailProps> = React.memo(({ quiz }) => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  const quizId = quiz.id;

  useEffect(() => {
    const img = new Image();
    img.src = quiz.image;
    img.onerror = () => setHasError(true);
  }, [quiz.image]);

  const handleImageClick = useCallback(() => {
    navigate(`/quiz/${quizId}`);
  }, [quizId, navigate, quiz.image]); //

  if (hasError) {
    return <div className="hidden">이미지 로드 실패</div>;
  }

  return (
    <div className="w-[255px] md:w-[230px] sm:w-[167px] sm:mb-2 border-slate-100 border-2 shadow-md shadow-slate-100">
      <img
        className="h-[135px] w-full object-cover cursor-pointer sm:w-[50vw] sm:h-[88px]"
        src={quiz.image}
        alt={quiz.title}
        onClick={handleImageClick}
      />
      <div className="mt-1 items-center p-2">
        <h4 className="font-extrabold sm:text-[12px] break-words max-w-[255px]">
          {quiz.title}
        </h4>
        <div className="gap-5">
          <div className="flex items-center gap-1 text-slate-400 sm:text-[12px]">
            <FaRegEye size={16} />
            {quiz.viewCount}
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuizThumbnail;

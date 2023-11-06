import React, { useCallback, useEffect, useState } from 'react';
import { QuizThumbnailProps } from '@/types/homeQuiz';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const QuizThumbnail: React.FC<QuizThumbnailProps> = React.memo(({ quiz }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const quizId = quiz.id;

  useEffect(() => {
    const img = new Image();
    img.src = quiz.image;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setHasError(true);
  }, [quiz.image]);

  const handleImageClick = useCallback(() => {
    setIsLoading(true);
    navigate(`/quiz/${quizId}`);
  }, [quizId, navigate, quiz.image]); //

  if (isLoading) {
    return <div className="hidden">Loading...</div>;
  }

  if (hasError) {
    return <div className="hidden">이미지 로드 실패</div>; //
  }

  return (
    <div className="w-[255px]">
      <img
        loading="lazy"
        className="h-[135px] w-full object-cover cursor-pointer"
        src={quiz.image}
        alt={quiz.title}
        onClick={handleImageClick}
      />
      <div className="flex mt-2 justify-between items-center">
        <div>
          <h4
            className="font-extrabold"
            style={{ wordWrap: 'break-word', maxWidth: '255px' }}
          >
            {quiz.title}
          </h4>

          <div className="gap-5">
            <div className="flex items-center gap-1 text-slate-400">
              <FaRegEye size={16} />
              {quiz.viewCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuizThumbnail;

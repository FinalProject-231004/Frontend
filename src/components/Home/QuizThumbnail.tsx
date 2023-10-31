import React from 'react';
import { QuizThumbnailProps } from '@/types/homeQuiz';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const QuizThumbnail: React.FC<QuizThumbnailProps> = React.memo(({ quiz }) => {
  const navigate = useNavigate();
  const quizId = quiz.id;
  const handleImageClick = () => {
    console.log(quizId);
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="w-[255px]">
      <img
        loading="lazy"
        className="h-[135px] w-full object-cover "
        src={quiz.image}
        alt={quiz.title}
        onClick={handleImageClick}
      />
      <div className="flex mt-2 justify-between items-center">
        <div>
          <h4 className="font-extrabold">{quiz.title}</h4>

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

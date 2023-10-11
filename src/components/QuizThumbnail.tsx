import React from 'react';
import { QuizData } from '@/types/home';

type QuizThumbnailProps = {
  quiz: QuizData; // props로 전달되는 quiz의 타입 지정
};

const QuizThumbnail: React.FC<QuizThumbnailProps> = ({ quiz }) => {
  return (
    <div className="w-[347px]">
      <img
        src={quiz.image}
        alt={quiz.title}
        className="h-[185px] w-full object-cover"
      />
      <h4>{quiz.title}</h4>
      <div>{quiz.username}</div>
      <div>{quiz.quizLike}</div>
      <div>{quiz.viewCount}</div>
    </div>
  );
};

export default QuizThumbnail;

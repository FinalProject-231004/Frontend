import React from 'react';
import { QuizThumbnailProps } from '@/types/home';

const QuizThumbnail: React.FC<QuizThumbnailProps> = ({ quiz }) => {
  return (
    <div className="w-[347px]">
      <h4 className="text-lg mt-2">{quiz.category}</h4>
      <h4 className="text-lg mt-2">{quiz.title}</h4>
      <img
        src={quiz.image}
        alt={quiz.title}
        className="h-[185px] w-full object-cover"
      />
      <div className="flex mt-2 justify-between">
        <div>{quiz.username}</div>
        <div className="flex">
          <div>💕{quiz.likes}</div>
          <div>👁‍🗨{quiz.viewNum}</div>
        </div>
      </div>
    </div>
  );
};

export default QuizThumbnail;

import React from 'react';
import QuizThumbnail from './QuizThumbnail';
import { QuizCategorySectionProps } from '@/types/home';

const QuizCategorySection: React.FC<QuizCategorySectionProps> = ({
  title,
  quizzes,
}) => {
  return (
    <div>
      <h1 className="my-[80px] text-[28px] font-bold text-center">{title}</h1>
      <div className="gap-[20px] grid grid-cols-3">
        {quizzes.map(quiz => (
          <QuizThumbnail key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizCategorySection;

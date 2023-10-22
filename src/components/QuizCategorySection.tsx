import React from 'react';
import QuizThumbnail from './QuizThumbnail';
import { QuizCategorySectionProps } from '@/types/home';

const QuizCategorySection: React.FC<QuizCategorySectionProps> = ({
  title,
  quiz,
}) => {
  const displayedQuiz = quiz ? quiz.slice(0, 6) : [];

  return (
    <div>
      <h1 className="my-[80px] text-[28px] font-extrabold text-center">
        {title}
      </h1>
      <div className="gap-[20px] grid grid-cols-3">
        {displayedQuiz.map(quiz => (
          <QuizThumbnail key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizCategorySection;

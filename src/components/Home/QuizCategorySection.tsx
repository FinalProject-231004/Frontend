import React from 'react';
import { QuizThumbnail } from '@/components';
import { QuizCategorySectionProps } from '@/types/homeQuiz';

const QuizCategorySection: React.FC<QuizCategorySectionProps> = React.memo(
  ({ title, quiz, skipSlice = false }) => {
    const displayedQuiz = skipSlice ? quiz : quiz.slice(0, 8);

    return (
      <div className="w-full md:w-[100vw] sm:w-[100vw]">
        <h1 className="my-20 text-[28px] text-blue font-extrabold text-center sm:justify-center sm:my-[30px] sm:text-lg">
          {title}
        </h1>

        <div
          className="gap-5 grid grid-cols-4  md:grid-cols-3 md:px-4 sm:grid-cols-2 sm:grid-col-2 sm:gap-1 sm:px-2"
          style={{ justifyItems: 'center' }}
        >
          {displayedQuiz.map(quiz => (
            <QuizThumbnail key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    );
  },
);

export default QuizCategorySection;

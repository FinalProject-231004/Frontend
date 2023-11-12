import React from 'react';
import { QuizThumbnail } from '@/components';
import { QuizCategorySectionProps } from '@/types/homeQuiz';

const QuizCategorySection: React.FC<QuizCategorySectionProps> = React.memo(
  ({ title, quiz, skipSlice = false }) => {
    const displayedQuiz = skipSlice ? quiz : quiz.slice(0, 8);

    return (
      <div className="w-full md:w-[96vw] md:mx-auto sm:w-[100vw]">
        <h1 className="flex mt-8 mb-4 px-3 bg-blue text-[24px] rounded-3xl text-white font-extrabold text-center md:w-[96vw] md:mx-auto md:mb-4 md:mt-8 sm:w-[94vw] sm:mx-auto sm:mb-3 sm:mt-6  sm:justify-start sm:my-[30px] sm:text-lg">
          {title}
        </h1>

        <div
          className="gap-5 grid grid-cols-4 mb-16 md:grid-cols-3 md:w-[95vw] sm:grid-cols-2 sm:grid-col-2 sm:gap-1 sm:px-2 sm:mb-10"
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

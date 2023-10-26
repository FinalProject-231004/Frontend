import { PlayQuizGroup } from '@/components';
import React from 'react';

const PlayQuiz: React.FC = () => {
  return (
    <div className="max-w-[1080px] mx-auto">
      <PlayQuizGroup totalQuestions={50} />
    </div>
  );
};

export default PlayQuiz;

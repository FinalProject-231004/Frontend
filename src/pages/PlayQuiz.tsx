import { PlayQuizGroup } from '@/components';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayQuiz } from '@/hooks';

const PlayQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = parseInt(id || '0', 10);
  const { questions } = usePlayQuiz(numericId);

  useEffect(() => {
    if (isNaN(numericId) || numericId <= 0) {
      console.error('Invalid quiz ID');
    }
  }, [numericId]);

  return (
    <div className="max-w-[720px] mx-auto">
      <PlayQuizGroup totalQuestions={questions.length} />
    </div>
  );
};

export default PlayQuiz;

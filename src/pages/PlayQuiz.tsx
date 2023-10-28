import { PlayQuizGroup } from '@/components';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayQuiz } from '@/hooks';

const PlayQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = parseInt(id || '0', 10);
  const { questions, loading } = usePlayQuiz(numericId);

  useEffect(() => {
    if (isNaN(numericId) || numericId <= 0) {
      console.error('Invalid quiz ID');
    }
  }, [numericId]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 상태를 나타내는 UI
  }

  return (
    <div className="max-w-[1080px] mx-auto">
      <PlayQuizGroup totalQuestions={questions.length} />
    </div>
  );
};

export default PlayQuiz;

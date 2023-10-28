import { ResultPageComp } from '@/components';
import { useGetQuizDetail } from '@/hooks';
import { QuizResultProps } from '@/types/result';
import { useParams } from 'react-router';

const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);
  const { data: quizResult } = useGetQuizDetail<QuizResultProps>(
    `/api/quiz/result/${quizId}`,
    ['quizDetail', quizId],
  );

  if (!quizResult) {
    return <div className="hidden">Loading...</div>;
  }

  return (
    <div className="w-[1080px] mx-auto">
      <ResultPageComp msg={quizResult.msg} data={quizResult.data} />
    </div>
  );
};

export default ResultPage;

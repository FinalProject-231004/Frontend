import { DetailPageComp } from '@/components';
import { useGetQuizDetail } from '@/hooks';
import { QuizDetail } from '@/types/homeQuiz';
import { QuizInfoProps } from '@/types/result';
import { useParams } from 'react-router';

const DetailPage: React.FC = () => {
  const { id } = useParams();
  const quizId = Number(id);
  const { data: quizDetail } = useGetQuizDetail<QuizInfoProps & QuizDetail>(
    `/api/quiz/${id}`,
    ['quizDetail', quizId],
  );

  if (!quizDetail) {
    return <div className="hidden">Loading...</div>;
  }

  return (
    <>
      <DetailPageComp id={quizId} quizDetail={quizDetail} />
    </>
  );
};

export default DetailPage;

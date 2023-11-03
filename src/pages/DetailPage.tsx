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
    <div className="max-w-[1920px] h-[1080px] mx-auto">
      <DetailPageComp id={quizId} quizDetail={quizDetail} />
    </div>
  );
};

export default DetailPage;

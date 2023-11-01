import { DetailPageComp } from '@/components';
import { useGetQuizDetail } from '@/hooks';
import { QuizInfoProps } from '@/types/result';
import { useParams } from 'react-router';

const DetailPage: React.FC = () => {
  const { id } = useParams();
  const quizId = Number(id);
  const { data: quizInfo } = useGetQuizDetail<QuizInfoProps>(
    `/api/quiz/${id}`,
    ['quizInfo', quizId],
  );

  if (!quizInfo) {
    return <div className="hidden">Loading...</div>;
  }

  return (
    <div className="max-w-[1920px] h-[1080px] mx-auto">
      <DetailPageComp id={quizId} />
    </div>
  );
};

export default DetailPage;

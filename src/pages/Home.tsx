import { QuizCategorySection, HomeBanner } from '@/components';
import { useFetchQuiz } from '@/hooks';
import { useNavigate } from 'react-router';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // 전체조회 (신규순)
  const { quiz: allQuizzes } = useFetchQuiz(
    `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz`,
  );

  // 인기순
  const { quiz: hotQuiz } = useFetchQuiz(
    `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/hot`,
  );

  // 조회순
  const { quiz: viewNum } = useFetchQuiz(
    `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/viewCount`,
  );

  return (
    <div className="min-w-[1920px] min-h-[1080px] mx-auto">
      <div className="w-[1080px] mx-auto">
        <HomeBanner />

        <QuizCategorySection title="🆕 최신 퀴즈" quiz={allQuizzes} />

        <QuizCategorySection title="🔥 인기순 퀴즈" quiz={hotQuiz} />

        <QuizCategorySection title="👀 조회순 퀴즈" quiz={viewNum} />
        <div className="flex justify-end underline mt-16 text-blue">
          <button
            type="button"
            onClick={() => {
              navigate('/quiz/categories');
            }}
          >
            전체카테고리 보러가기👉
          </button>
        </div>
      </div>
      <div className="w-full h-[72px] bg-white"></div>
    </div>
  );
};
export default Home;

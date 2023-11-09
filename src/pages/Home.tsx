import { QuizCategorySection, HomeBanner } from '@/components';
import WriteFixedButton from '@/components/Home/WriteFixedButton';
import { useFetchQuiz } from '@/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AllQuizCategories } from '.';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);

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
    <div className="w-screen h-screen mx-auto overflow-y-auto">
      <div className="w-[1080px] mx-auto">
        <HomeBanner />
        <AllQuizCategories />
        <QuizCategorySection title="최신 퀴즈" quiz={allQuizzes} />

        <QuizCategorySection title="인기순 퀴즈" quiz={hotQuiz} />

        <QuizCategorySection title="조회순 퀴즈" quiz={viewNum} />

        <div className="flex justify-end underline mt-16 text-blue sm:w-[100vw] sm:mt-5 sm:pr-[18px]">
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
      <WriteFixedButton />
      <div className="w-full h-10 bg-white sm:h-10"></div>
    </div>
  );
};
export default Home;

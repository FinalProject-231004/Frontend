import { QuizCategorySection, Banner } from '@/components';
import WriteFixedButton from '@/components/Home/WriteFixedButton';
import { useFetchQuiz } from '@/hooks';
import { AllQuizCategories } from '.';

const Home: React.FC = () => {
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
    <div className="w-screen h-screen">
      <div className="w-[1080px] mx-auto pb-10 sm:w-[100vw] sm:pb-5">
        <Banner />
        <AllQuizCategories />
        <QuizCategorySection title="최신 퀴즈" quiz={allQuizzes} />

        <QuizCategorySection title="인기순 퀴즈" quiz={hotQuiz} />

        <QuizCategorySection title="조회순 퀴즈" quiz={viewNum} />
      </div>
      <WriteFixedButton />
    </div>
  );
};
export default Home;

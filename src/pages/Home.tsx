import QuizCategorySection from '@/components/QuizCategorySection';
import HomeBanner from '@/components/HomeBanner';
import useFetchQuiz from '@/hooks/useFetchQuiz';
import { Category, Quiz } from '@/types/homeQuiz';

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

  // 유니크한 카테고리 객체를 찾기
  const uniqueCategories = allQuizzes.reduce((acc: Category[], curr: Quiz) => {
    if (!acc.find(c => c.category === curr.category)) {
      return [...acc, curr];
    }
    return acc;
  }, []);

  return (
    <div className="w-[1920px] h-[1080px] mx-auto">
      <div className="w-[1080px] mx-auto">
        <HomeBanner />

        <QuizCategorySection
          title="🆕 이곳은 신규순 자리에욤"
          quiz={allQuizzes}
        />

        <QuizCategorySection title="🔥 이곳은 인기순 자리에욤" quiz={hotQuiz} />

        <QuizCategorySection title="👁‍🗨 이곳은 조회순 자리에욤" quiz={viewNum} />

        {/* 여기서부터는 카테고리 별로 뿌려주는 섹션 - */}
        <div className="mx-auto max-w-[1080px]">
          {/* 카테고리별 퀴즈 렌더링 */}

          {uniqueCategories?.map((categoryItem: Category) => {
            const categoryQuizzes = allQuizzes?.filter(
              (quiz: Quiz) => quiz.category === categoryItem.category,
            );
            return (
              <QuizCategorySection
                key={categoryItem.category}
                title={`😺 ${categoryItem.category}`}
                quiz={categoryQuizzes}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Home;

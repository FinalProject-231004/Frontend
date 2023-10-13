import QuizCategorySection from '@/components/QuizCategorySection';
import Banner from '@/components/HomeBanner';
import useFetchQuiz from '@/hooks/useFetchQuiz';
import { Category } from '@/types/home';

const Home: React.FC = () => {
  // 신규순 - 전체조회 후 신규순?
  const { quiz: newQuiz } = useFetchQuiz(
    `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz`,
    // `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz`
  );

  // 인기순
  const { quiz: hotQuiz } = useFetchQuiz(
    `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz`,
    // `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/hot`,
  );

  // 조회순 (api 모르겠다아아확인 필요)
  const { quiz: viewNum } = useFetchQuiz(
    `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz`,
    // `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/{id}/view`,
  );

  // 카테고리별 - ㄹㅇ 서버
  // const quizzes = useFetchQuiz(
  //   `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/quiz`,
  // );
  // 카테고리별 - json 서버
  const { quiz: categories } = useFetchQuiz(
    `${import.meta.env.VITE_APP_JSON_URL}/category`,
  );

  return (
    <div className="mx-auto max-w-[1080px]">
      {/* 배너 - ( 와이어프레임상) 1080 * 285 - 무한슬라이더*/}
      <Banner />

      <QuizCategorySection
        title="🆕 이곳은 신규순 카테고리 자리에욤"
        quiz={newQuiz}
      />

      <QuizCategorySection
        title="🔥 이곳은 인기순 카테고리 자리에욤"
        quiz={hotQuiz}
      />

      <QuizCategorySection
        title="👁‍🗨 이곳은 조회순 카테고리 자리에욤"
        quiz={viewNum}
      />

      {/* 여기서부터는 카테고리 별로 뿌려주는 섹션 - */}
      <div className="mx-auto max-w-[1080px]">
        {/* ... 기존 코드 */}

        {/* 카테고리별 섹션 렌더링 */}
        {categories &&
          categories.map((categoryItem: Category) => {
            // 해당 카테고리의 퀴즈만 필터링
            const categoryQuizzes = quizzes.filter(
              quiz => quiz.category === categoryItem.name,
            );

            return (
              <QuizCategorySection
                key={categoryItem.id}
                title={`😺 ${categoryItem.name}`}
                quiz={categoryQuizzes}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Home;

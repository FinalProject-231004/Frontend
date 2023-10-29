import { QuizCategorySection, HomeBanner } from '@/components';
import { useFetchQuiz } from '@/hooks';
import { Category, Quiz } from '@/types/homeQuiz';
import { categories } from '@/constants/categories';

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

  // 배열을 랜덤으로 섞는 함수
  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  // 유니크한 카테고리 객체를 찾기
  const uniqueCategories = shuffleArray(
    allQuizzes.reduce((acc: Category[], curr: Quiz) => {
      if (!acc.find(c => c.category === curr.category)) {
        const categoryInfo = categories.find(c => c.category === curr.category);
        return [
          ...acc,
          {
            ...curr,
            displayName: categoryInfo
              ? categoryInfo.displayName
              : curr.category,
          },
        ];
      }
      return acc;
    }, []),
  );

  return (
    <div className="min-w-[1920px] min-h-[1080px] mx-auto">
      <div className="w-[1080px] mx-auto">
        <HomeBanner />

        <QuizCategorySection title="🆕 최신 퀴즈" quiz={allQuizzes} />

        <QuizCategorySection title="🔥 인기순 퀴즈" quiz={hotQuiz} />

        <QuizCategorySection title="👀 조회순 퀴즈" quiz={viewNum} />

        {/* 여기서부터는 카테고리 별로 뿌려주는 섹션 - */}
        <div className="mx-auto max-w-[1080px]">
          {/* 카테고리별 퀴즈 렌더링 */}
          {uniqueCategories?.map((categoryItem: Category) => {
            const categoryQuizzes = allQuizzes?.filter(
              (quiz: Quiz) => quiz.category === categoryItem.category,
            );
            const categoryInfo = categories.find(
              c => c.category === categoryItem.category,
            );
            const displayName = categoryInfo
              ? categoryInfo.displayName
              : categoryItem.category;

            return (
              <QuizCategorySection
                key={categoryItem.category}
                title={`${displayName}`}
                quiz={categoryQuizzes}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full h-[72px] bg-white"></div>
    </div>
  );
};
export default Home;

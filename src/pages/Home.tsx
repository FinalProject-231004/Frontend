import { QuizCategorySection, Banner } from '@/components';
import WriteFixedButton from '@/components/Home/WriteFixedButton';
import { useFetchQuiz } from '@/hooks';
import { useEffect, useState } from 'react';
import { AllQuizCategories } from '.';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Home: React.FC = () => {
  const [bannerCategory, setBannerCategory] = useState<string | null>(null);
  const [bannerQuizzes, setBannerQuizzes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);

  const fetchBannerQuizzes = async (category: string) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/quiz/category/${category}`,
      );
      setBannerQuizzes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBannerCategoryChange = (category: string) => {
    if (category === 'LIVE_QUIZ') {
      navigate('/live-quiz');
    } else if (category === 'QUIZ_GUIDE') {
      navigate('/tutorial-quizpop');
    } else {
      setBannerCategory(category);
      fetchBannerQuizzes(category);
    }
  };

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
    <div className="w-[100vw]">
      <div className="w-[1080px] mx-auto sm:w-[100vw]">
        <Banner onCategoryChange={handleBannerCategoryChange} />
        <AllQuizCategories />
        {bannerCategory && (
          <QuizCategorySection title={bannerCategory} quiz={bannerQuizzes} />
        )}
        <QuizCategorySection title="최신 퀴즈" quiz={allQuizzes} />

        <QuizCategorySection title="인기순 퀴즈" quiz={hotQuiz} />

        <QuizCategorySection title="조회순 퀴즈" quiz={viewNum} />
      </div>
      <WriteFixedButton />
    </div>
  );
};
export default Home;

import { QuizCategorySection, Banner } from '@/components';
import { WriteFixedButton } from '@/components';
import { useFetchQuiz } from '@/hooks';
import { useEffect, useState } from 'react';
import { AllQuizCategories } from '.';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { categories } from '@/constants/categories';

const Home: React.FC = () => {
  const [bannerCategory, setBannerCategory] = useState<string | null>(null);
  const [bannerQuizzes, setBannerQuizzes] = useState([]);
  const [selectedSource, setSelectedSource] = useState('category');
  const [, setCategoryState] = useState(categories);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentCategory = pathSegments[pathSegments.length - 1];
    if (
      currentCategory &&
      categories.some(c => c.category === currentCategory)
    ) {
      setSelectedCategory(currentCategory);
      fetchCategories(currentCategory);
    }
  }, [location]);

  const fetchCategories = async (categories: string) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/quiz/category/${categories}`,
      );
      setCategoryState(response.data[0].category);
      setQuizzes(response.data);
    } catch (error) {
      // console.error(error);
    }
  };

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
      setSelectedSource('banner');
    }
  };

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
    fetchCategories(category);
    setSelectedSource('category');
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
        <AllQuizCategories onCategorySelection={handleCategorySelection} />

        {selectedSource === 'banner' && bannerCategory && (
          <QuizCategorySection
            title={
              categories.find(c => c.category === bannerCategory)
                ?.displayName || bannerCategory
            }
            quiz={bannerQuizzes}
          />
        )}

        {selectedSource === 'category' && selectedCategory && (
          <QuizCategorySection
            title={
              categories.find(c => c.category === selectedCategory)
                ?.displayName || selectedCategory
            }
            quiz={quizzes}
          />
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

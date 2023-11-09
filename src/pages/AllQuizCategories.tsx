import { useEffect, useState } from 'react';
import { categories } from '@/constants/categories';
import React from 'react';
import axios from 'axios';
import { QuizCategorySection } from '@/components';
import { useLocation, useNavigate } from 'react-router';

const AllQuizCategories: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'MOVIE_TV',
  );
  const [, setCategoryState] = useState(categories);

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentCategory = pathSegments[pathSegments.length - 1];
    if (
      currentCategory &&
      categories.some(c => c.category === currentCategory)
    ) {
      setSelectedCategory(currentCategory);
      fetchCategories(currentCategory);
    } else {
      setSelectedCategory('MOVIE_TV');
      fetchCategories('MOVIE_TV');
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

  return (
    <div className="w-full mx-auto">
      {/* <h2 className="title_bk">전체 카테고리</h2> */}
      <div className="w-full h-[134px]  grid grid-cols-5 gap-x-5 py-4 my-5 pl-[56px] justify-items-start rounded-md bg-[#F1F8FF] text-lg font-extrabold sm:w-[100vw] sm:grid-cols-3 sm:gap-2">
        {categories.map(category => (
          <div
            key={category.category}
            className="flex justify-center items-center gap-2"
          >
            <img src="/q-favicon.png" className="w-[27px]" alt={`profile`} />
            <button
              className={
                selectedCategory === category.category ? 'text-blue' : ''
              }
              type="button"
              onClick={() => {
                setSelectedCategory(category.category);
                fetchCategories(category.category);
                navigate(`/quiz/categories/${category.category}`);
              }}
            >
              {category.displayName}
            </button>
          </div>
        ))}
      </div>
      <div>
        {selectedCategory && (
          <QuizCategorySection
            title={
              categories.find(c => c.category === selectedCategory)
                ?.displayName || ''
            }
            quiz={quizzes}
            skipSlice={true}
          />
        )}
      </div>
      <div className="w-full h-[72px] bg-white"></div>
    </div>
  );
};

export default AllQuizCategories;

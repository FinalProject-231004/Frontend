import { useEffect, useState } from 'react';
import { categories } from '@/constants/categories';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { QuizCategorySection } from '@/components';

const AllQuizCategories: React.FC = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'MOVIE_TV',
  );
  const [, setCategoryState] = useState(categories);
  const getToken = () => localStorage.getItem('Authorization');

  const fetchCategories = async (category: string) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error('로그인이 필요합니다.');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/category`,
        {
          category: category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      setCategoryState(response.data.categories);
      setQuizzes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 컴포넌트가 마운트될 때 '영화/TV' 카테고리의 데이터를 자동으로 가져오게하기
  useEffect(() => {
    fetchCategories('CARTOON');
  }, []);

  return (
    <div className="max-w-[1080px] mx-auto">
      <h2 className="title">전체 카테고리</h2>
      <div className="w-full h-[134px] grid grid-cols-5 gap-x-5 py-4 pl-[65px] my-5 justify-items-start rounded-md bg-[#F1F8FF] text-lg font-extrabold">
        {categories.map(category => (
          <div
            key={category.category}
            className="flex justify-center items-center gap-2"
          >
            <img src="/q-fabicon.png" className="w-[27px]" alt={`profile`} />
            <button
              className={
                selectedCategory === category.category ? 'text-blue' : ''
              }
              type="button"
              onClick={() => {
                setSelectedCategory(category.category);
                fetchCategories(category.category);
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

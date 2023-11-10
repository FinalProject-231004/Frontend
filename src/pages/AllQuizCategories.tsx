import { useEffect, useState } from 'react';
import { categories } from '@/constants/categories';
import React from 'react';
import axios from 'axios';
import { QuizCategorySection } from '@/components';

const AllQuizCategories: React.FC = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  const basePath = '/emoticon';
  const icons = [
    {
      icon: `${basePath}/film-roll2.png`,
      category: 'MOVIE_TV',
    },
    {
      icon: `${basePath}/speech-bubble2.png`,
      category: 'CARTOON',
    },
    {
      icon: `${basePath}/intellect2.png`,
      category: 'IQ_TEST',
    },
    {
      icon: `${basePath}/restaurant2.png`,
      category: 'FOOD',
    },
    {
      icon: `${basePath}/game-controller2.png`,
      category: 'GAME',
    },
    {
      icon: `${basePath}/ball2.png`,
      category: 'SPORT',
    },
    {
      icon: `${basePath}/vacancy2.png`,
      category: 'PERSON',
    },
    {
      icon: `${basePath}/pawprint2.png`,
      category: 'ANIMAL',
    },
    {
      icon: `${basePath}/knowledge2.png`,
      category: 'COMMON_SENSE',
    },
    {
      icon: `${basePath}/more2.png`,
      category: 'ETC',
    },
  ];

  return (
    <div className="w-full md:w-[100vw] sm:w-[100vw]">
      <div className="grid grid-cols-5 py-5 pl-[70px] my-5 h-[134px] bg-[#F1F8FF] text-lg font-extrabold sm:text-xs sm:h-[143px] sm:grid-cols-3 sm:gap-2 sm:pl-[46px] sm:content-around shadow-sm shadow-slate-200">
        {categories.map(category => (
          <div key={category.category} className="flex items-center gap-2">
            <img
              src={
                icons.find(icon => icon.category === category.category)?.icon ||
                '/default/icon/path'
              }
              className=" w-[24px]"
              alt={`${category.category} icon`}
            />
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
    </div>
  );
};

export default AllQuizCategories;

import { QuizCategorySection, QuizThumbnail, SearchBar } from '@/components';
import { categories } from '@/constants/categories';
import { Quiz } from '@/types/homeQuiz';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Quiz[]>([]);
  const [choseQuiz, setChoseQuiz] = useState(false);

  const fetchCategories = async (categories: string) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/quiz/category/${categories}`,
      );
      setQuizzes(response.data);
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-[1080px] mx-auto pb-1 md:w-[100vw] pt-[103px] sm:w-[100vw] sm:pb-7">
        <div className="pb-[10px] flex justify-between items-center gap-24 sm:gap-12 sm:pb-[5px]">
          <Link to="/" className=" ">
            <img className="w-[250px]" src="/img/logo.svg" alt="Logo" />
          </Link>
          <SearchBar onSearch={setSearchResults} setChoseQuiz={setChoseQuiz} />
        </div>

        <div className="pt-3 pb-16 sm:pt-1 sm:pb-4">
          {categories.map(category => (
            <button
              key={category.category}
              className="py-[5px] px-[16px] mr-[15px] rounded-[28px] text-2xl mb-2 text-blue border border-[#0078ff] hover:bg-blue hover:text-white
            sm:text-base sm:mb-2"
              onClick={() => {
                fetchCategories(category.category);
                setSelectedCategory(category.category);
                setChoseQuiz(true);
              }}
            >
              {category.displayName}
            </button>
          ))}
        </div>

        <div>
          {choseQuiz
            ? selectedCategory && (
                <QuizCategorySection
                  title={
                    categories.find(c => c.category === selectedCategory)
                      ?.displayName || ''
                  }
                  quiz={quizzes}
                  skipSlice={true}
                />
              )
            : searchResults && (
                <div className="w-full md:w-[96vw] md:mx-auto sm:w-[100vw]">
                  <div
                    className="gap-5 grid grid-cols-4 mb-12 md:grid-cols-3 md:w-[95vw] sm:grid-cols-2 sm:grid-col-2 sm:gap-1 sm:px-2 sm:mb-10"
                    style={{ justifyItems: 'center' }}
                  >
                    {searchResults.map(quiz => (
                      <QuizThumbnail key={quiz.id} quiz={quiz} />
                    ))}
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}

export default Search;

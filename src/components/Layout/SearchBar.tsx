import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { getAPI } from '@/apis/axios';
import { useDebounce } from '@/hooks';
import { useNavigate } from 'react-router';
import { SearchResult } from '@/types/header';
import { Quiz } from '@/types/homeQuiz';

type searchBarProps = {
  onSearch: (quizzes: Quiz[]) => void;
  setChoseQuiz: Dispatch<SetStateAction<boolean>>;
};

const SearchBar = ({ onSearch }: searchBarProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [relativeSearch, setRelativeSearch] = useState<SearchResult[]>([]);
  const debouncedSearchTerm = useDebounce(searchInput, 200);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const wrapperRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      event.target instanceof Node &&
      !wrapperRef.current.contains(event.target)
    ) {
      // input 필드와 결과 창 외부 클릭 감지
      setIsSearchOpen(false);
      setSearchInput(''); // input 비우기

      if (inputRef.current) {
        inputRef.current.blur(); // 포커스 제거
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getRelatedResult();
    } else {
      setRelativeSearch([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (searchInput) {
      setSearchInput(searchInput); // 입력창에 Recoil 상태값 설정
    }
  }, [searchInput, setSearchInput]);
  // useEffect(() => {
  //   if (!isSearchOpen) {
  //     console.log('isSearchOpen:', isSearchOpen);
  //     setSearchInput('');
  //   }
  // }, [isSearchOpen]);

  const getRelatedResult = async () => {
    try {
      const response = await getAPI<SearchResult[]>(
        `/api/quiz/search-bar?keyword=${searchInput}`,
      );
      setRelativeSearch(response.data);
      setIsSearchOpen(true);
      // console.log("퀴즈 검색",response.data);
    } catch (error) {
      // console.log('error', error);
    }
  };
  const getSearchResult = async () => {
    try {
      const response = await getAPI<Quiz[]>(
        `/api/quiz/search?keyword=${searchInput}`,
      );
      onSearch(response.data);
      setIsSearchOpen(false);
      console.log('퀴즈 검색', response.data);
    } catch (error) {
      // console.log('error', error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const SwitchToQuizPage = () => {
    const found = relativeSearch.find(result => result.title === searchInput);
    if (found) {
      navigate(`/quiz/${found.id}`); // 퀴즈 소개 페이지로 이동
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full m-0 h-[72px] pl-8 pr-20 text-2xl text-gray-900 border-gray-300 rounded-[28px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            sm:h-[36px] sm:pr-10 sm:text-base sm:pl-4"
            placeholder=""
            required
            onChange={handleSearchChange}
            ref={inputRef}
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-8 sm:pr-3"
            onClick={() => {
              SwitchToQuizPage();
              getSearchResult();
            }}
          >
            <svg
              className="w-8 h-10 text-gray-500 dark:text-gray-400 sm:w-4 sm:h-5"
              aria-hidden="true"
              xmlns="/img/logo.svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </form>

      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-t-0 z-10">
          {searchInput &&
            relativeSearch.map(result => (
              <div
                key={result.id}
                className="p-2 hover:bg-gray-100 cursor-pointer text-2xl"
                onClick={() => {
                  navigate(`/quiz/${result.id}`);
                  setIsSearchOpen(false);
                }}
              >
                {result.title}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

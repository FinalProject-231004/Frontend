import { useEffect, useRef, useState } from 'react';
import { getAPI } from '@/apis/axios';
import { useDebounce } from '@/hooks';
import { useNavigate } from 'react-router';
import { SearchResult } from '@/types/header';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [relativeSearch,setRelativeSearch] = useState<SearchResult[]>([]);
  const debouncedSearchTerm = useDebounce(searchInput, 200);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const wrapperRef = useRef<null | HTMLDivElement>(null); 
  const inputRef = useRef<null | HTMLInputElement>(null);

  const navigate = useNavigate();
  
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); 
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (wrapperRef.current && event.target instanceof Node && !wrapperRef.current.contains(event.target)) {
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
    if(debouncedSearchTerm) {
      getSearchResult();
    } else {
      setRelativeSearch([]);
    }
  },[debouncedSearchTerm]);

  // useEffect(() => {
  //   if (!isSearchOpen) {
  //     console.log('isSearchOpen:', isSearchOpen);
  //     setSearchInput('');
  //   }
  // }, [isSearchOpen]);

  const getSearchResult = async () => {
    try {
      const response = await getAPI<SearchResult[]>(`/api/quiz/search-bar?keyword=${searchInput}`);
      setRelativeSearch(response.data);
      setIsSearchOpen(true);
      // console.log("퀴즈 검색",response.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const SwitchToQuizPage = () => {
    const found = relativeSearch.find((result) => result.title === searchInput)
    if(found) {
      navigate(''); // 퀴즈 소개 페이지로 이동
    }
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>   
         <div className="relative">
            <input type="search" id="default-search"
              className="block w-full m-0 h-[37px] p-4 text-sm text-gray-900 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Search" required 
              onChange={handleSearchChange}
              ref={inputRef}
            />
            <button className="absolute inset-y-0 right-0 flex items-center pr-3 " onClick={SwitchToQuizPage}>
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </button>
          </div>
      </form>

      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-t-0 z-10">
          {searchInput &&
            relativeSearch.map((result) => (
              <div key={result.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={()=> {navigate(''); setIsSearchOpen(false);}}> {/*퀴즈 상세페이지로 이동하고 검색창 닫기*/}
                {result.title}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
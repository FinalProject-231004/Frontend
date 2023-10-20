// import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// import { searchInputState, searchResultsState } from '@/recoil/searchState';
import { useEffect, useRef, useState } from 'react';
import { getAPI } from '@/apis/axios';
// import { useNavigate } from 'react-router';
// import axios from 'axios';

// const SearchBar: React.FC = () => {
const SearchBar = () => {
  type SearchResult = { 
    title: string;
    id: number;
  };

  // const [input, setInput] = useRecoilState(searchInputState);
  const [searchInput, setSearchInput] = useState('');
  const [relativeSearch,setRelativeSearch] = useState<SearchResult[]>([]);
  // const searchResults = useRecoilValue(searchResultsState); // 여기에서 searchResults 상태 값을 가져옵니다.
  // const setSearchResults = useSetRecoilState(searchResultsState); // 상태를 설정하는 데 사용됩니다.
  // const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);
  // const cancelTokenSource = useRef<axios.CancelTokenSource | null>(null); // 요청 중단을 위한 ref

  // const getSearchResult = async () => {
  //   if (cancelTokenSource.current) {
  //     // 이전 요청이 있으면 취소합니다.
  //     cancelTokenSource.current.cancel('Cancelling the previous request.');
  //   }

  //   // 새 요청에 대한 취소 토큰 생성
  //   cancelTokenSource.current = axios.CancelToken.source();

  //   try {
  //     setLoading(true);
  //     const response = await axios.get<SearchResult[]>(`/api/quiz/search-bar?keyword=${searchInput}`, {
  //       cancelToken: cancelTokenSource.current.token, // 요청에 취소 토큰 추가
  //     });
  //     setRelativeSearch(response.data);
  //     console.log("퀴즈 검색",response.data);
  //   } catch (error) {
  //     if (!axios.isCancel(error)) {
  //       console.log('error', error);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     if (searchInput) {
  //       getSearchResult(); // 지연된 함수 호출
  //     }
  //   }, 300); // 300ms의 딜레이 설정

  //   return () => clearTimeout(delayDebounceFn); // 컴포넌트가 unmount되거나 업데이트되기 전에 타이머를 제거합니다.
  // }, [searchInput]);

  const getSearchResult = async () => {
    try {
      const response = await getAPI<SearchResult[]>(`/api/quiz/search-bar?keyword=${searchInput}`)
      setRelativeSearch(response.data)
      console.log("퀴즈 검색",response.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    getSearchResult();
  };

  // useEffect(() => {
  // }, [searchInput, setRelativeSearch]);

  return (
    <div className="relative">
      <form>   
         <div className="relative">
            <input type="search" id="default-search" className="block w-full m-0 h-[37px] p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required 
              onChange={handleSearchChange}
            />
            <button className="absolute inset-y-0 right-0 flex items-center pr-3 ">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </button>
          </div>
      </form>

      {/* 외부 클릭 시 창 닫기(onblure ?) */}
      <div className="absolute top-full left-0 right-0 bg-white border border-t-0 z-10">
        {searchInput &&
          relativeSearch.map((result) => ( // searchResults 결과
            <div key={result.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={()=>navigate('')}> {/*퀴즈 상세페이지로 이동*/}
              {result.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;



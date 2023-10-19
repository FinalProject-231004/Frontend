// export default function SearchBar() {
//   return (
//     <>
//       <form>   
//         {/* <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> */}
//          <div className="relative mr-[37px]">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//               </svg>
//              </div>
//             <input type="search" id="default-search" className="block w-full h-[37px] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
//             {/* <button type="submit" className="text-white absolute right-2.5 bottom-0.5 bg-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
//           </div>
//       </form>
//     </>
//   )
// }


// import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// import { searchInputState, searchResultsState } from '@/recoil/searchState';
import { useEffect, useState } from 'react';
import { getAPI } from '@/apis/axios';

const SearchBar: React.FC = () => {
  type SearchResult = { 
    title: string;
    id: number;
  };

  // const [input, setInput] = useRecoilState(searchInputState);
  const [searchInput, setSearchInput] = useState('');
  const [relativeSearch,setRelativeSearch] = useState<SearchResult[]>([]);
  // const searchResults = useRecoilValue(searchResultsState); // 여기에서 searchResults 상태 값을 가져옵니다.
  // const setSearchResults = useSetRecoilState(searchResultsState); // 상태를 설정하는 데 사용됩니다.

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    getSearch();
  };

  const getSearch = async () => {
    try {
      const response = await getAPI<SearchResult[]>(`/api/quiz/search-bar?keyword=${searchInput}`)
      setRelativeSearch(response.data)
      console.log("퀴즈 검색",response.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  console.log("연관 퀴즈 결과",relativeSearch)

  // 검색 결과 빈 배열일 때와 객체 배열일 때 고려
  useEffect(() => {
    // if (searchInput) {
    //   const titles = relativeSearch
    //     .filter(item => typeof item === 'object' && 'title' in item)
    //     .map(item => (item as { title: string }));
    //   setRelativeSearch(titles); // 임시 검색 결과의 title 속성만 추출하여 설정
    // } else {
    //   setRelativeSearch([]);
    // }
  }, [searchInput, setRelativeSearch]);

  return (
    <div className="relative">
      
      <form>   
        {/* <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> */}
         <div className="relative mr-[37px]">
            <input type="search" id="default-search" className="block w-full m-0 h-[37px] p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required 
              onChange={handleSearchChange}
            />
            <button className="absolute inset-y-0 right-0 flex items-center pr-3 ">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </button>
            {/* <button type="submit" className="text-white absolute right-2.5 bottom-0.5 bg-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
          </div>
      </form>

      <div className="absolute top-full left-0 right-0 bg-white border border-t-0 z-10">
        {searchInput &&
          relativeSearch.map((result) => ( // searchResults 결과
            <div key={result.id} className="p-2 hover:bg-gray-100" onClick={()=>{}}>
              {result.title}
              {/* {typeof result === 'object' && 'title' in result ? (result as { title: string }).title : ''} */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;



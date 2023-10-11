import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import useToast from '@/hooks/useToast';

const Home: React.FC = () => {
  // 라이브 퀴즈 알림
  useToast();

  // const fetchCategory = async (category: string) => {
  //   try {
  //     const data = await getAPI(`/api/quiz/category`);
  //     // const { data } = await getAPI(`/api/quiz/category`);
  //   } catch (error) {
  //     console.error('데이터 가져오는데 에러발생 😥:', error);
  //   }
  // };

  // const fetchQuizThumbnail = async () => {
  //   try {
  //     // 여기
  //     // const { data } = await getAPI(`/api/test`);
  //     const { data } = await getAPI(`/api/tests`);
  //     return data;
  //   } catch (error) {
  //     console.error('데이터 가져오는데 에러발생 😥:', error);
  //   }
  // };

  // const { data } = useQuery<Tester[]>( // 주로 get에서 사용
  //   ['test'], // query key. 고정, 유동 가능
  //   () => fetchTestCards(), // 함수. 함수의 값이 axios 이어야 한다. 비동기 함수의 리턴해주는 일반 함수
  // );

  return (
    <div className="mx-auto max-w-[1080px]">
      {/* 배너 - ( 와이어프레임상) 1080 * 285 - 무한슬라이더*/}
      <div className="w-full h-[285px] bg-gray-300 mt-[100px] items-center justify-center">
        slider
      </div>

      <div className="my-[20px] grid grid-cols-3 gap-20">
        {/* 퀴즈 썸네일 (컴포넌트 - map 사용해서 한 줄에 3개씩)*/}
        {/* 최신순 */}
        {/* {data?.map((card: any, index: number) => {
          return (
            // as={`/test-detail/${card.id}`}
            <div
              key={index}
              }}
            >
              <TestCard tester={card} />
            </div>
          );
        })} */}
      </div>
    </div>
  );
  {
    /* 인기순 */
  }
  {
    /* 조회순 */
  }
  {
    /* 카테고리별 - 무한스크롤? */
  }
};

export default Home;

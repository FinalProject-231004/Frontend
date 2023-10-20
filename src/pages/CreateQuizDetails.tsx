import { ImageUploader } from '@/components/CreateQuiz';

const CreateQuizDetails: React.FC = () => {
  return (
    <div className="max-w-[1080px] mx-auto">
      <h2 className="text-center mt-[150px] mb-[75px] text-[32px] font-extrabold text-blue">
        퀴즈 만들기
      </h2>
      <div>
        <h3>퀴즈명</h3>
        <input />
      </div>

      <div>
        <h3>퀴즈 소개글</h3>
        <textarea />
      </div>

      <div>
        <h3>카테고리 목록</h3>
        <div>
          {/* 버튼형식으로 카테고리 보여줌? */}
          {/* SCIENCE,
    HISTORY,
    LITERATURE,
    MOVIE_TV,
    MUSIC,
    SPORT,
    GEOGRAPHY,
    MATH,
    TECHNOLOGY_IT,
    LIFESTYLE_FASHION,
    HOBBY_LEISURE,
    PEOPLE,
    HUMOR,
    TREND,
    LANGUAGE,
    HORROR,
    KNOWLEDGE,
    ETC */}
        </div>
      </div>

      <div>
        <h3>이미지 파일 추가</h3>
        {/* <ImageUploader /> */}
      </div>

      <div className="fixed bottom-0 w-[1080px] mx-auto bg-white">
        <button
          type="button"
          className="w-full h-[80px] bg-blue font-extrabold text-[26px] text-white py-3"
        >
          세부 질문 만들기
        </button>
      </div>
    </div>
  );
};

export default CreateQuizDetails;

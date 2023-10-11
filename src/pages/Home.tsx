import React, { useEffect, useState } from 'react';
import QuizCategorySection from '@/components/QuizCategorySection';
import axios from 'axios';

const Home: React.FC = () => {
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tester');
        setQuiz(response.data);
      } catch (error) {
        console.error('데이터 가져오는데 에러발생 😥:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-[1080px]">
      {/* 배너 - ( 와이어프레임상) 1080 * 285 - 무한슬라이더*/}
      <div className="w-[1080px] h-[285px] bg-gray-300 mt-[100px]">
        {' '}
        무한 슬라이드{' '}
      </div>

      <QuizCategorySection
        title="🆕 이곳은 신규 카테고리 자리에욤"
        quizzes={quiz}
      />
      <QuizCategorySection
        title="🔥 이곳은 인기 카테고리 자리에욤"
        quizzes={quiz}
      />
      <QuizCategorySection
        title="👁‍🗨 이곳은 조회수 높은 카테고리 자리에욤"
        quizzes={quiz}
      />
    </div>
  );
};
export default Home;

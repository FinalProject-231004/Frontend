import React, { useEffect, useState } from 'react';
import { QuizCategorySection, Banner } from '@/components';
import WriteFixedButton from '@/components/Home/WriteFixedButton';
import { AllQuizCategories } from '.';
import { getAPI } from '@/apis/axios';
import { Quiz } from '@/types/homeQuiz';

const Home: React.FC = () => {
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const [hotQuiz, setHotQuiz] = useState<Quiz[]>([]);
  const [viewNum, setViewNum] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const responses = await Promise.all([
          getAPI<Quiz[]>('/api/quiz'),
          getAPI<Quiz[]>('/api/quiz/hot'),
          getAPI<Quiz[]>('/api/quiz/viewCount'),
        ]);

        setAllQuizzes(responses[0].data);
        setHotQuiz(responses[1].data);
        setViewNum(responses[2].data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="w-[1080px] mx-auto pb-10 sm:w-[100vw] sm:pb-5">
        <Banner />
        <AllQuizCategories />
        <QuizCategorySection title="최신 퀴즈" quiz={allQuizzes} />
        <QuizCategorySection title="인기순 퀴즈" quiz={hotQuiz} />
        <QuizCategorySection title="조회순 퀴즈" quiz={viewNum} />
      </div>
      <WriteFixedButton />
    </div>
  );
};

export default Home;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
// import MyPage from '@/pages/MyPage';
// import CreateQuiz1 from '@/pages/CreateQuiz1';
// import CreateQuiz2 from '@/pages/CreateQuiz2';
// import QuizDetail from '@/pages/QuizDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/mypage" element={<MyPage />} />
        <Route path="/createquiz/1" element={<CreateQuiz1 />} />
        <Route path="/createquiz/2" element={<CreateQuiz2 />} />
        <Route path="/quizdetail" element={<QuizDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

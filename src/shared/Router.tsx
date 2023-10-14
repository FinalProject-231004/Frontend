import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import QuizQuestionsEditor from '@/pages/QuizQuestionsEditor';
// import MyPage from '@/pages/MyPage';
// import QuizInfoEditor from '@/pages/QuizInfoEditor';
// import QuizDetail from '@/pages/QuizDetail';

const Router = () => {
  return (
    <BrowserRouter>
      {/* 헤더 위치 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizquestions" element={<QuizQuestionsEditor />} />
        {/* <Route path="/mypage" element={<MyPage />} />
        <Route path="/quizinfoeditor" element={<QuizInfoEditor />} />
        <Route path="/quizdetail" element={<QuizDetail />} /> */}
      </Routes>
      {/* 푸터 위치 */}
    </BrowserRouter>
  );
};

export default Router;

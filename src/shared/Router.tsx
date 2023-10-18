import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilEnv } from 'recoil';
import Home from '@/pages/Home';
import CreateQuizQuestions from '@/pages/CreateQuizQuestions';
// import MyPage from '@/pages/MyPage';
// import QuizInfoEditor from '@/pages/QuizInfoEditor';
// import QuizDetail from '@/pages/QuizDetail';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const Router = () => {
  return (
    <BrowserRouter>
      {/* 헤더 위치 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizquestions" element={<CreateQuizQuestions />} />
        {/* <Route path="/mypage" element={<MyPage />} />
        <Route path="/quizinfoeditor" element={<QuizInfoEditor />} />
        <Route path="/quizdetail" element={<QuizDetail />} /> */}
      </Routes>
      {/* 푸터 위치 */}
    </BrowserRouter>
  );
};

export default Router;

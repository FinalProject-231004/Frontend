import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilEnv } from 'recoil';
import Home from '@/pages/Home';
import CreateQuizQuestions from '@/pages/CreateQuizQuestions';
import Layout from '@/components/Layout/Layout';

import TokenRefresher from '@/apis/TokenRefresher';
import Auth from '@/containers/User/Auth';

// import MyPage from '@/pages/MyPage';
// import QuizInfoEditor from '@/pages/QuizInfoEditor';
// import QuizDetail from '@/pages/QuizDetail';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <TokenRefresher />
        <Routes>
          <Route path="/api/member/kakao/callback" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/quizquestions" element={<CreateQuizQuestions />} />
          {/* <Route path="/mypage" element={<MyPage />} />
          <Route path="/quizdetail" element={<QuizDetail />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

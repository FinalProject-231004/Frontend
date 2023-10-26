import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilEnv } from 'recoil';
import {
  Home,
  CreateQuizQuestions,
  CreateQuizDetails,
  PlayQuiz,
} from '@/pages';
import { Layout } from '@/components';
import TokenRefresher from '@/apis/TokenRefresher';
// import Auth from '@/containers/User/Auth';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const Router = () => {
  return (
    <BrowserRouter>
      <TokenRefresher />
      <Layout>
        <Routes>
          {/* <Route path="/api/member/kakao/callback" element={<Auth />} /> */}
          <Route path="/" element={<Home />} />
          <Route
            path="/create-quiz/questions"
            element={<CreateQuizQuestions />}
          />
          <Route path="/create-quiz/details" element={<CreateQuizDetails />} />
          <Route path="/play-quiz" element={<PlayQuiz />} />
          {/* <Route path="/mypage" element={<MyPage />} />*/}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

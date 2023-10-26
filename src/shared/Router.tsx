import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { RecoilEnv } from 'recoil';
import Home from '@/pages/Home';
import CreateQuizQuestions from '@/pages/CreateQuizQuestions';
import CreateQuizDetails from '@/pages/CreateQuizDetails';
import { Layout } from '@/components/Layout';
import TokenRefresher from '@/apis/TokenRefresher';
import MyPage from '@/pages/MyPage';
import VerifyPassword from '@/pages/VerifyPassword';
import { ReactNode } from 'react';
// import Auth from '@/containers/User/Auth';
// import QuizInfoEditor from '@/pages/QuizInfoEditor';
// import QuizDetail from '@/pages/QuizDetail';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

type ConditionalLayoutProps = {
  children: ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const location = useLocation();
  if (location.pathname === '/mypage/verify-password') {
    return children;
  }
  return <Layout>{children}</Layout>;
};

const Router = () => {
  return (
    <BrowserRouter>
      <TokenRefresher />
      <ConditionalLayout>
        <Routes>
          {/* <Route path="/api/member/kakao/callback" element={<Auth />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/verify-password" element={<VerifyPassword />} />
          <Route
            path="/create-quiz/questions"
            element={<CreateQuizQuestions />}
          />
          <Route path="/create-quiz/details" element={<CreateQuizDetails />} />
          {/* <Route path="/quizdetail" element={<QuizDetail />} /> */}
        </Routes>
      </ConditionalLayout>
    </BrowserRouter>
  );
};

export default Router;

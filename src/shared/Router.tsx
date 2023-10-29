import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { RecoilEnv } from 'recoil';
import {
  Home,
  CreateQuizQuestions,
  CreateQuizDetails,
  PlayQuiz,
  ResultPage,
  VerifyPassword,
  MyPage,
} from '@/pages';
import { Layout, PrivateRoute } from '@/components';
import TokenRefresher from '@/apis/TokenRefresher';
import { ReactNode } from 'react';
import Auth from '@/containers/User/Auth';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

type ConditionalLayoutProps = {
  children: ReactNode;
};

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
          <Route path="/" element={<Home />} />
          <Route path="/login/kakao" element={<Auth />} />
          <Route path="/play-quiz/:id" element={<PlayQuiz />} />
          <Route path="/result/:id" element={<ResultPage />} />

          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mypage/verify-password"
            element={
              <PrivateRoute>
                <VerifyPassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-quiz/questions/:id"
            element={
              <PrivateRoute>
                <CreateQuizQuestions />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-quiz/details"
            element={
              <PrivateRoute>
                <CreateQuizDetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </ConditionalLayout>
    </BrowserRouter>
  );
};

export default Router;

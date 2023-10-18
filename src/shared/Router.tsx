import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Layout from '@/components/Layout/Layout';

// import TokenRefresher from '@/apis/TokenRefresher';
import TokenTest from '@/apis/tokenTest';
// import Auth from '@/containers/User/Auth';

// import MyPage from '@/pages/MyPage';
// import QuizDetail from '@/pages/QuizDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <TokenTest />
        {/* <TokenRefresher /> */}
        <Routes>
        {/* <Route path='/kakao/callback' element={<Auth />} /> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/mypage" element={<MyPage />} />
          <Route path="/quizdetail" element={<QuizDetail />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

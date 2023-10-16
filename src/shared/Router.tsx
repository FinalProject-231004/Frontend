import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Layout from '@/components/Layout/Layout';

// import TokenRefresher from '@/apis/TokenRefresher';
// import TokenTest from '@/apis/tokenTest';

// import MyPage from '@/pages/MyPage';
// import QuizDetail from '@/pages/QuizDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        {/* <TokenRefresher /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/mypage" element={<MyPage />} />
          <Route path="/quizdetail" element={<QuizDetail />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

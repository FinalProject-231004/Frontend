import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../pages/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menber/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

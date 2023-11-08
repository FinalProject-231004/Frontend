import SignInModal from '@/containers/User/SigninModal';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoggedInHeader, SearchBar } from '@/components';
import { useModalState } from '@/hooks';
import { Modal } from '@/components/index';
import { toast } from 'react-toastify';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const confirmLoginModal = useModalState();
  const token = localStorage.getItem('Authorization');

  const handleQuizCreateClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault(); // 이동 방지
    if (!token) {
      // confirmLoginModal.open();
      toast.warning('로그인이 필요한 서비스입니다.');
    } else if (token) {
      navigate('/create-quiz/details');
    }
  };

  // const preparing = () => {
  //   toast.warning('⚒️준비중인 서비스입니다!!⚒️ 💙우리 조만간 만나요🤗💙');
  // };

  return (
    <div className="w-screen mx-auto">
      <div className="w-screen h-[72px] mx-auto justify-center fixed top-0 bg-white flex items-center shadow-sm z-[999]">
        <div className="flex justify-between items-center  w-[1080px] ">
          <div className="flex items-center space-x-[37px] text-[20px]">
            <Link to="/" style={{ width: '132px' }}>
              <img src="/img/logo.svg" alt="Logo" />
            </Link>
            <Link
              className="transform motion-safe:hover:-translate motion-safe:hover:scale-110 transition ease-in-out duration-300 "
              onClick={handleQuizCreateClick}
              to="/create-quiz/details"
            >
              퀴즈만들기
            </Link>
            <Link
              className="transform motion-safe:hover:-translate motion-safe:hover:scale-110 transition ease-in-out duration-300 "
              to="/mileage-shop"
            >
              마일리지샵
            </Link>
            <Link
              className="transform motion-safe:hover:-translate motion-safe:hover:scale-110 transition ease-in-out duration-300 "
              to="/live-quiz"
            >
              라이브 퀴즈
            </Link>
          </div>
          <div className="flex">
            <div className="mr-[25px]">
              <SearchBar />
            </div>
            {isLoggedIn ? <LoggedInHeader /> : <SignInModal />}
          </div>
        </div>

        <Modal
          isOpen={confirmLoginModal.isOpen}
          onRequestClose={confirmLoginModal.close}
          width={''}
          height={''}
          bgColor={''}
        >
          <p>로그인이 필요한 서비스입니다.</p>
          <button onClick={confirmLoginModal.close}>닫기</button>
          {/* 예: <SignInModal /> */}
        </Modal>
      </div>
    </div>
  );
}

export default Header;

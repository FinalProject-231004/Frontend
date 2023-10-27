import SignInModal from '@/containers/User/SigninModal';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoggedInHeader } from '@/components';
import { useModalState } from '@/hooks';
import {Modal} from '@/components/index';
import { toast } from 'react-toastify';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const confirmLoginModal = useModalState();
  const token = localStorage.getItem('Authorization');
  const logoImg = "/img/logo.svg";

  const handleQuizCreateClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // 이동 방지
    if (!token) {
      // confirmLoginModal.open();
      toast.warning('로그인이 필요한 서비스입니다.');
    } else if (token) {
      navigate('/create-quiz/details');
    }
  };

  return (
    <>
      {/* <div className="w-[1920px] h-[72px] fixed top-0 left-0 right-0 px-[420px] bg-white flex justify-between items-center"> */}
      <div className="w-full justify-center h-[72px] fixed top-0 px-[420px] bg-white flex items-center shadow-sm ">
        <div className="flex justify-between w-[1080px]">
          <div className="flex items-center">
            <Link to="/" className="mr-[37px]">
              <img src={logoImg} alt="Logo" />
            </Link>
            <Link onClick={handleQuizCreateClick} to="/create-quiz/details" className="mr-[37px]">
              퀴즈만들기
            </Link>
            <Link to="/create-quiz/details" className="mr-[37px]">
              마일리지샵
            </Link>
            <Link to="" className="mr-[37px]">
              라이브 퀴즈
            </Link>
          </div>
          {isLoggedIn ? <LoggedInHeader /> : <SignInModal />}
        </div>

        <Modal
          isOpen={confirmLoginModal.isOpen}
          onRequestClose={confirmLoginModal.close} width={''} height={''} bgColor={''}>
          <p>로그인이 필요한 서비스입니다.</p>
          <button onClick={confirmLoginModal.close}>닫기</button>
          {/* 예: <SignInModal /> */}
        </Modal>

      </div>
    </>
  );
}

export default Header;

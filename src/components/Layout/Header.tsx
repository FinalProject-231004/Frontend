import SignInModal from '@/containers/User/SigninModal';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoggedInHeader } from '@/components';
import { useModalState } from '@/hooks';
import Modal from 'react-modal';

function Header() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const confirmLoginModal = useModalState();

  const handleQuizCreateClick = () => {
    if (!isLoggedIn) {
      confirmLoginModal.open();
    } else {
      // 로그인한 상태라면 퀴즈 만들기 페이지로 이동하거나 원하는 작업을 수행합니다.
    }
  };

  return (
    <>
      {/* <div className="w-[1920px] h-[72px] fixed top-0 left-0 right-0 px-[420px] bg-white flex justify-between items-center"> */}
      <div className="w-full justify-center h-[72px] fixed top-0 px-[420px] bg-white flex items-center shadow-sm ">
        <div className="flex justify-between w-[1080px]">
          <div className="flex items-center">
            <Link to="/" className="mr-[37px]">
              로고
            </Link>
            <Link onClick={handleQuizCreateClick} to="/create-quiz/details" className="mr-[37px]">
              퀴즈만들기
            </Link>
            <Link to="" className="mr-[37px]">
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
          onRequestClose={confirmLoginModal.close}
          contentLabel="로그인이 필요한 서비스입니다."
        >
          <p>로그인이 필요한 서비스입니다.</p>
          <button onClick={confirmLoginModal.close}>닫기</button>
          {/* 모달 안에 로그인 컴포넌트 또는 로그인 모달을 추가할 수 있습니다. */}
          {/* 예: <SignInModal /> */}
        </Modal>

      </div>
    </>
  );
}

export default Header;

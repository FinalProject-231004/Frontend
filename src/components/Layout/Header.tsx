import SignInModal from '@/containers/User/SigninModal';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoggedInHeader, SearchBar } from '@/components';
import { useModalState, useMobile } from '@/hooks';
import { Modal } from '@/components/index';
import { toast } from 'react-toastify';

function Header() {
  const navigate = useNavigate();
  const isMobile = useMobile();
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

  const preparing = () =>{
    toast.warning('⚒️준비중인 서비스입니다!!⚒️ 💙우리 조만간 만나요🤗💙');
  }

  return (
    <header className="w-screen flex justify-center fixed top-0 bg-white shadow-sm z-[999] sm:flex ">
      <div className="w-[1080px] py-3 m-auto flex justify-between items-center sm:p-0 sm:flex-col">
        {isMobile ? (
          // 모바일 환경
          <>
          <Link to="/" className='py-9 '>
            <img src="/img/logo.svg" alt="Logo" />
          </Link>
          <div className="w-[100vw] flex justify-between px-8 pb-4">
            <div className="">
              <SearchBar />
            </div>
            {isLoggedIn ? <LoggedInHeader /> : <SignInModal />}
          </div>
          <div className='w-[100vw] px-8 py-3 flex justify-between'>
            <Link className='transform motion-safe:hover:-translate motion-safe:hover:scale-110 transition ease-in-out duration-300 ' 
              onClick={handleQuizCreateClick} to="/create-quiz/details">
                퀴즈만들기
            </Link>
            <Link className='transform motion-safe:hover:-translate motion-safe:hover:scale-110 transition ease-in-out duration-300 ' 
              to="/mileage-shop">마일리지샵</Link>
            <Link className='transform motion-safe:hover:-translate motion-safe:hover:scale-110 transition ease-in-out duration-300 ' 
              onClick={preparing} to="">라이브 퀴즈
            </Link>
          </div>
          </>
          ) : (
            // 데스크탑 환경
          <>
            <div className='flex justify-center items-center gap-9'>
              <Link to="/">
                <img src="/img/logo.svg" alt="Logo" />
              </Link>
              <Link className='text-xl transform motion-safe:hover:-translate motion-safe:hover:scale-110 transition ease-in-out duration-300 ' 
                onClick={handleQuizCreateClick} to="/create-quiz/details">
                  퀴즈만들기
              </Link>
              <Link className='text-xl transform motion-safe:hover:-translate motion-safe:hover:scale-110 transition ease-in-out duration-300 ' 
                to="/mileage-shop">마일리지샵
              </Link>
              <Link className='text-xl transform motion-safe:hover:-translate motion-safe:hover:scale-110 transition ease-in-out duration-300 ' 
                onClick={preparing} to="">라이브 퀴즈
              </Link>
            </div>
            <div className="flex gap-9">
              <SearchBar />
              {isLoggedIn ? <LoggedInHeader /> : <SignInModal />}
            </div>
          </>) 
        }
        
        <Modal
          isOpen={confirmLoginModal.isOpen}
          onRequestClose={confirmLoginModal.close}
          width={''}
          height={''}
          bgColor={''}
        >
          <p>로그인이 필요한 서비스입니다.</p>
          <button onClick={confirmLoginModal.close}>닫기</button>
        </Modal>
      </div>
    </header>
  );
}

export default Header;

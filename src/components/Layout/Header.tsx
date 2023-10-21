// import SignUpModal from '../SignUpModal'
import SignInModal from '@/containers/User/SigninModal';
import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import { Link } from 'react-router-dom'
import {  useRecoilValue } from 'recoil';
import LoggedInHeader from './LoggedInHeader';

function Header() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  // const token = localStorage.getItem('Authorization');
  
  return(
    <>
      {/* <div className="w-[1920px] h-[72px] fixed top-0 left-0 right-0 px-[420px] bg-white flex justify-between items-center"> */}
      <div className="w-full justify-center h-[72px] fixed top-0 px-[420px] bg-white flex items-center shadow-sm ">
        <div className='flex justify-between w-[1080px]'>
          <div className='flex items-center'>
            <Link to='' className='mr-[37px]'>로고</Link>
            <Link to='' className='mr-[37px]'>퀴즈만들기</Link>
            <Link to='' className='mr-[37px]'>마일리지샵</Link>
            <Link to='' className='mr-[37px]'>라이브 퀴즈</Link>
          </div>
          {isLoggedIn ? (
            <LoggedInHeader />
          ) : (
            <SignInModal/>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
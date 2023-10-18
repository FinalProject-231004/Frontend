import { isLoggedInState } from '@/recoil/loggedHeaderState';
import { useSetRecoilState } from 'recoil';

export default function ProfileMenu() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const logOut = () =>{
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Refresh');
    localStorage.removeItem('authorization');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false)
  }

  return (
    <>
      <button>프로필</button>
      {/* click event로 아래에 modal 띄울 예정 */}
      {/* 모달 - 닉네임 / 마일리지 / 출석 체크 / 마이페이지 / 로그아웃 */}
      <button onClick={logOut}>로그아웃</button>
      {/* 로그아웃 클릭시 setIsLoggedIn(false) ->  isLoggedInState == false => 로그인 버튼으로 변경*/}
    </>
  )
}

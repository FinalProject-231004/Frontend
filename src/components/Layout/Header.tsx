import SigninModal from '../../containers/User/SigninModal'
// import SignUpModal from '../SignUpModal'

function Header() {
  return(
    <>
      <div className="w-[1920px] h-[72px]">
        <div className="w-[1920px] h-[72px] absolute left-[-0.5px] top-[-0.5px] bg-[#f4f4f4]" />
        <p className="absolute left-[610px] top-6 text-xl text-left text-black">
          퀴즈만들기 마일리지샵 라이브 퀴즈
        </p>
        <div className="w-[84.77px] h-9 absolute left-[1414.5px] top-[17.5px] rounded-[18px] border border-[#0078ff]" />
        {/* <SignUpModal/> */}
        <SigninModal />
      </div>
    </>
  )
}

export default Header
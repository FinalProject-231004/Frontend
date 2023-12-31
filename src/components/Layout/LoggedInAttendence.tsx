import { postAPI } from '@/apis/axios';
import { useMobile } from '@/hooks';
import { attendanceState } from '@/recoil/atoms/userInfoAtom';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSetRecoilState } from 'recoil';

type LoggedInAttendenceProps = {
  handleCloseUserMenu: ()=>void;
}

const fontFamily = "'TmoneyRoundWind', sans-serif";

export default function LoggedInAttendence({handleCloseUserMenu}:LoggedInAttendenceProps) {
  const setAttendance = useSetRecoilState(attendanceState);
  const isMobile = useMobile();
  
  const notifySuccess = () => toast.success('잊지 않으셨군요?! 출석 완료!', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const notifyWarning = () => toast.warn('이미 출석 체크 하셨어요!', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  
  const postAttendencs = async () => {
    try {
      const response = await postAPI('/api/mypage/attendance','');
      if(response.status === 202) {
        notifySuccess();
        setAttendance(true);
        return (
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        );
      }
      // console.log(response.data);
    } catch (error) {
      notifyWarning();
      // console.log('error', error);
      return(
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
      )
    }
  }

  return (
    <>
      {!isMobile? (
        <MenuItem sx={{ p: 0 }} onClick={()=>{handleCloseUserMenu(); postAttendencs();}}> 
          <Typography className='border-b-[1.5px] border-black w-[216px] py-[13px] flex justify-start hover:text-blue hover:border-blue ' 
          style={{ fontFamily }} textAlign="center">
            <span className='pl-[3px] text-[18px]'>출석체크</span>
          </Typography>
        </MenuItem>
      ) : (
        <div onClick={()=>{handleCloseUserMenu(); postAttendencs();}}> 
          <Typography className=' border-black flex justify-start hover:text-blue hover:border-blue w-[100px] py-[6px] border-b' 
          style={{ fontFamily }} textAlign="center">
            <span className='pl-[3px] text-[10px]'>출석체크</span>
          </Typography>
        </div>
      )}
      
    </>
    
  )
}

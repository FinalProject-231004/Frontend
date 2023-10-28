import { postAPI } from '@/apis/axios';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type LoggedInAttendenceProps = {
  handleCloseUserMenu: ()=>void;
}

export default function LoggedInAttendence({handleCloseUserMenu}:LoggedInAttendenceProps) {
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
      console.log(response.data);
    } catch (error) {
      notifyWarning();
      console.log('error', error);
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
      <MenuItem onClick={()=>{handleCloseUserMenu(); postAttendencs();}}> 
        <Typography textAlign="center">출석체크</Typography>
      </MenuItem>
    </>
    
  )
}

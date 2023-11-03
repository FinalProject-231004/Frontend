import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import { useSetRecoilState } from 'recoil';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';
import { LoggedInAttendence } from '@/components';
import { getAPI } from '@/apis/axios';
import { profileAPIResponse } from '@/types/header';
import { useEffect, useState } from 'react';
import { logOut } from '@/utils/authHelpers';
import {
  userMileageState,
  userNickNameState,
} from '@/recoil/atoms/userInfoAtom';

const fontFamily = "'TmoneyRoundWind', sans-serif";

export default function LoggedInProfileMenu() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState); // 사용자의 로그인 상태 업데이트
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  ); // 사용자 메뉴를 표시
  const [nickName, setNickName] = useState('');
  const [image, setImage] = useState('');
  const [mileage, setMileage] = useState(0);
  const setUserNickname = useSetRecoilState(userNickNameState);
  const setUserMileage = useSetRecoilState(userMileageState);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await getAPI<profileAPIResponse>(
        '/api/mypage/memberInfo',
      );
      // console.log(response.data.data);
      const getData = response.data.data;
      setNickName(getData.nickname);
      setUserNickname(getData.nickname);
      setUserMileage(getData.mileagePoint);
      setImage(getData.image || '');
      setMileage(getData.mileagePoint);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogOut = () => {
    logOut();
    setIsLoggedIn(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    getUserInfo();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(()=>{
    getUserInfo();
  },[])

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        {/* <Tooltip title="Open settings"> */}
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={nickName} src={image || '/img/bonobono.png'} />
        </IconButton>
        {/* </Tooltip> */}
        <Menu
          sx={{ 
            mt: '45px', 
            '& .MuiPaper-root': {
              boxShadow: '-1px 1px 8px 0 rgba(0, 0, 0, 0.1), 1px 1px 8px 0 rgba(0, 0, 0, 0.1)', 
            },
            '& .MuiMenu-list': { 
              p: 0, 
            },
          }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <div className='w-[264px] h-[300px] bg-lightBlue flex flex-col justify-center items-center'>
            <div className='w-[216px] h-[260px]'>
              <div className='flex justify-start mb-[15px]' onClick={handleCloseUserMenu}>
                <Typography textAlign="center"><span className='pl-[3px] mb-[17px] text-[25px] text-blue hover:' style={{ fontFamily }}>{nickName}</span></Typography>
              </div>
              <div className='p-0' onClick={handleCloseUserMenu}>
                <Typography className='flex justify-between border-b-[1.5px] border-black w-[216px] pb-[13px]' textAlign="center">
                  <span className='pl-[3px] text-[18px]' style={{ fontFamily }}>마일리지</span>
                  <span className='text-[18px]' style={{ fontFamily }}>{mileage} M</span>
                </Typography>
              </div>
              <LoggedInAttendence
                handleCloseUserMenu={() => handleCloseUserMenu()}
              />
              <MenuItem sx={{ p: 0, m:0 }}
                onClick={() => {
                  handleCloseUserMenu();
                  navigate('/mypage');
                }}
              >
                <Typography className='p-0 border-b-[1.5px] border-black w-[216px] py-[13px] flex justify-start hover:text-blue hover:border-blue' style={{ fontFamily }} textAlign="center">
                  <span className='pl-[3px] text-[18px]'>마이페이지</span>
                </Typography>
              </MenuItem>
              <MenuItem sx={{ p: 0, m:0  }} onClick={handleLogOut}>
                <Typography className='border-b-[1.5px] border-black w-[216px] py-[13px] flex justify-start hover:text-blue hover:border-blue' style={{ fontFamily }} textAlign="center">
                  <span className='pl-[3px] text-[18px]'>로그아웃</span>
                </Typography>
              </MenuItem>
            </div>
          </div>
          
        </Menu>
      </Box>
    </>
  );
}

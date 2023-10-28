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
          <Avatar alt={nickName} src={image || 'public/img/bonobono.png'} />
        </IconButton>
        {/* </Tooltip> */}
        <Menu
          sx={{ mt: '45px' }}
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
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{nickName}</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{mileage} point</Typography>
          </MenuItem>
          <LoggedInAttendence
            handleCloseUserMenu={() => handleCloseUserMenu()}
          />
          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
              navigate('/mypage');
            }}
          >
            <Typography textAlign="center">마이페이지</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <Typography textAlign="center">로그아웃</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

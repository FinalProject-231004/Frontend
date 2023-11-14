import { isLoggedInState } from '@/recoil/atoms/loggedHeaderAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';
import { LoggedInAttendence } from '@/components';
import { getAPI } from '@/apis/axios';
import { profileAPIResponse } from '@/types/header';
import { useEffect } from 'react';
import {
  userMileageState,
  userNickNameState,
  userProfileImgState,
} from '@/recoil/atoms/userInfoAtom';
import { useMobile } from '@/hooks';
import axios from 'axios';
import { logOut } from '@/utils/authHelpers';

const fontFamily = "'TmoneyRoundWind', sans-serif";

export default function LoggedInProfileMenu() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const [nickName, setNickName] = useRecoilState(userNickNameState);
  const [mileage, setMileage] = useRecoilState(userMileageState);
  const [image, setImage] = useRecoilState(userProfileImgState);
  const isMobile = useMobile();

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await getAPI<profileAPIResponse>(
        '/api/mypage/memberInfo',
      );
      // console.log(response.data.data);
      const getData = response.data.data;
      setNickName(getData.nickname);
      setImage(getData.image || '');
      setMileage(getData.mileagePoint);
    } catch (error) {
      // console.error('Error:', error);
    }
  };

  const handleLogOut = async () => {
    const accessToken = localStorage.getItem('Authorization');
    const refreshToken = localStorage.getItem('Refresh');
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/member/logout`,{},
        { headers: { 
          Authorization: `Bearer ${accessToken}`, 
          Refresh: `${refreshToken}`,
        }},
      );
      // console.log('로그아웃 성공!!',response);
      logOut();
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      // console.error('error',error);
    }
    logOut();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={nickName} src={image || '/img/bonobono.png'} />
        </IconButton>
        <Menu
          sx={{
            mt: '45px',
            '& .MuiPaper-root': {
              boxShadow:
                '-1px 1px 8px 0 rgba(0, 0, 0, 0.1), 1px 1px 8px 0 rgba(0, 0, 0, 0.1)',
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
          <div className="w-[264px] h-[300px] bg-lightBlue flex flex-col justify-center items-center sm:w-[132px] sm:h-[161px]">
            <div className="">
              <div
                className="flex justify-start mb-[20px] sm:mb-3"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">
                  <span
                    className="pl-[3px] mb-[17px] text-[25px] sm:text-[10px] text-blue hover:"
                    style={{ fontFamily }}
                  >
                    {nickName}
                  </span>
                </Typography>
              </div>
              <div className="p-0" onClick={handleCloseUserMenu}>
                <Typography
                  className="flex justify-between border-b-[1.5px] border-black w-[216px] pb-[13px] sm:pb-1 sm:w-[100px] sm:border-b"
                  textAlign="center"
                >
                  <span
                    className="pl-[3px] text-[18px] sm:text-[10px]"
                    style={{ fontFamily }}
                  >
                    마일리지
                  </span>
                  <span
                    className="text-[18px] sm:text-[10px]"
                    style={{ fontFamily }}
                  >
                    {mileage} M
                  </span>
                </Typography>
              </div>
              <LoggedInAttendence
                handleCloseUserMenu={() => handleCloseUserMenu()}
              />
              {!isMobile ? (
                <>
                  <MenuItem
                    sx={{ p: 0, m: 0 }}
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate('/mypage');
                    }}
                  >
                    <Typography
                      className="p-0 border-b-[1.5px] border-black w-[216px] py-[13px] flex justify-start hover:text-blue hover:border-blue"
                      style={{ fontFamily }}
                      textAlign="center"
                    >
                      <span className="pl-[3px] text-[18px]">마이페이지</span>
                    </Typography>
                  </MenuItem>
                  <MenuItem sx={{ p: 0, m: 0 }} onClick={handleLogOut}>
                    <Typography
                      className="border-b-[1.5px] border-black w-[216px] py-[13px] flex justify-start hover:text-blue hover:border-blue "
                      style={{ fontFamily }}
                      textAlign="center"
                    >
                      <span className="pl-[3px] text-[18px]">로그아웃</span>
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <div
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate('/mypage');
                    }}
                  >
                    <Typography
                      className="p-0 border-black flex justify-start hover:text-blue hover:border-blue w-[100px] py-[6px] border-b"
                      style={{ fontFamily }}
                      textAlign="center"
                    >
                      <span className="pl-[3px] text-[10px]">마이페이지</span>
                    </Typography>
                  </div>
                  <div onClick={handleLogOut}>
                    <Typography
                      className="border-black flex justify-start hover:text-blue hover:border-blue w-[100px] py-[6px] border-b"
                      style={{ fontFamily }}
                      textAlign="center"
                    >
                      <span className="pl-[3px] text-[10px]">로그아웃</span>
                    </Typography>
                  </div>
                </>
              )}
            </div>
          </div>
        </Menu>
      </Box>
    </>
  );
}

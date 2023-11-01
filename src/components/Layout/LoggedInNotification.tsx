import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';
import { getAPI } from '@/apis/axios';
import { Notifications } from '@/types/header';
import { getTime } from '@/utils/dateUtils';
// import Sse from './Sse';

export default function LoggedInNotification() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null); // 사용자 메뉴를 표시
  const [notification, setNotification] = useState<Notifications[]>([]);
  const [haveNotification, setHaveNotification] = useState(false);

  // const navigate = useNavigate();

  const getNotification = async () => {
    try {
      const response = await getAPI('/api/notification');
      const responseData = response.data as Notifications[];
      setNotification(responseData);
      console.log(response);
    } catch (error) {
      console.log('error', error);
    }
  };

  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   getNotification();
  //   if(notification.length == 0) {
  //     setAnchorElUser(null);
  //   } else {
  //     setHaveNotification(true);
  //     setAnchorElUser(event.currentTarget);
  //   }
  // };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    getNotification();
    setAnchorElUser(event.currentTarget);
    if(notification.length == 0) {
      setHaveNotification(false);
    } else {
      setHaveNotification(true);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
        <>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={haveNotification ? 'Check it out' : 'Nothing'}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} size="large" aria-label="show new notifications" color="inherit">
                <Badge badgeContent={notification.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
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
              <div className='w-[448px] h-[324px] py-[23px] px-[10px] bg-[#FAFAFA] border-[1.5px] border-solid rounded-md relative'>
                {haveNotification ? (
                  notification.map((note, index) => {
                    const isFirstItem = index === 0;
                    const timeReceived = getTime(new Date(note.created_at));
                    return (
                      <MenuItem className='w-full' onClick={handleCloseUserMenu}>
                        <Typography className={`flex justify-between border-b-2 w-[416px] pb-[8px] ${isFirstItem ? 'border-navy' : 'border-blue'}`} textAlign="center">
                          <p className={`text-[18px] ${isFirstItem ? 'text-navy' : 'text-blue'}`}>{note.content}</p>
                          <p className={`text-[18px] ${isFirstItem ? 'text-navy' : 'text-blue'}`}>{timeReceived}</p>
                        </Typography>
                      </MenuItem>
                    );
                  })
                ):(
                  <div className='text-[18px] text-deep_dark_gray absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>새로운 소식이 없습니다!</div>
                )}
                
                {/* <Sse /> */}
                
                <button className='border-b border-deep_dark_gray text-[14px] text-deep_dark_gray absolute bottom-[22px] left-[24px]'>전체 읽음</button>
              </div>
            </Menu>
          </Box>          
        </>
  )
}

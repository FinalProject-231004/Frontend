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

type Notification = {
  id: number;
  notificationId: string;
  content: string;
  created_at: string;
}

export default function LoggedInNotification() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null); // 사용자 메뉴를 표시
  const [notification, setNotification] = useState<Notification[]>([]);

  // const navigate = useNavigate();

  // {
  //   "id": 0,
  //   "notificationId": "string",
  //   "receiver": "string",
  //   "content": "string",
  //   "notificationType": "string",
  //   "url": "string",
  //   "readYn": "string",
  //   "deletedYn": "string",
  //   "created_at": "2023-10-20T01:24:07.940Z"
  // }

  const getNotification = async () => {
    try {
      const response = await getAPI('/api/notification');
      const responseData = response.data as Notification[];
      setNotification(responseData);
      console.log(responseData);
    } catch (error) {
      console.log('error', error);
    }
  };
  
  // 시간 구하기
  let result = '';
  notification.map((note) => {
    const now = new Date();
    const postedDate = new Date(note.created_at);

    const differenceInMilliseconds = now.getTime() - postedDate.getTime();

    const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays > 0) {
        result = `${differenceInDays}일 전`;
    } else if (differenceInHours > 0) {
        result = `${differenceInHours % 24}시간 전`;
    } else {
        // 10단위로 반올림
        const roundedMinutes = Math.round(differenceInMinutes / 10) * 10;
        result = `${roundedMinutes}분 전`;
    }
});

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    getNotification();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
        <>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
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
              <div className='w-[px] h-[324px] py-[23px] px-[10px] bg-[#FAFAFA] border-[1.5px] border-solid rounded-md border-black'>
                {notification.map((note, index) => {
                  const isFirstItem = index === 0;
                  return(
                    <MenuItem className='w-full' onClick={handleCloseUserMenu}> 
                      <Typography className={`flex justify-between border-b-2 w-[416px] pb-[8px] ${isFirstItem ? 'border-navy' : 'border-blue'}`} textAlign="center">
                        <p className={`text-[18px] ${isFirstItem ? 'text-navy' : 'text-blue'}`}>{note.content}</p>
                        <p className={`text-[18px] ${isFirstItem ? 'text-navy' : 'text-blue'}`}>{result}</p>
                      </Typography>
                    </MenuItem>
                  )
                })}
              </div>
            </Menu>
          </Box>          
        </>
  )
}

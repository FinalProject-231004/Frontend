import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { Notifications } from '@/types/header';
import { getTime } from '@/utils/dateUtils';
import { useQueryClient } from 'react-query';
import { useGetMessageAlert } from '@/hooks';
import { EventSourcePolyfill } from 'event-source-polyfill';

const Sse = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [newAlert, setNewAlert] = useState<Notifications[]>([]);
  const { data: alertList } = useGetMessageAlert();
  const allList = alertList
  const queryClient = useQueryClient();

  const API_BASE_URL = import.meta.env.VITE_APP_GENERATED_SERVER_URL; 
  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    if (token) {
      const eventSource = new EventSourcePolyfill(`${API_BASE_URL}/api/subscribe`, {
        headers: {
          Authorization: token,
          'Content-Type': 'text/event-stream',
          'Connection': 'keep-alive',
          'Cache-Control': 'no-cache'
        },
        reconnectInterval: 5000, // 5초 후 재연결 시도
        heartbeatTimeout: 3600000, // 1시간 타임아웃 설정
      });
  
      eventSource.onopen = () => {
        // console.log('SSE 연결됨');
        // console.log('allList', allList);
      };
  
      eventSource.addEventListener('sse', event  => {
        const messageEvent = event as MessageEvent;
        const parsedData = JSON.parse(messageEvent.data);
        if (parsedData.content === "send dummy data to client.") {
          // console.log('더미데이터는 무시하겠다.')
          return;
        }
        setNewAlert((prev) => [...prev, parsedData]);
        // console.log('새로운 알림',newAlert);
        // queryClient.invalidateQueries('alertList');
      });
  
      eventSource.onerror = () => {
        // console.error("EventSource failed:", error);
        if (eventSource !== undefined) {
          eventSource.close();
        }
      };
  
      return () => {
        if (!token && eventSource) {
          eventSource.close();
        }
      };
    }
  }, [token, API_BASE_URL]);

  useEffect(() => {
    if (token && allList) { 
      setNewAlert(allList);
      queryClient.invalidateQueries('unreadList');
    }
  }, [allList, token, queryClient]);

  // const messageDelete = async (id) => {
  //   await removeAlert(id);
  //   queryClient.invalidateQueries('alertList');
  // };

  // const messageRead = async (id, url) => {
  //   window.location.href = url;
  //   await readAlert(id);
  //   queryClient.invalidateQueries('alertList');
  // };

  // if (unread === undefined) {
  //   return null;
  // }

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={newAlert?.length === 0 ? 'Noting' : 'Check it out'}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} size="large" aria-label="show new notifications" color="inherit">
            <Badge badgeContent={newAlert.length} color="error"> 
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ 
            mt: '45px', 
            '& .MuiPaper-root': {
              boxShadow: '-1px 1px 8px 0 rgba(0, 0, 0, 0.1), 1px 1px 8px 0 rgba(0, 0, 0, 0.1)', 
              width: '540px', height: '324px', bgcolor:'#FAFAFA'
            },
            '& .MuiMenu-list': { 
              paddingX: '8px', paddingTop:'17px', 
            },
            '& .MuiButtonBase-root': {
              // marginX:'10px', marginTop: '10px',
            }
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
          {/* <div className='w-[500px] h-[324px] py-[23px] px-[10px] bg-[#FAFAFA] border-[1.5px] border-solid rounded-md relative'> */}
            {newAlert?.length === 0 ? (
              <div className='w-full ml-[180px] mt-[120px] text-[18px] text-deep_dark_gray absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>새로운 소식이 없습니다!</div>
            ):(
              <div>
              {[...newAlert].reverse().map((note, index) => {
                const isFirstItem = index === 0;
                const timeReceived = getTime(new Date(note.created_at));
                return (
                  <div key={note.id}>
                    <MenuItem className='w-full' onClick={handleCloseUserMenu}>
                      <Typography className={`mx-[10px] mt-[10px] flex justify-between items-center border-b-2 w-[500px] pb-[8px] ${isFirstItem ? 'border-blue' : 'border-navy'}`} textAlign="center">
                        <span className={`text-[18px] ${isFirstItem ? 'text-blue' : 'text-deep_dark_gray'}`}>{note.content}</span>
                        <span className='flex items-center'>
                          <span className={`text-[18px] mr-[6px] ${isFirstItem ? 'text-blue' : 'text-deep_dark_gray'}`}>{timeReceived}</span>
                          <button className={`text-[24px] ${isFirstItem ? 'text-blue' : 'text-deep_dark_gray'}`}>×</button>
                        </span>
                      </Typography>
                    </MenuItem>
                  </div> 
                );
              })}

              <button className='mt-[14px] mb-[14px] ml-[16px] border-b border-deep_dark_gray text-[14px] text-deep_dark_gray'>전체 읽음</button>
              
              </div>
            )}
          {/* </div> */}

        </Menu>
      </Box>          
    </>
)
};

export default Sse;
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

import { useQuery, useQueryClient } from 'react-query'; // 예시로 react-query 사용
import { useGetMessageAlert, usePutReadAlert, useDeleteAlert } from '@/hooks';
import { EventSourcePolyfill } from 'event-source-polyfill';

const Sse = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [newAlert, setNewAlert] = useState<Notifications[]>([]);
  const { data: alertList } = useGetMessageAlert();
  // const allList: Notification[] | undefined = alertList?.data;
  const allList = alertList
  const queryClient = useQueryClient();

  const API_BASE_URL = import.meta.env.VITE_APP_GENERATED_SERVER_URL; 
  const token = localStorage.getItem('Authorization');


  // 재연결 로직을 별도의 함수로 분리
  const setupEventSource = (token: string, baseUrl: string) => {
    const eventSource = new EventSourcePolyfill(`${baseUrl}/api/subscribe`, {
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
      console.log('SSE 연결됨');
    };

    eventSource.addEventListener('sse', event  => {
      const messageEvent = event as MessageEvent;
      const parsedData = JSON.parse(messageEvent.data);
      setNewAlert((prev) => [...prev, parsedData]);
      console.log('새로운 알림',newAlert);

      queryClient.invalidateQueries('alertList');
    });

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
      setTimeout(() => setupEventSource(token, baseUrl), 5000);
    };

    return eventSource;
  };

  useEffect(() => {
    let eventSource: EventSource | EventSourcePolyfill;
    if (token && API_BASE_URL) {
      eventSource = setupEventSource(token, API_BASE_URL);
    }
  
    // Clean-up function
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [token, API_BASE_URL]);
  


  // useEffect(() => {
  //   if (token) {
  //     const eventSource = new EventSourcePolyfill(`${API_BASE_URL}/api/subscribe`, {
  //       headers: {
  //         Authorization: token,
  //         // 'Accept': 'text/event-stream',
  //         'Content-Type': 'text/event-stream',
  //         'Connection': 'keep-alive',
  //         'Cache-Control': 'no-cache'
  //       }
  //     });
  
  //     eventSource.onopen = () => {
  //       console.log('SSE 연결됨');
  //     };

  //     eventSource.addEventListener('sse', event  => {
  //       const messageEvent = event as MessageEvent;
  //       const parsedData = JSON.parse(messageEvent.data);
  //       setNewAlert((prev) => [...prev, parsedData]);
  //       console.log('새로운 알림',newAlert);

  //       queryClient.invalidateQueries('alertList');
  //     });
  
  //     eventSource.onerror = (error) => {
  //       console.error("EventSource failed:", error);
  //       eventSource.close();
  //       setTimeout(() => setupEventSource(token, API_BASE_URL), 5000); // 5초 후 재연결 시도
  //     };

  //     // 재연결 로직을 별도의 함수로 분리
  //     const setupEventSource = (token, baseUrl) => {
  //       const eventSource = new EventSourcePolyfill("https://api.quizpop.net/api/subscribe");
  //     };
  
  //     return () => {
  //       eventSource.close();
  //     };
  //   }
  // }, [token, API_BASE_URL]);

  useEffect(() => {
    if (token && allList) { 
      setNewAlert(allList);
      queryClient.invalidateQueries('unreadList');
    }
    // 나머지 코드...
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

  const handleOpenUserMenu = (e) => {
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
            <Badge  color="error"> {/* badgeContent={newAlert.length} */}
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
          <div className='w-[500px] h-[324px] py-[23px] px-[10px] bg-[#FAFAFA] border-[1.5px] border-solid rounded-md relative'>
            {newAlert?.length === 0 ? (
              <div className='text-[18px] text-deep_dark_gray absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>새로운 소식이 없습니다!</div>
            ):(
              [...newAlert].reverse().map((note, index) => {
                const isFirstItem = index === 0;
                const timeReceived = getTime(new Date(note.created_at));
                return (
                  <div key={note.id}>
                    <MenuItem className='w-full' onClick={handleCloseUserMenu}>
                      <Typography className={`flex justify-between border-b-2 w-[416px] pb-[8px] ${isFirstItem ? 'border-navy' : 'border-blue'}`} textAlign="center">
                        <span className={`text-[18px] ${isFirstItem ? 'text-blue' : 'text-deep_dark_gray'}`}>{note.content}</span>
                        <span className={`text-[18px] ${isFirstItem ? 'text-blue' : 'text-deep_dark_gray'}`}>{timeReceived}</span>
                      </Typography>
                    </MenuItem>

                    <button className='border-b border-deep_dark_gray text-[14px] text-deep_dark_gray absolute bottom-[22px] left-[24px]'>전체 읽음</button>
                  </div> 
                );
              })
            )}
          </div>
        </Menu>
      </Box>          
    </>
)
};

export default Sse;
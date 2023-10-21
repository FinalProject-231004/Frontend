import { isLoggedInState } from '@/recoil/loggedHeaderState';
import { useSetRecoilState } from 'recoil';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';

export default function LoggedInProfileMenu() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState); // 사용자의 로그인 상태 업데이트
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null); // 사용자 메뉴를 표시
  const navigate = useNavigate();

  const logOut = () =>{
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Refresh');
    localStorage.removeItem('authorization');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      <>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
                <Typography textAlign="center">토끼뜀</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}> 
                <Typography textAlign="center">300 point</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}> 
                <Typography textAlign="center">출석체크</Typography>
              </MenuItem>
              <MenuItem onClick={() => {handleCloseUserMenu(); }}> {/* navigate('/mypage'); */}
                <Typography textAlign="center">마이페이지</Typography>
              </MenuItem>
              <MenuItem onClick={logOut}> 
                <Typography textAlign="center">로그아웃</Typography>
              </MenuItem>
            </Menu>
          </Box>
      </>
  )
}


// const pages = ['Products', 'Pricing', 'Blog'];


// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
  

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

  

//   return (
    // <AppBar position="static">
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          
    //       <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
    //       <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    //         {pages.map((page) => (
    //           <Button
    //             key={page}
    //             onClick={handleCloseNavMenu}
    //             sx={{ my: 2, color: 'white', display: 'block' }}
    //           >
    //             {page}
    //           </Button>
    //         ))}
    //       </Box>

          
    //     </Toolbar>
    //   </Container>
    // </AppBar>
//   );
// }
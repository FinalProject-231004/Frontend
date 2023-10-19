import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function LoggedInNotification() {
  return (
    <IconButton size="large" aria-label="show new notifications" color="inherit">
      <Badge badgeContent={4} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  )
}

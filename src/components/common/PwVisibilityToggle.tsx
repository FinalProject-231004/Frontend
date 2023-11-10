import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { useMobile } from '@/hooks';

type PwVisibilityToggleProps = {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const PwVisibilityToggle: React.FC<PwVisibilityToggleProps> = ({ showPassword, setShowPassword }) => {
  const isMobile = useMobile();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <InputAdornment position="end" className='absolute right-5 z-10 sm:right-3'>
      <IconButton 
        size={isMobile? 'small' : 'medium'} 
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {showPassword ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit"/>}
      </IconButton>
    </InputAdornment>
  );
};

export default PwVisibilityToggle;

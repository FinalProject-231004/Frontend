import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

type PwVisibilityToggleProps = {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const PwVisibilityToggle: React.FC<PwVisibilityToggleProps> = ({ showPassword, setShowPassword }) => {

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <InputAdornment position="end" className='w-[40px] h-[40px] absolute right-[20px] z-10 '>
      <IconButton className='h-[15px] padding-[10px]'
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};

export default PwVisibilityToggle;

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useMobile } from '@/hooks';

type ButtonsProps = {
  size: string;
  fontcolor: string;
  fontSize: string;
  BtnName: string | JSX.Element;
  btnbg: string;
  btnhoverbg: string;
  btnactivebg: string;
  borderradius: string;
  type?: 'button' | 'submit';
  onClick: () => void;
};

export default function CustomizedButtons({
  size,
  fontcolor,
  fontSize,
  BtnName,
  btnbg,
  btnhoverbg,
  btnactivebg,
  borderradius,
  onClick,
  type = 'button',
}: ButtonsProps) {
  const fontFamily = "'TmoneyRoundWind', sans-serif";
  const isMobile = useMobile(); 

  let width: string = ''; // 초기화 -> 변수가 할당되기 전에 사용되었다는 오류 막음
  let height: string = '';

  // 아직 디자인이 확정되지 않아 필요에 따라 수정하기
  if (size === 'small') {
    width = '98px';
    height = '60px';
  } else if (size === 'medium') {
    width = '150px';
    height = '40px';
  } else if (size === 'large') {
    width = `${isMobile ?'183px':'530px'}`;
    height = '57px';
  } else if (size === 'pull') {
    width = '1080px';
    height = '40px';
  } else if (size === 'signUp') {
    width = '146px';
    height = '57px';
  } else if (size === 'mileage') {
    width = `${isMobile ?'124.5px':'249px'}`;
    height = '57px';
  }

  return (
    <Stack spacing={2} direction="row">
      <ColorButton
        style={{ fontFamily }}
        type={type}
        width={width}
        height={isMobile? '28px':height}
        fontcolor={fontcolor}
        fontSize={isMobile? '12px':fontSize}
        btnbg={btnbg}
        borderradius={borderradius}
        btnhoverbg={btnhoverbg}
        btnactivebg={btnactivebg}
        onClick={onClick}
        variant="contained"
      >
        {BtnName}
      </ColorButton>
    </Stack>
  );
}

const ColorButton = styled(Button)<{
  width: string;
  height: string;
  fontcolor: string;
  fontSize: string;
  btnbg: string;
  borderradius: string;
  btnhoverbg: string;
  btnactivebg: string;
}>(props => ({
  height: props.height,
  width: props.width,
  color: props.fontcolor,
  backgroundColor: props.btnbg,
  borderRadius: props.borderradius,
  fontSize: props.fontSize,
  boxShadow: 'none',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: props.btnhoverbg,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: props.btnactivebg,
  },
}));

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type ButtonsProps = {
  size: string;
  fontColor: string;
  fontSize: string;
  BtnName: string | JSX.Element;
  BtnBg: string;
  BtnHoverBg: string;
  BtnActiveBg: string;
  borderRadius: string;
  onClick: () => void;
};

export default function CustomizedButtons({
  size,
  fontColor,
  fontSize,
  BtnName,
  BtnBg,
  BtnHoverBg,
  BtnActiveBg,
  borderRadius,
  onClick,
}: ButtonsProps) {
  let width: string = ''; // 초기화 -> 변수가 할당되기 전에 사용되었다는 오류 막음
  let height: string= '';

  // 아직 디자인이 확정되지 않아 필요에 따라 수정하기
  if (size === 'small') {
    width = '146px';
    height = '57px';
  } else if (size === 'medium') {
    width = '150px';
    height = '40px';
  } else if (size === 'large') {
    width = '530px';
    height = '57px';
  } else if (size === 'pull') {
    width = '1080px';
    height = '40px';
  }

  return (
    <Stack spacing={2} direction="row">
      <ColorButton
        width={width}
        height={height}
        fontColor={fontColor}
        fontSize={fontSize}
        BtnBg={BtnBg}
        borderRadius={borderRadius}
        BtnHoverBg={BtnHoverBg}
        BtnActiveBg={BtnActiveBg}
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
  fontColor: string;
  fontSize: string;
  BtnBg: string;
  borderRadius: string;
  BtnHoverBg: string;
  BtnActiveBg: string;
}>((props) => ({
  height: props.height,
  width: props.width,
  color: props.fontColor,
  backgroundColor: props.BtnBg,
  borderRadius: props.borderRadius,
  fontSize: props.fontSize,
  boxShadow: 'none',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: props.BtnHoverBg,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: props.BtnActiveBg,
  },
}));


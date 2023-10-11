import { Box} from '@chakra-ui/react'

type ButtonProps = {
  size: string
  BtnName: string
  BtnBg: string
  BtnHoverBg: string
  BtnActiveBg: string
  onClick: ()=>void
}

function Button({size, BtnName, BtnBg, BtnHoverBg, BtnActiveBg, onClick}: ButtonProps) {
  let width;
  let height;

  // 다른 요소에 맞춰서 사이즈 정하기
  if (size === 'small') {
    width = '100px'; 
    height = '40px'; 
  } else if (size === 'medium') {
    width = '150px'; 
    height = '40px'; 
  } else if (size === 'large') {
    width = '200px'; 
    height = '40px'; 
  }

  return (
    <Box
      as='button'
      height={height} 
      width={width} 
      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
      border='1px' // 고정
      px='8px' // 어떤 용도인지 잘 모르겠음
      borderRadius='10px' // 고정
      fontSize='14px' // 아직 안 정함
      bg={BtnBg}
      borderColor='transparent' // 고정
      _hover={{ bg: BtnHoverBg }} 
      _active={{
        bg: BtnActiveBg,
        transform: 'scale(0.98)', // 고정
      }}
      // lineHeight='1.2'
      // fontWeight='semibold'
      // color='#4b4f56'
      onClick={onClick}
    >
      {BtnName}
    </Box>
  )
}

export default Button
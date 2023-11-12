import { useMobile } from '@/hooks';
import { historyListProps } from '@/types/myPage';

export default function HistoryList({price, cost, itemName, quantity, email, date}:historyListProps) {
  const isMobile = useMobile(); 
  const defaultStyle = {
    minWidth: `${!isMobile?'100px':'auto'}`,
  };

  const getDisplayEmail = (email: string) => {
    if (isMobile && email.length > 2) {
      return email.substring(0, 2) + '**';
    }
    return email;
  };

  return (
    <div className='w-[988px] h-[70px] py-[23px] px-5 border-b border-blue flex justify-between items-center 
    sm:w-full sm::px:[10px] sm:h-auto sm:px-2 sm:py-[12px]
    '>
      {price === 'reward' ? (
        <p className='text-[22px] text-blue sm:text-xs sm:w-[42px]' style={defaultStyle}>+{cost}M</p>
      ) 
      : (
        <p className='w-[102px] text-[22px] text-[#FF3D00] sm:text-xs sm:w-[58px]' style={defaultStyle}>{cost}M</p>
      )}
      
      <p className='text-[22px] truncate w-[280px] text-blue sm:text-xs sm:w-[97px]' title={itemName}>{itemName || '데이터 없음'}</p>
      <p className='text-[22px] text-blue sm:text-xs' style={defaultStyle}>{quantity || ''}</p>
      <p className='text-[22px] text-[#D9D9D9] sm:text-xs sm:truncate' style={defaultStyle}>{getDisplayEmail(email) || ''}</p>
      <p className='text-[22px] text-[#D3D3D3] sm:text-xs' style={defaultStyle}>{date || ''}</p>
    </div>
  )
}

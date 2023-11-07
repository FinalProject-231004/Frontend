import { historyListProps } from '@/types/myPage';

export default function HistoryList({price, cost, itemName, quantity, email, date}:historyListProps) {
  const defaultStyle = {
    minWidth: "100px"
  };

  return (
    <div className='w-[988px] h-[70px] py-[23px] pl-[25px] pr-[14px] border-b border-blue flex justify-between items-center'>
      {price === 'reward' ? (
        <p className='text-[22px] text-blue ' style={defaultStyle}>+{cost}M</p>
      ) 
      : (
        <p className='w-[102px] text-[22px] text-[#FF3D00]' style={defaultStyle}>{cost}M</p>
      )}
      
      <p className='text-[22px] truncate w-[280px] text-blue' title={itemName}>{itemName || '데이터 없음'}</p>
      <p className='text-[22px] text-blue' style={defaultStyle}>{quantity || ''}</p>
      <p className='text-[22px] text-[#D9D9D9]' style={defaultStyle}>{email || ''}</p>
      <p className='text-[22px] text-[#D3D3D3]' style={defaultStyle}>{date || ''}</p>
    </div>
  )
}

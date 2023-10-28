import { historyListProps } from '@/types/myPage';

export default function HistoryList({price, cost, itemName, quantity, email, date}:historyListProps) {
  const defaultStyle = {
    minWidth: "100px"
  };

  return (
    <div className='w-[998px] h-[70px] py-[23px] pl-[25px] pr-[14px] border-b border-blue flex justify-around items-center'>
      {price === 'reward' ? (
        <p className='text-[22px] text-blue ' style={defaultStyle}>+{cost}M</p>
      ) 
      : (
        <p className='text-[22px] text-[#FF3D00]' style={defaultStyle}>-{cost}원</p>
      )}
      
      <p className='text-[22px] text-blue' style={defaultStyle}>{itemName || '데이터 없음'}</p>
      <p className='text-[22px] text-blue' style={defaultStyle}>{quantity || ''}</p>
      <p className='text-[22px] text-[#D9D9D9]' style={defaultStyle}>{email || ''}</p>
      <p className='text-[22px] text-[#D3D3D3]' style={defaultStyle}>{date || ''}</p>
    </div>
  )
}

// import { historyListProps } from '@/types/myPage';

// export default function HistoryList({price, cost, itemName, quantity, email, date}: historyListProps) {
  
//   // 스타일 정의
//   const baseStyle: React.CSSProperties = {
//     minWidth: "13px",
//     maxWidth: "278px",
//   };
//   const priceStyle = {
//     ...baseStyle,
//     color: price === 'reward' ? '#0078FF' : '#FF3D00',
//     fontSize: '22px'
//   };
//   const textStyle = {
//     ...baseStyle,
//     color: '#0078FF',
//     fontSize: '22px',
//   };
//   const dateStyle = {
//     ...baseStyle,
//     color: '#D3D3D3',
//     fontSize: '22px'
//   };

//   return (
//     <div className='w-[998px] h-[70px] py-[23px] pl-[25px] pr-[14px] border-b border-blue flex justify-between items-center'>
//       <p style={priceStyle}>
//         {price === 'reward' ? `+${cost}M` : `-${cost}원`}
//       </p>
      
//       <p style={textStyle}>{itemName || '데이터 없음'}</p>
//       <p style={textStyle}>{quantity || ''}</p>
//       <p style={textStyle}>{email || ''}</p>
//       <p style={dateStyle}>{date || ''}</p>
//     </div>
//   );
// }

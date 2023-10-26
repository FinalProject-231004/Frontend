import { historyListProps } from '@/types/myPage';

export default function HistoryList({cost, title, count, email, date}:historyListProps) {
  return (
    <div className='w-[998px] h-[70px] py-[23px] pl-[25px] pr-[14px] border-b border-blue flex justify-around items-center'>
      <p className='text-[22px] text-[#FF3D00]'>{cost}</p>
      <p className='text-[22px] text-blue'>{title}</p>
      <p className='text-[22px] text-blue'>{count}</p>
      <p className='text-[22px] text-[#D9D9D9]'>{email}</p>
      <p className='text-[22px] text-[#D3D3D3]'>{date}</p>
    </div>
  )
}

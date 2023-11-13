import { gifticonListProps } from '@/types/mileageShop'
import { OrderModal } from '..'
import { useModalState } from '@/hooks';


export default function GifticonList({image, itemName, price, itemId}:gifticonListProps) {
  const orderModal = useModalState();
  const formattedPrice = price.toLocaleString('ko-KR');
  
  return (
    <>
      <div className='cursor-pointer' onClick={orderModal.open}>
        <div className='w-[347px] h-[436px] pb-[20px] flex justify-center items-center sm:w-full sm:h-[209px] sm:pb-[10px]'>
          <img src={image} alt={itemName} />
        </div>
        <div>
          <p className='text-[18px] pb-[6px] sm:text-[10px] sm:bp-[3px]'>{itemName}</p>
          <p className='text-[24px] text-blue sm:text-xs'>{formattedPrice} M</p>
        </div>
      </div>
      <OrderModal itemId={itemId} itemName={itemName} price={price} isOpen={orderModal.isOpen} close={orderModal.close} />
    </>
  )
}

import { gifticonListProps } from '@/types/mileageShop'
import { OrderModal } from '..'
import { useModalState } from '@/hooks';


export default function GifticonList({image, itemName, price, itemId}:gifticonListProps) {
  const orderModal = useModalState();
  
  return (
    <>
      <div className='mt-[20px] cursor-pointer' onClick={orderModal.open}>
        <div className='w-[347px] h-[436px] mb-[20px] flex justify-center items-center'>
          <img src={image} alt={itemName} />
        </div>
        <div>
          <p className='text-[18px] mb-[6px]'>{itemName}</p>
          <p className='text-[24px] text-blue'>{price}M</p>
        </div>
      </div>
      <OrderModal itemId={itemId} itemName={itemName} price={price} isOpen={orderModal.isOpen} close={orderModal.close} />
    </>
  )
}

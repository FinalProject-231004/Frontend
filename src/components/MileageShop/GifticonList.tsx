import { gifticonList } from '@/types/mileageShop'

export default function GifticonList({image, itemName, price}:gifticonList) {
  return (
    <div className='mt-[500ppx] ml-[500px]'>
    <div className='w-[347px] h-[436px] mb-[20px]'>
      <img src={image} alt={itemName} />
    </div>
    <div>
      <p className='text-[18px] mb-[6px]'>{itemName}</p>
      <p className='text-[24px] text-blue'>{price}</p>
    </div>
    </div>
  )
}

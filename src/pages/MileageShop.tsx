import { GifticonList } from '@/components';

export default function MileageShop() {
  return (
    <div className="min-w-[1920px] min-h-[1080px] mx-auto">
      <div className="w-[1080px] mx-auto mt-[148px]">
        <div className='text-[32px] text-blue'>마일리지샵</div>
        <div>내 마일리지: 300M</div>
        <div>
          <ul className='w-[1080px] h-[87px] bg-lightBlue'>
            <li></li>
          </ul>
        </div>
        <GifticonList image={''} itemName={''} price={0}/>
      </div>
    </div>
  )
}

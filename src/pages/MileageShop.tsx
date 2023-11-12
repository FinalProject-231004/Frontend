import { getAPI } from '@/apis/axios';
import { GifticonList } from '@/components';
import { MileageCategories } from '@/constants/mileageCategories';
import { userMileageState } from '@/recoil/atoms/userInfoAtom';
import { gifticonList } from '@/types/mileageShop';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const MileageShop: React.FC = () => {
  const [gifiticons, setGifiticons] = useState<gifticonList['data']>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryItems, setCategoryItems] = useState<gifticonList['data']>([]);
  const mileage = useRecoilValue(userMileageState);

  const getAllGifticonList = async () => {
    try {
      const response = await getAPI('/api/mileageshop/items');
      // console.log('전체 깁티 목록',response.data);
      const gifticonData = response.data as gifticonList;
      setGifiticons(gifticonData.data);
    } catch (error) {
      // console.error(error);
    }
  };

  const fetchCategories = async (category: string) => {
    try {
      const response = await getAPI(`/api/mileageshop/categories/${category}`);
      // console.log('깁티 카테고리',response);
      const gifticonData = response.data as gifticonList;
      setCategoryItems(gifticonData.data);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    getAllGifticonList();
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="w-[1080px] mx-auto mt-[148px] flex flex-col items-center sm:w-[100vw]">
        <div className="mb-[101px] text-[32px] text-blue font-extrabold">마일리지샵</div>
        <div className="w-full">
          <div className="text-[26px] sm:text-xs">
            내 마일리지: <span className="text-blue">{mileage}M</span>
          </div>
          <div className="h-[87px] grid grid-cols-6 gap-x-5 py-4 pl-[65px] my-5 justify-items-start rounded-md bg-[#F1F8FF] text-lg font-extrabold
            sm:grid-cols-3 sm:gap-1 sm:px-2 sm:mb-10 sm:text-[10px] sm:pl-[32.5px]
          ">
            {MileageCategories.map(category => (
              <div
                key={category.category}
                className="flex justify-center items-center gap-2 sm:gap-1"
              >
                <img
                  src={category.icon}
                  className="w-[27px] sm:w-[13.5px]"
                  alt={`profile`}
                />
                <button
                  className={
                    selectedCategory === category.category ? 'text-blue' : ''
                  }
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.category);
                    fetchCategories(category.category);
                  }}
                >
                  {category.displayName}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="gap-5 grid grid-cols-3 sm:grid-cols-2 sm:gap-2">
          {selectedCategory === null
            ? gifiticons.map(item => (
                <GifticonList
                  key={item.id}
                  image={item.image}
                  itemName={item.itemName}
                  price={item.price}
                  itemId={item.id}
                />
              ))
            : categoryItems.map(item => (
                <GifticonList
                  key={item.id}
                  image={item.image}
                  itemName={item.itemName}
                  price={item.price}
                  itemId={item.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default MileageShop;

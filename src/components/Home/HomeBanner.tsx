import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HomeBanner: React.FC<{
  selectAnimalCategory: () => void;
  selectFoodCategory: () => void;
  selectPersonCategory: () => void;
}> = ({ selectAnimalCategory, selectFoodCategory, selectPersonCategory }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[1080px] h-[285px] mt-[102px] flex justify-center items-center">
      <div className="w-full h-full">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
            <div className="relative">
              <button
                className="w-[266px] h-[57px] rounded-[50px] absolute left-[62px] bottom-[40px] shadow-sm shadow-green-600"
                onClick={() => {
                  navigate('/quiz/categories?selected=ANIMAL');
                  selectAnimalCategory();
                }}
              >
                <img src="/BannerBtn01.png" alt="BannerBtn" />
              </button>
              <img src="/Banner01.png" alt="Banner" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
            <img src="/Banner06.png" alt="Banner" />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
            <button
              className="w-[266px] h-[57px] rounded-[50px] absolute left-[62px] bottom-[40px] shadow-sm shadow-yellow-500"
              onClick={() => {
                navigate('/quiz/categories?selected=FOOD');
                selectFoodCategory();
              }}
            >
              <img src="/BannerBtn02.png" alt="BannerBtn" />
            </button>
            <img src="/Banner02.png" alt="Banner" />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
            <img src="/Banner03.png" alt="Banner" />
            <button
              className="w-[299px] h-[57px] rounded-[50px] absolute left-[62px] bottom-[40px] shadow-sm shadow-purple-900"
              onClick={() => {
                navigate('/quiz/categories');
              }}
            >
              <img src="/BannerBtn03.png" alt="BannerBtn" />
            </button>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
            <img src="/Banner05.png" alt="Banner" />
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
            <img src="/Banner04.png" alt="Banner" />
            <button
              className="w-[266px] h-[57px] rounded-[50px] absolute left-[62px] bottom-[40px] shadow-sm shadow-orange-500"
              onClick={() => {
                navigate('/quiz/categories?selected=PERSON');
                selectPersonCategory();
              }}
            >
              <img src="/BannerBtn04.png" alt="BannerBtn" />
            </button>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner: React.FC = () => (
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
          <img src="/Banner01.png" alt="Banner" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
          <img src="/Banner02.png" alt="Banner" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
          <img src="/Banner03.png" alt="Banner" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
          <img src="/Banner04.png" alt="Banner" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
          <img src="/Banner05.png" alt="Banner" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-white text-2xl">
          <img src="/Banner06.png" alt="Banner" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
);

export default Banner;

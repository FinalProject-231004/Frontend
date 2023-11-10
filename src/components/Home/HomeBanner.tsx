import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { BannerButtonProps } from '@/types/homeQuiz';
import { useWindowSize } from '@/hooks';

const banners = [
  {
    image: '/Banner01.png',
    smImage: '/smBanner01.png',
    buttonImage: '/BannerBtn01.png',
    category: 'ANIMAL',
  },
  {
    image: '/Banner06.png',
    smImage: '/smBanner06.png',
  },
  {
    image: '/Banner02.png',
    smImage: '/smBanner02.png',
    buttonImage: '/BannerBtn02.png',
    category: 'FOOD',
  },
  {
    image: '/Banner03.png',
    smImage: '/smBanner03.png',
    buttonImage: '/BannerBtn03.png',
    category: 'MOVIE_TV',
  },
  {
    image: '/Banner05.png',
    smImage: '/smBanner05.png',
  },
  {
    image: '/Banner04.png',
    smImage: '/smBanner04.png',
    buttonImage: '/BannerBtn04.png',
    category: 'PERSON',
  },
];

const BannerButton = ({ image, category, navigate }: BannerButtonProps) => {
  const defalutSize =
    'w-[266px] h-[57px] md:w-[200px] md:h-[30px] sm:w-[117px] sm:h-[25px]';
  const additionalStyle =
    category === 'MOVIE_TV'
      ? `shadow-purple-800 w-[299px] h-[57px] md:w-[200px] md:h-[30px] sm:w-[133px] sm:h-[25px]`
      : category === 'ANIMAL'
      ? `${defalutSize} shadow-green-600`
      : category === 'FOOD'
      ? `${defalutSize} shadow-yellow-500`
      : `${defalutSize} shadow-orange-00`;

  return (
    <button
      className={`${additionalStyle} rounded-[50px] absolute left-[62px] bottom-[40px] shadow-sm md:left-12 md:bottom-12 sm:left-[34px] sm:bottom-[30px]`}
      onClick={() => category && navigate(`/quiz/categories/${category}`)}
    >
      <img src={image} alt="BannerBtn" />
    </button>
  );
};

const HomeBanner = () => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  // 화면 크기에 따라 이미지 선택
  const getBannerImage = (smImage: string, image: string) => {
    return windowSize <= 393 ? smImage : image;
  };

  return (
    <div className="w-[1080px] h-[285px] mt-[102px] md:w-[100vw] md:h-[220px] sm:mt-[246px] sm:w-[100vw] sm:h-[142px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map(({ image, smImage, buttonImage, category }, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center bg-white text-2xl"
          >
            <img src={getBannerImage(smImage, image)} alt="Banner" />
            {buttonImage && (
              <BannerButton
                image={buttonImage}
                category={category}
                navigate={navigate}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;

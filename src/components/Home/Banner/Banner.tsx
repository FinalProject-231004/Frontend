import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { BannerButtonProps } from '@/types/homeQuiz';
import { useWindowSize } from '@/hooks';
import { categories } from '@/constants/categories';

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
    buttonImage: '/BannerBtn06.png',
    category: 'QUIZ_GUIDE',
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
    buttonImage: '/BannerBtn05.png',
    category: 'LIVE_QUIZ',
  },
  {
    image: '/Banner04.png',
    smImage: '/smBanner04.png',
    buttonImage: '/BannerBtn04.png',
    category: 'PERSON',
  },
];

const BannerButton = ({ image, category, navigate }: BannerButtonProps) => {
  const displayName =
    categories.find(c => c.category === category)?.displayName || '';

  const defaultStyle =
    'rounded-[50px] absolute bottom-[40px] shadow-sm md:bottom-12 sm:bottom-[30px]';

  // 버튼 사이즈
  const sizeStyle =
    category === 'MOVIE_TV' || category === 'LIVE_QUIZ'
      ? 'w-[299px] h-[57px] md:w-[200px] md:h-[38px] sm:w-[117px] sm:h-[22px]'
      : 'w-[266px] h-[57px] md:w-[200px] md:h-[42px] sm:w-[117px] sm:h-[25px]';

  // 카테고리에 따른 추가 스타일
  const additionalStyle =
    category === 'MOVIE_TV'
      ? 'shadow-purple-800'
      : category === 'ANIMAL'
      ? 'shadow-green-600'
      : category === 'FOOD'
      ? 'shadow-yellow-500'
      : category === 'PERSON'
      ? 'shadow-orange-600'
      : category === 'QUIZ_GUIDE'
      ? 'shadow-orange-200'
      : 'shadow-slate-200';

  // 위치 스타일
  const positionStyle =
    category === 'QUIZ_GUIDE'
      ? 'right-[64px] bottom-[65px] md:right-[50px] md:bottom-[50px] sm:right-[30px] sm:bottom-8'
      : 'left-[62px] md:left-12 md:bottom-[35px] sm:left-[34px]';

  // 최종 스타일 클래스 결합
  const finalStyle = `${sizeStyle} ${additionalStyle} ${defaultStyle} ${positionStyle}`;

  const handleClick = () => {
    if (category === 'LIVE_QUIZ') {
      navigate('/live-quiz');
    } else if (category === 'QUIZ_GUIDE') {
      navigate('/tutorial-quizpop');
    } else {
      navigate(`/quiz/search/${displayName}`);
    }
  };

  return (
    <button className={finalStyle} onClick={handleClick}>
      <img src={image} alt="BannerBtn" />
    </button>
  );
};

const Banner = () => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  // 화면 크기에 따라 이미지 선택
  const getBannerImage = (smImage: string, image: string) => {
    return windowSize <= 393 ? smImage : image;
  };

  return (
    <div className="w-full mt-[102px] md:w-[100vw] sm:w-[100vw] h-[285px] md:h-[220px] md:mt-[100px] sm:mt-[246px] sm:h-[142px]">
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
          <SwiperSlide key={index}>
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

export default Banner;

import { useEffect, useRef } from 'react';

interface CategoryButtonProps {
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}
const CategoryButton: React.FC<CategoryButtonProps> = ({
  selectedCategory,
  onCategoryClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += event.deltaY;
      }
    };

    const currentContainer = scrollContainerRef.current;
    currentContainer?.addEventListener('wheel', handleWheel);

    return () => {
      currentContainer?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const categories = [
    '영화/TV/만화',
    '게임',
    'IQ테스트',
    '인물',
    '상식',
    '음식',
    '스포츠',
    '동물',
    '기타',
  ];

  return (
    <div className="mb-[30px]">
      <h3 className="mb-[20px]">
        나의 퀴즈 카테고리는:{' '}
        <span className="font-extrabold underline">{selectedCategory}</span>
      </h3>

      <div
        className="flex overflow-x-auto gap-4 mb-[30px] scrollbar-thumb-blue scrollbar-track-gray-100 scrollbar-thin"
        ref={scrollContainerRef}
      >
        {categories.map((item, index) => (
          <div
            key={index}
            className="w-[147px] h-[72px] my-5 border-2 text-xl flex-shrink-0 flex justify-center items-center border-blue rounded-lg cursor-pointer"
            onClick={() => onCategoryClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryButton;

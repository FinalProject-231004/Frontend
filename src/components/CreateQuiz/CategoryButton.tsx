import { useEffect, useRef } from 'react';
import { categories } from '@/constants/categories';

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
    const currentContainer = scrollContainerRef.current;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      currentContainer!.scrollLeft += event.deltaY;
    };

    currentContainer?.addEventListener('wheel', handleWheel);

    return () => {
      currentContainer?.removeEventListener('wheel', handleWheel);
    };
  }, [scrollContainerRef.current]);

  return (
    <div className="mb-[30px]">
      <h3>
        나의 퀴즈 카테고리는:{' '}
        <span className="font-extrabold underline">
          {categories.find(cat => cat.category === selectedCategory)
            ?.displayName || ''}
        </span>
      </h3>
      <div
        className="flex overflow-x-auto gap-4 mb-[30px] scrollbar-thumb-blue scrollbar-track-gray-100 scrollbar-thin"
        ref={scrollContainerRef}
      >
        {categories.map(category => (
          <div
            key={category.category}
            className="w-[147px] h-[72px] my-5 border-2 text-xl flex-shrink-0 flex justify-center items-center border-blue rounded-lg cursor-pointer transition-all hover:bg-blue hover:text-white shadow-md shadow-slate-200 hover:shadow-inner hover:shadow-slate-300"
            onClick={() => onCategoryClick(category.category)}
          >
            {category.displayName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryButton;

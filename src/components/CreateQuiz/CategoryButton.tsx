import { useRef } from 'react';
import { categories } from '@/constants/categories';
import { useHorizontalScroll } from '@/hooks';

interface CategoryButtonProps {
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}
const CategoryButton: React.FC<CategoryButtonProps> = ({
  selectedCategory,
  onCategoryClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollContainerRef);

  return (
    <div className="w-full mb-6 mx-auto">
      <h3 className="font-extrabold">
        나의 퀴즈 카테고리는:{' '}
        <span className="font-extrabold underline">
          {categories.find(cat => cat.category === selectedCategory)
            ?.displayName || ''}
        </span>
      </h3>
      <div
        className="flex overflow-x-auto mb-6 gap-4 scrollbar-thumb-blue scrollbar-track-gray-100 scrollbar-thin"
        ref={scrollContainerRef}
      >
        {categories.map(category => (
          <div
            key={category.category}
            className={`w-[94px] h-[46px] text-base my-5 border-2 flex-shrink-0 flex justify-center items-center rounded-2xl cursor-pointer transition-all shadow-sm shadow-slate-200 ${
              selectedCategory === category.category
                ? 'bg-blue text-white shadow-inner'
                : 'border-gray  text-gray-300 hover:bg-blue hover:border-blue hover:text-white hover:shadow-inner hover:shadow-slate-300'
            }`}
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

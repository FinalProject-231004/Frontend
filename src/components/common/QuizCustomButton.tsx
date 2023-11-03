import React from 'react';

type QuizCustomButtonProps = {
  theme: 'blue' | 'white' | 'dark';
  onClick?: () => void;
  children?: React.ReactNode;
};

const QuizCustomButton: React.FC<QuizCustomButtonProps> = ({
  theme,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[110px] h-[60px] rounded-md border-2 text-xl shadow-md shadow-slate-200 ${
        theme === 'blue'
          ? 'bg-blue text-white'
          : theme === 'dark'
          ? 'bg-[#464646] border-[#464646] text-white'
          : 'bg-white border-blue text-blue'
      }`}
    >
      {children}
    </button>
  );
};

export default QuizCustomButton;

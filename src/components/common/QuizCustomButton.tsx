import React from 'react';

type QuizCustomButtonProps = {
  theme: 'blue' | 'white';
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
      className={`w-[130px] h-[72px] rounded-md border-2 text-2xl shadow-md shadow-slate-200 ${
        theme === 'blue'
          ? 'bg-blue border-blue text-white'
          : 'bg-white border-blue text-blue'
      }`}
    >
      {children}
    </button>
  );
};

export default QuizCustomButton;

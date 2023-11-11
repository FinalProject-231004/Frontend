import React from 'react';

type BottomLongButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
};
const BottomLongButton: React.FC<BottomLongButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      className="w-[100vw] h-[70px] fixed bottom-0 bg-blue text-2xl md:text-xl font-extrabold text-white sm:text-lg sm:h-[60px]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default React.memo(BottomLongButton);

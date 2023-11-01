import React from 'react';

type BottomLongButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};
const BottomLongButton: React.FC<BottomLongButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      className="w-screen h-[70px] fixed bottom-0 bg-blue font-extrabold text-2xl text-white py-3"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default React.memo(BottomLongButton);

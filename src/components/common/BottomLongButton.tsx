type BottomLongButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};
const BottomLongButton: React.FC<BottomLongButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <div className="w-[720px] fixed bottom-0 bg-white">
      <button
        type="button"
        className="w-full h-[80px] mt-130 bg-blue font-extrabold text-2xl text-white py-3"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default BottomLongButton;

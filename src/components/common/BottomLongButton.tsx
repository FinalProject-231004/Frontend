type BottomLongButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};
const BottomLongButton: React.FC<BottomLongButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <div className="w-[1080px] fixed bottom-0 mx-auto bg-white">
      <button
        type="button"
        className="w-full h-[80px] bg-blue font-extrabold text-[26px] text-white py-3"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default BottomLongButton;

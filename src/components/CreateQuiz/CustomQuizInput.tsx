type CustomQuizInputProps = {
  title: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomQuizInput: React.FC<CustomQuizInputProps> = ({
  title,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="w-[1080px] text-blue text-2xl mb-[30px]">
      <label className="mb-[20px]">{title}</label>
      <input
        type="text"
        className="w-full h-[72px] text-2xl customborder"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomQuizInput;

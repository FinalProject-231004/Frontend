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
    <div className="w-full text-blue mb-[20px]">
      <h3 className="mb-[15px] font-extrabold">{title}</h3>
      <input
        type="text"
        className="w-full h-[48px] customborder"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomQuizInput;

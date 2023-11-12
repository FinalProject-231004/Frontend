import { useState, useEffect, ChangeEvent } from 'react';

type CustomQuizInputProps = {
  title: string;
  placeholder: string;
  value: string;
  inputType: 'input' | 'textarea';
  onChange: (value: string) => void;
  maxLength: number;
};
const CustomQuizInput: React.FC<CustomQuizInputProps> = ({
  title,
  placeholder,
  value,
  inputType,
  onChange,
  maxLength,
}) => {
  const [inputCount, setInputCount] = useState(0);

  useEffect(() => {
    setInputCount(new Blob([value]).size);
  }, [value]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
    const newSize = new Blob([newValue]).size;
    if (newSize <= maxLength) {
      onChange(newValue);
      setInputCount(newSize);
    }
  };
  const inputField =
    inputType === 'textarea' ? (
      <textarea
        className={`w-full h-[130px] customborder sm:h-[125px]`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    ) : (
      <input
        type="text"
        className="w-full h-[48px] mb-1 customborder sm:h-[36px]"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    );

  return (
    <div className="w-full text-blue mb-[15px] sm:w-[92vw]">
      <h3 className="max-[255px] mb-[15px] font-extrabold sm:h-">{title}</h3>
      {inputField}
      <p className="flex justify-end text-sm">
        <span className="sm:pr-1 md:pr-1">
          {inputCount}/{maxLength} bytes
        </span>
      </p>
    </div>
  );
};

export default CustomQuizInput;

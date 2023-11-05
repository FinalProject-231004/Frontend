import { useState, useEffect, ChangeEvent } from 'react';

type CustomQuizInputProps = {
  title: string;
  placeholder: string;
  value: string;
  inputType: 'input' | 'textarea';
  onChange: (value: string) => void;
  maxLength: number; // Add a new prop for maximum length
};
const CustomQuizInput: React.FC<CustomQuizInputProps> = ({
  title,
  placeholder,
  value,
  inputType,
  onChange,
  maxLength, // Use the maxLength prop
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
        className="w-full h-[80px] customborder"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    ) : (
      <input
        type="text"
        className="w-full h-[48px] customborder"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    );

  return (
    <div className="w-full text-blue mb-[20px]">
      <h3 className="mb-[15px] font-extrabold">{title}</h3>
      {inputField}
      <p className="flex justify-end text-sm">
        <span>{inputCount}</span>/<span>{maxLength} bytes</span>
      </p>
    </div>
  );
};

export default CustomQuizInput;

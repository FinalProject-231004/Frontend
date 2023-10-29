import React from 'react';

type UserInfoInputProps = {
  inputVal: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  size: string;
  borderColor: string;
  focusBorderColor: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const UserInfoInput = React.forwardRef<HTMLInputElement, UserInfoInputProps>(
  ({ inputVal, onChange, type, placeholder, size, focusBorderColor, borderColor, onKeyDown }, ref) => {

     let widthClass: string = '';

  if (size === 'small') {
    widthClass = 'w-[255px]'; 
  } else if (size === 'medium') {
    widthClass = 'w-[530px]'; 
  } else if (size === 'large') {
    widthClass = 'w-[765px]'; 
  } 

const borderClass = borderColor === 'none' ? 'border-none' : `border-${borderColor}`;
const dynamicClasses = `${widthClass} ${borderClass} focus:border-${focusBorderColor}`;


  return (
    <form className="w-full">
      <div className="md:flex md:items-center">
        <div className="md:w-2/3">
          <input
            className={`h-[72px] bg-white appearance-none border-2  rounded-[6px] cursor-pointer py-2 px-7 text-gray-700 text-[24px] leading-tight focus:outline-none focus:bg-white ${dynamicClasses}`}
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={inputVal}
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
        </div>
      </div>
    </form>
  );
  }
);

export default UserInfoInput;

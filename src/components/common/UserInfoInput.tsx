import { useMobile } from '@/hooks';
import React from 'react';

type UserInfoInputProps = {
  inputVal: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  size: string;
  borderColor: string;
  focusBorderColor: string;
  id?: string;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const UserInfoInput = React.forwardRef<HTMLInputElement, UserInfoInputProps>(
  ({ inputVal, onChange, type, placeholder, size, focusBorderColor, borderColor, id, disabled, onKeyDown }, ref) => {

     let widthClass: string = '';

     const isMobile = useMobile(); 

    if (size === 'small') {
      widthClass = isMobile ? 'w-[123px]' : 'w-[255px]'; 
    } else if (size === 'medium') {
      widthClass = isMobile ? 'w-[255px]' : 'w-[530px]'; 
    } else if (size === 'large') {
      widthClass = isMobile ? 'w-full' : 'w-[765px]'; 
    } else if (size === 'xl') {
      widthClass = isMobile ? 'w-[343px]' : 'w-[895px]'; 
    }  

const borderClass = borderColor === 'none' ? 'border-none' : `border-${borderColor}`;
const dynamicClasses = `${widthClass} ${borderClass} focus:border-${focusBorderColor}`;


  return (
    <div className="w-full">
      <div className="md:flex md:items-center">
        <div className="md:w-2/3">
          <input
            id = {id}
            className={`h-[72px] bg-white appearance-none border-2 rounded-[6px] cursor-pointer py-2 px-7 text-gray-700 text-2xl leading-tight focus:outline-none focus:bg-white ${dynamicClasses}
            sm:h-[35px] sm:px-4 sm:text-xs sm:border
            `}
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={inputVal}
            disabled={disabled}
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
  }
);

export default UserInfoInput;

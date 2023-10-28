type UserInfoInputProps = {
  inputVal: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  size: string;
  borderColor: string;
  focusBorderColor: string;
};

function UserInfoInput({ inputVal, onChange, type, placeholder, size, focusBorderColor, borderColor }: UserInfoInputProps) {

  let widthClass: string = '';

  if (size === 'small') {
    widthClass = 'w-[255px]'; 
  } else if (size === 'medium') {
    widthClass = 'w-[530px]'; 
  } else if (size === 'large') {
    widthClass = 'w-[765px]'; 
  } 

  const dynamicClasses = `${widthClass} border-${borderColor} focus:border-${focusBorderColor}`; // 동적 클래스 생성

  return (
    <form className="w-full">
      <div className="md:flex md:items-center">
        <div className="md:w-2/3">
          <input
            className={`h-[72px] bg-white appearance-none border-2  rounded-[6px] cursor-pointer py-2 px-7 text-gray-700 text-[24px] leading-tight focus:outline-none focus:bg-white ${dynamicClasses}`}
            type={type}
            placeholder={placeholder}
            value={inputVal}
            onChange={onChange}
          />
        </div>
      </div>
    </form>
  );
}

export default UserInfoInput;

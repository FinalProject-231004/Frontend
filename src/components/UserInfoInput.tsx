type UserInfoInputProps = {
  inputVal: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  size: string;
  focusBorderColor: string;
};

function UserInfoInput({ inputVal, onChange, type, placeholder, size, focusBorderColor }: UserInfoInputProps) {
  // UserInfoInput을 사용하는 파일에서 state 관리하기 -> recoil에서 닉네임만 전역으로 관리하는 게 좋을 듯
  // const [inputVal, setInputVal] = useState<string>('')

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputVal(e.target.value)
  // }

  let width: string = '';

  // 아직 디자인이 확정되지 않아 필요에 따라 수정하기
  if (size === 'medium') {
    width = '100px';
  } else if (size === 'large') {
    width = '200px';
  }  

  const dynamicClasses = `w-[${width}] focus:border-[${focusBorderColor}]`; // 동적 클래스 생성

  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-2/3">
          <input
            className={`bg-white appearance-none border-2 border-gray-200 rounded-[12px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${dynamicClasses}`}
            id="inline-full-name"
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

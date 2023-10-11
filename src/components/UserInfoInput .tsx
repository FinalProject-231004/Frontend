import { Input } from '@chakra-ui/react'
// import { ChangeEvent, useState } from 'react'

type ButtonProps = {
  inputVal: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 이벤트 객체를 매개 변수로 받고 아무런 값을 반환하지 않는다
  placeholder: string
  inputColor: string
  width: string
}

function UserInfoInput ({inputVal, onChange, placeholder, inputColor, width}:ButtonProps) {
  // UserInfoInput을 사용하는 파일에서 state 관리하기
  // const [inputVal, setInputVal] = useState<string>('')

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputVal(e.target.value)
  // }

  return (
    <div>
      <Input
        type='text'
        value={inputVal}
        onChange={onChange}
        placeholder={placeholder}
        focusBorderColor={inputColor} // chakra에서 지정한 색깔 or CSS value 밖에 사용할 수 없다.
        size='md' width={width}
      />
    </div>
  )
}

export default UserInfoInput 
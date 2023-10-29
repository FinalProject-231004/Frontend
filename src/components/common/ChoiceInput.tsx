import Checkbox from '@mui/material/Checkbox';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';

type ChoiceInputProps = {
  choiceId: number;
  checked: boolean;
  onCheck: () => void;
  children: React.ReactNode;
};
const ChoiceInput: React.FC<ChoiceInputProps> = ({
  choiceId,
  checked,
  children,
  onCheck,
}) => {
  return (
    <div className="w-full h-[72px] flex mb-[10px] customborder cursor-pointer">
      <div className="w-full flex justify-between items-center">
        <Checkbox
          className="scale-[1.8]"
          icon={<BsCheckCircle />}
          checkedIcon={<BsCheckCircleFill />}
          checked={checked}
          onChange={event => {
            console.log(event.target.checked);
            onCheck();
            console.log(choiceId);
          }}
          sx={{
            color: '#d4d4d4',
            '&.Mui-checked': {
              color: '#0078ff',
            },
          }}
        />
        <div className="w-full text-2xl pl-[20px] bordernoneinput">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChoiceInput;

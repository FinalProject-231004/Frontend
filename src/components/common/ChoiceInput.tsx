import Checkbox from '@mui/material/Checkbox';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';

type ChoiceInputProps = {
  checked: boolean;
  onCheck: () => void;
  children: React.ReactNode;
};

const ChoiceInput: React.FC<ChoiceInputProps> = ({
  children,
  checked,
  onCheck,
}) => {
  return (
    <div className="w-full h-[72px] flex items-center mb-[10px] customborder bg-white">
      <div className="w-full flex justify-between items-center">
        <Checkbox
          className="scale-[1.8]"
          icon={<BsCheckCircle />}
          checkedIcon={<BsCheckCircleFill />}
          checked={checked}
          onChange={() => onCheck()}
          sx={{
            color: '#d4d4d4',
            '&.Mui-checked': {
              color: '#0078ff',
            },
          }}
        />
        <div
          className="w-full text-2xl pl-[20px] bordernoneinput"
          onClick={() => {}}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChoiceInput;

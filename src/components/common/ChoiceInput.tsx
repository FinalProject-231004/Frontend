import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';

type ChoiceInputProps = {
  choiceId: string;
  checked: boolean;
  onCheck: (checked: boolean) => void;
  children: React.ReactNode;
};

const ChoiceInput: React.FC<ChoiceInputProps> = React.memo(
  ({ checked, children, onCheck }) => {
    const handleChange = () => {
      onCheck(!checked);
    };

    return (
      <div
        className="w-full h-auto flex mb-[10px] customborder cursor-pointer"
        onClick={handleChange}
      >
        <div className="w-full flex justify-between items-center">
          <Checkbox
            className="scale-[1.4]"
            icon={<BsCheckCircle />}
            checkedIcon={<BsCheckCircleFill />}
            checked={checked}
            onChange={handleChange}
            sx={{
              color: '#d4d4d4',
              '&.Mui-checked': {
                color: '#0078ff',
              },
            }}
          />

          <div
            className="max-w-[636px] text-lg pl-[20px] bordernoneinput"
            style={{ maxWidth: '636px', wordWrap: 'break-word' }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

export default ChoiceInput;

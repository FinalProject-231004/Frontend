import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { ChoiceItemProps } from '@/types/questionTypes';

const ChoiceItem: React.FC<ChoiceItemProps> = ({
  choice,
  questionId,
  handleChoiceCheck,
  handleChoiceChange,
  addChoice,
  removeChoice,
}) => {
  return (
    <div className="w-full h-[48px] flex mb-[10px] customborder">
      <div className="w-full flex justify-between items-center">
        <Checkbox
          className="scale-[1.4]"
          icon={<BsCheckCircle />}
          checkedIcon={<BsCheckCircleFill />}
          checked={choice.isAnswer}
          onChange={() => handleChoiceCheck(questionId, choice.id)}
          sx={{
            color: '#d4d4d4',
            '&.Mui-checked': {
              color: '#0078ff',
            },
          }}
        />
        <input
          className="w-[1080px] bordernoneinput text-lg"
          placeholder="선택지를 입력해 주세요"
          value={choice.text}
          onChange={e =>
            handleChoiceChange(questionId, choice.id, e.target.value)
          }
        />
        <button
          className="text-blue border-r px-[10px] focus:outline-none"
          onClick={() => {
            addChoice(questionId);
          }}
        >
          <AiOutlinePlus size={20} />
        </button>
        <button
          onClick={() => removeChoice(questionId, choice.id)}
          className="text-blue pl-[10px] focus:outline-none"
        >
          <AiOutlineClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChoiceItem;

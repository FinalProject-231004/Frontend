import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { Choice } from '@/types/questionTypes';

interface ChoiceItemProps {
  choice: Choice;
  questionId: string;
  handleChoiceCheck: (questionId: string, choiceId: string) => void;
  handleChoiceChange: (
    questionId: string,
    choiceId: string,
    text: string,
  ) => void;
  addChoice: (questionId: string) => void;
  removeChoice: (questionId: string, choiceId: string) => void;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({
  choice,
  questionId,
  handleChoiceCheck,
  handleChoiceChange,
  addChoice,
  removeChoice,
}) => {
  return (
    <div className="w-full h-[72px] flex items-center mb-[10px] customborder bg-white">
      <div className="w-full flex justify-between items-center">
        <Checkbox
          className="scale-[1.8]"
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
          className="w-full text-2xl pl-[20px] bordernoneinput"
          placeholder="선택지를 입력해 주세요"
          value={choice.text}
          onChange={e =>
            handleChoiceChange(questionId, choice.id, e.target.value)
          }
        />
        <button
          className="text-blue border-r px-[15px]"
          onClick={() => {
            addChoice(questionId);
          }}
        >
          <AiOutlinePlus size={28} />
        </button>
        <button
          onClick={() => removeChoice(questionId, choice.id)}
          className="text-blue pl-[20px]"
        >
          <AiOutlineClose size={28} />
        </button>
      </div>
    </div>
  );
};

export default ChoiceItem;

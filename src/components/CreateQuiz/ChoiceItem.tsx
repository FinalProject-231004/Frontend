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
    <div className="choice-section w-full h-[72px] px-[18px] flex items-center mb-[10px] border-blue text-blue border-2 rounded-md bg-white">
      <div className="w-full flex justify-between items-center">
        <Checkbox
          className="scale-[1.8]"
          icon={<BsCheckCircle />}
          checkedIcon={<BsCheckCircleFill />}
          checked={choice.isAnswer}
          onChange={() => handleChoiceCheck(questionId, choice.id)}
        />
        <input
          className="choice-input bg-transparent w-full text-2xl pl-[20px] ml-[20px] focus:outline-none border-r  border-l"
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
          className="pl-[20px]"
        >
          <AiOutlineClose size={28} />
        </button>
      </div>
    </div>
  );
};

export default ChoiceItem;

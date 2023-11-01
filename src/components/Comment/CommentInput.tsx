import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

type CommentInputProps = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddComment: () => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  placeholder,
  value,
  onChange,
  onAddComment,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onAddComment(); // 엔터 키를 눌렀을 때 onAddComment 함수를 호출
    }
  };

  return (
    <div className="flex w-full h-[60px] customborder">
      <input
        className="w-full bg-transparent bordernoneinput -ml-2 mr-1"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={onAddComment}
        className="min-w-[40px] h-10 rounded-full flex items-center justify-center bg-blue text-white shadow-slate-200 shadow-inner"
      >
        <AiOutlineArrowUp size={24} />
      </button>
    </div>
  );
};

export default CommentInput;

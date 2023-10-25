import React from 'react';
import { Comments } from '@/types/homeQuiz';

type CommentProps = {
  commentData: Comments;
};

const Comment: React.FC<CommentProps> = ({ commentData }) => {
  return (
    <div className="flex mb-8 justify-center items-center">
      <img src="/profile.png" className="w-[72px]" />
      <div className="ml-5">
        <div className="w-[106px] h-[25px] mb-1 text-sm p-2 flex justify-start items-center rounded-md bg-blue text-white">
          {commentData.nickname}
        </div>
        <div className="w-[438px] h-[50px] p-2 text-2xl flex justify-start items-center  rounded-md bg-white text-blue border-2  border-blue">
          {commentData.comment}
        </div>
      </div>
    </div>
  );
};

export default Comment;

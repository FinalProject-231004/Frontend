import { Comments } from '@/types/result';
import React from 'react';

type CommentProps = {
  commentData: Comments;
};

const CommentList: React.FC<CommentProps> = ({ commentData }) => {
  console.log(commentData);
  return (
    <div className="flex mb-8 justify-center items-center">
      <img src="/profile.png" className="w-[72px]" alt={`profile`} />
      <div className="ml-5">
        <div className="inline-block mb-1 text-sm px-2 justify-start items-center rounded-md bg-blue text-white">
          {commentData.nickname}
        </div>
        <div className="w-[438px] h-[50px] flex customborder">
          {commentData.comment}
        </div>
      </div>
    </div>
  );
};

export default CommentList;

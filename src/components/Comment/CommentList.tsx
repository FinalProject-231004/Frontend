import { Comments } from '@/types/result';
import React from 'react';

type CommentProps = {
  commentData: Comments;
  isLastComment: boolean;
};

const CommentList: React.FC<CommentProps> = ({
  commentData,
  isLastComment,
}) => {
  console.log(commentData);
  return (
    <div className="w-full flex mb-7 justify-center items-center">
      <img src="/profile.png" className="w-[60px]" alt={`profile`} />
      <div className="w-full ml-4">
        <div className="flex justify-between items-center">
          <div className="flex mb-1 text-sm px-2 justify-start items-center rounded-md bg-blue text-white">
            {commentData.nickname}
          </div>
          <div className="flex text-slate-200 text-xs">
            {commentData.createdAt.split('T')[0]}
          </div>
        </div>
        <div className="h-[50px] flex customborder">{commentData.comment}</div>
        {isLastComment && (
          <div className="text-xs text-center text-slate-300">
            마지막 댓글입니다!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;

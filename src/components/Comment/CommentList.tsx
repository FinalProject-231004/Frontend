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
  return (
    <div className="flex mb-8 justify-center items-center">
      <img src="/profile.png" className="w-[65px]" alt={`profile`} />
      <div className="ml-6">
        <div className="flex justify-between items-center">
          <div className="flex mb-1 text-sm px-2 justify-start items-center rounded-md bg-blue text-white">
            {commentData.nickname}
          </div>
          <div className="flex text-slate-200 text-xs">
            {commentData.createdAt.split('T')[0]}
          </div>
        </div>
        <div className="w-[438px] h-[50px] flex customborder">
          {commentData.comment}
        </div>
        {isLastComment && (
          <div className="text-xs text-center text-slate-400">
            마지막 댓글입니다!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;

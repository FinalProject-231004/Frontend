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
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/profile.png';
  };

  return (
    <div className="w-full flex mb-5 justify-center items-center">
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="w-[85px] flex mb-1 ml-[68px] text-sm px-2 justify-start items-center rounded-md bg-blue text-white">
            {commentData.nickname}
          </div>

          <div className="flex text-slate-200 text-xs">
            {commentData.createdAt.split('T')[0]}
          </div>
        </div>
        <div className="flex">
          <img
            src={commentData.profileImage || '/profile.png'}
            onError={handleImageError}
            className="w-[60px] h-[60px] rounded-full object-cover"
            alt={commentData.nickname}
          />

          <div className="w-full h-auto flex ml-2 customborder">
            {commentData.comment}
          </div>
        </div>
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

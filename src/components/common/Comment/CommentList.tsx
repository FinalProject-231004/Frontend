import { Comments } from '@/types/result';
import React from 'react';

type CommentProps = {
  commentData: Comments;
  isLastComment: boolean;
};

const CommentList: React.FC<CommentProps> = ({ commentData }) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/profile.png';
  };

  const getTimeAgo = (isoDate: string) => {
    const now = new Date();
    const commentDate = new Date(isoDate);
    const diffInSeconds = Math.floor(
      (now.getTime() - commentDate.getTime()) / 1000,
    );

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 3) {
      return commentDate.toISOString().split('T')[0];
    } else if (days >= 1) {
      return `${days} 일 전`;
    } else if (hours >= 1) {
      return `${hours} 시간 전`;
    } else if (minutes >= 1) {
      return `${minutes} 분 전`;
    } else {
      return '방금 전';
    }
  };

  return (
    <div className="w-full flex mb-5 justify-center items-center">
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="w-[85px] flex mb-1 ml-[68px] text-sm px-2 justify-start items-center rounded-md bg-blue text-white">
            {commentData.nickname}
          </div>

          <div className="flex text-slate-300 text-xs">
            {getTimeAgo(commentData.createdAt)}
          </div>
        </div>
        <div className="flex">
          <img
            loading="lazy"
            src={commentData.profileImage || '/profile.png'}
            onError={handleImageError}
            className="w-[60px] h-[60px] rounded-full object-cover"
            alt={commentData.nickname}
          />

          <div className="customborder w-full h-auto mx-2 px-3">
            <div className="break-words md:w-[67.1vw] md:overflow-y-auto">
              {commentData.comment}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;

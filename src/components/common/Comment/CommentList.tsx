import { Comments } from '@/types/result';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

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

    if (days > 1) {
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

  const handleReport = async (nickName: string) => {
    try {
      const token = localStorage.getItem('Authorization');
      if (!token) {
        toast.error('로그인이 필요합니다.');
        return;
      }

      await axios.post(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/report/liveChat/${nickName}`,
        {},
        { headers: { Authorization: token } },
      );

      toast.success(`'${nickName}' 사용자가 신고되었습니다.`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.msg ||
          '신고 처리 중 오류가 발생했습니다.';
        toast.error(errorMessage);
      } else {
        toast.error('신고 처리 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="w-full flex mb-5 justify-center items-center md:mb-4  md:w-[79.7vw]">
      <div className="w-full">
        <div className="flex gap-2 justify-between">
          {' '}
          <div className="w-[85px] flex mb-1 ml-[76px] text-sm px-2 justify-start items-center rounded-md bg-blue text-white">
            {commentData.nickname}
          </div>
          <button
            type="button"
            className="flex items-center mr-1"
            onClick={() => handleReport(commentData.nickname)}
          >
            🚨<span className="text-sm underline text-red"> 신고</span>
          </button>
        </div>

        <div className="flex">
          <img
            loading="lazy"
            src={commentData.profileImage || '/profile.png'}
            onError={handleImageError}
            className="min-w-[60px] max-w-[60px] h-[60px] rounded-full object-cover"
            alt={commentData.nickname}
          />

          <div className="customborder w-full h-auto mx-4 px-3 flex">
            <div className="break-words w-[340px] md:overflow-y-auto md:break-words md:w-[66.5vw]">
              {commentData.comment}
              <div className="flex justify-end text-slate-300 text-xs">
                {getTimeAgo(commentData.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;

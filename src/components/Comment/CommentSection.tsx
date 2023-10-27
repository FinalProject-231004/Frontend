import React, { useState } from 'react';
import { CommentSectionProps } from '@/types/result';
import { CommentInput, CommentList } from '@/components';
import { postAPI } from '@/apis/axios';
import { toast } from 'react-toastify';

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState('');
  const [commentId] = useState<number>(1); // 이 부분은 당신이 어디에서 ID를 가져오느냐에 따라 달라질 수 있습니다.

  const handleNewCommentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      toast.warn('댓글을 입력해주세요 ! 🤡');
      return;
    }

    try {
      const response = await postAPI(`/comment/${commentId}`, {
        content: newComment,
      });

      if (response.data && response.data.msg) {
        alert(response.data.msg);
      }

      // 여기서 댓글 목록을 다시 불러오거나, 댓글을 직접 추가하세요.
      // 예: setComments([...comments, newCommentData]);

      setNewComment('');
    } catch (error) {
      console.error('댓글 추가 실패', error);
      toast.error('댓글 추가에 실패했습니다. 다시 시도해주세요. 😥');
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;

    if (target.scrollTop === 0) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col">
        <div
          className="overflow-x-hidden overflow-y-auto h-[450px] scroll-smooth"
          onScroll={handleScroll}
        >
          {comments && comments.length > 0 ? (
            comments.map(comment => (
              <CommentList key={comment.id} commentData={comment} />
            ))
          ) : (
            <div className="flex items-center justify-center h-[450px] text-slate-300">
              아직 등록된 댓글이 없어요! 🧐
            </div>
          )}
        </div>
        <div className="flex mt-10">
          <CommentInput
            placeholder="댓글을 입력해주세요"
            value={newComment}
            onChange={handleNewCommentChange}
            onAddComment={handleAddComment}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentSection;

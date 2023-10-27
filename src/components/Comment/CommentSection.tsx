import { useState } from 'react';
import { CommentSectionProps } from '@/types/result';
import { CommentInput, CommentList } from '@/components';
import { toast } from 'react-toastify';
import axios from 'axios';
// import { useRecoilState } from 'recoil';
import { commentsState } from '@/recoil/atoms/commentAtom';

const CommentSection: React.FC<CommentSectionProps> = ({
  quizId,
  comments,
}) => {
  const [newComment, setNewComment] = useState('');
  // const [commentState, setCommentState] = useRecoilState(commentsState);
  const [commentState, setCommentState] = useState(comments);
  console.log(commentState);
  console.log(commentsState);

  // useEffect(() => {
  //   if (comments) {
  //     setCommentState(comments);
  //   }
  // }, [comments]);

  const handleNewCommentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    console.log('handleAddComment');
    if (newComment.trim() === '') {
      toast.warn('댓글을 입력해주세요 ! 🤡');
      return;
    }

    console.log('호출 전 :', newComment);
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/comment/${quizId}`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZTMiLCJhdXRoIjoiQURNSU4iLCJleHAiOjE2OTkxNjYwNzEsImlhdCI6MTY5Nzk1NjQ3MX0.cJ2DD8-STMhzrkBhP7ll27Fjyy5t4vcNcE2E5ifnzmw`,
          },
        },
      );
      console.log('호출 후 :', newComment);
      console.log(response);
      const newCommentData = response.data; // 서버로부터 받은 새 댓글 데이터
      console.log(newCommentData);
      if (newCommentData) {
        setCommentState(prevComments => [...prevComments, newCommentData]);
        setNewComment('');
      }
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
          {commentState && commentState.length > 0 ? (
            commentState.map(comment => (
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

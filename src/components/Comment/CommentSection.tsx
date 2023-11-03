import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CommentSectionProps } from '@/types/result';
import { CommentInput, CommentList } from '@/components';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import throttle from 'lodash/throttle';
import axiosRetry from 'axios-retry';
import { tokenState } from '@/recoil/atoms/tokenAtom';
import { useRecoilState } from 'recoil';
import { commentsState } from '@/recoil/atoms/commentAtom';

const CommentSection: React.FC<CommentSectionProps> = ({ quizId }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useRecoilState(commentsState);
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    const rawToken = localStorage.getItem('Authorization');
    const storedToken = rawToken?.startsWith('Bearer')
      ? rawToken.slice('Bearer '.length)
      : rawToken;
    if (storedToken) setToken(storedToken);
  }, [setToken]);

  const client = useMemo(() => axios.create(), []);

  const fetchComments = useCallback(async () => {
    if (!quizId) {
      toast.warn(
        '😥 댓글 목록을 불러올 수 없습니다. 잠시 후 다시 시도해주세요',
      );
      return;
    }
    try {
      axiosRetry(client, {
        retries: 5,
        retryDelay: retryCount => retryCount * 1000,
        retryCondition: error =>
          error.response?.status === 429 ||
          axiosRetry.isNetworkOrIdempotentRequestError(error),
      });

      const response = await client.get(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/quiz/${quizId}/comments`,
      );
      setComments(response.data.data);
    } catch (error) {
      toast.error(
        '😥 댓글 목록을 불러올 수 없습니다. 잠시 후 다시 시도해주세요',
      );
    }
  }, [client, quizId, setComments]);

  useEffect(() => {
    fetchComments();
    return () => setComments([]);
  }, [quizId, fetchComments, setComments]);

  const handleNewCommentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = throttle(async () => {
    if (newComment.trim() === '') {
      toast.warn('댓글을 입력해주세요 ! 🤡');
      return;
    }

    if (!token) {
      toast.warn('로그인이 필요한 서비스입니다.');
      return;
    }

    try {
      await client.post(
        `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/comments`,
        { quizId, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      fetchComments();
      setNewComment('');
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        toast.warn('요청이 너무 많습니다. 잠시 후 다시 시도해 주세요. ⏳');
      } else {
        toast.error('댓글 추가에 실패했습니다. 다시 시도해주세요. 😥');
      }
    }
  }, 3000);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    document.body.style.overflow = target.scrollTop === 0 ? 'auto' : 'hidden';
  };

  return (
    <div className="w-full h-[472px] flex flex-col">
      <div
        className="w-full h-[472px] overflow-x-hidden overflow-y-auto scroll-smooth"
        onScroll={handleScroll}
      >
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentList
              key={comment.createdAt}
              commentData={comment}
              isLastComment={index === comments.length - 1}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-slate-300">
            아직 등록된 댓글이 없어요! 🧐
          </div>
        )}
      </div>
      <div className="flex mt-2">
        <CommentInput
          placeholder="댓글을 입력해주세요"
          value={newComment}
          onChange={handleNewCommentChange}
          onAddComment={handleAddComment}
        />
      </div>
    </div>
  );
};

export default CommentSection;

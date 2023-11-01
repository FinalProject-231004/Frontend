import { Comments } from './result';

export type Banner = {
  image: string;
  category: string;
};

export type Quiz = {
  id: number;
  viewCount: number;
  likes: number;
  category: string;
  title: string;
  image: string;
  nickname: string;
};

export type Category = {
  category: string;
};

export type QuizThumbnailProps = {
  quiz: Quiz;
};

export interface QuizCategorySectionProps {
  title: string;
  quiz: Quiz[];
  skipSlice?: boolean;
}

export interface LikesState {
  id: number;
  likes: number;
}

export type DetailPageCompProps = {
  id: number;
};

export type QuizDetail = {
  id: number;
  title: string;
  username: string;
  image: string;
  viewCount: number;
  likes: number;
  createdTime: string;
  category: string;
  content: string;
  comments: Comments[];
};

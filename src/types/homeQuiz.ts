import { Comments, QuizInfoProps } from './result';

export type Banner = {
  image: string;
  buttonImage?: string;
  category?: string;
  smImage: string;
};

export type BannerProps = {
  onCategoryChange: (category: string) => void;
};

export type BannerButtonProps = {
  image: string;
  category?: string;
  // navigate: NavigateFunction;
  onCategorySelect: (category: string) => void;
};

export type CategoriesIconsProps = {
  icons: string;
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
  quizDetail: QuizInfoProps & QuizDetail;
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

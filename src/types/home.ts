export type Banner = {
  image: string;
  category: string;
};

export type Quiz = {
  id: number;
  viewNum: number;
  likes: number;
  category: string;
  title: string;
  image: string;
  username: string;
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
}

export interface LikesState {
  id: number;
  likes: number;
}

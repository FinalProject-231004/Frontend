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

export type QuizThumbnailProps = {
  quiz: Quiz;
};

export type QuizCategorySectionProps = {
  title: string;
  quiz: Quiz[] | null;
};

export type Category = {
  category: string;
};

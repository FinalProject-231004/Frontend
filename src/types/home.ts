export type Banner = {
  image: string;
  category: string;
};

export type QuizData = {
  id: number;
  viewNum: number;
  likes: number;
  category: string;
  title: string;
  image: string;
  username: string;
};

export type QuizThumbnailProps = {
  quiz: QuizData;
};

export type QuizCategorySectionProps = {
  title: string;
  quiz: QuizData[];
};

export type Category = {
  id: number;
  name: string;
};

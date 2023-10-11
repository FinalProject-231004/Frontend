export type Banner = {
  image: string;
  category: string;
};

export type QuizData = {
  id: number;
  image: string;
  title: string;
  username: string;
  likes: number;
  viewNum: number;
};

export type QuizThumbnailProps = {
  quiz: QuizData;
};

export type QuizCategorySectionProps = {
  title: string;
  quizzes: QuizData[];
};

export type QuizInfoProps = {
  image: string;
  title: string;
  content: string;
  likes: {
    isLiked: boolean;
    count: number;
  };
  viewCount: number;
  onLike: () => void;
};

export type Comments = {
  id: number;
  comment: string;
  complainInt: number;
  memberId: number;
  nickname: string;
  profileImage: string;
  createdAt: string;
};

export type CommentSectionProps = {
  comments: Comments[];
  quizId: number;
};

export type QuizResultProps = {
  msg: string;
  data: {
    id: number;
    title: string;
    content: string;
    image: string;
    likes: number;
    viewCount: number;
    comments: [];
  };
};

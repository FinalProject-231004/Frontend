export type Choice = {
  id: string;
  text: string;
  isAnswer: boolean;
};

export type ImageInfo = {
  file: File | null;
  preview: string | null;
};

export type Question = {
  id: string;
  text: string;
  choices: Choice[];
  image?: ImageInfo;
};

export type AdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    answer: string;
    numberOfPeople: number;
    mileage: number;
  }) => void;
};

export type ChatMessage = {
  type: string;
  username: string;
  timestamp: string;
  message: string;
  nickName: string;
};

export type UserStatus = {
  isMuted: boolean;
  isBanned: boolean;
};

// 사용자 별 상태를 관리하는 객체의 타입
export type UserStatusMap = {
  [nickName: string]: UserStatus;
};

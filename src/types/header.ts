export type SearchResult = { 
  title: string;
  id: number;
};

export type Notifications = {
  id: number;
  notificationId: string;
  content: string;
  url: string;
  created_at: string;
}

declare module 'event-source-polyfill' {
  export interface EventSourcePolyfillInit {
    reconnectInterval?: number;
    heartbeatTimeout?: number;
  }
}

export type signUpData = {
  username: string;
  password: string;
  nickname: string;
  checkPassword: string;
};

export type postSignIn = {
  username: string;
  password: string;
};

export type profileAPIResponse = {
  msg: string;
  data: userInfo; 
};
type userInfo = {
  nickname: string;
  image: null|string;
  mileagePoint: number;
}
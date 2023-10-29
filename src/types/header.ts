export type SearchResult = { 
  title: string;
  id: number;
};

export type Notification = {
  id: number;
  notificationId: string;
  content: string;
  created_at: string;
}

export type postData = {
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
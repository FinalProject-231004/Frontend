export type nickName = {
  // msg: string;
  data: string;
}

export type varifyPw = {
  enterPassword: string;
}

export type kakaoVarifyPw = {
  password: string;
  newPassword: string;
  newCheckPassword: string;
}

export type updateInfoResponse = {
  data: myInfo;
  msg: string;
}

type myInfo = {
  nickname: string;
  image: null|string;
  password: string;
}

export type putData = {
  newPassword: string;
};

export type newNickname = {
  newNickname: string;
}

export type deletePw = {
  enterPassword: string;
}

export type historyListProps = {
  price: string;
  cost: number;
  itemName: string;
  quantity: number|null;
  email: string;
  date: string;
}

export type mileageUsingHistoryRes = {
  data: mileageUsingHistory[];
  msg: string;
}
export type mileageUsingHistory = {
  totalPrice: number;
  itemName: string;
  quantity: number;
  email: string;
  orderedAt: string;
}

export type mileageGetHistoryRes = {
  data: mileageGetHistory[];
  msg: string;
}
export type mileageGetHistory = {
  date: string;
  description: string;
  type: string;
  points: number;
}
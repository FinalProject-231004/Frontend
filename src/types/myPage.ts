export type nickName = {
  // msg: string;
  data: string;
}

export type varifyPw = {
  enterPassword: string;
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
  cost: string;
  title: string;
  count: string;
  email: string;
  date: string;
}
export const validateId = (id: string): boolean => {
  const pattern = /^[a-z\d]{4,14}$/;
  return pattern.test(id);
};

export const validateNickName = (nickname: string): boolean => {
  const pattern = /^[a-z\dㄱ-ㅎ가-힣]{2,5}$/;
  return pattern.test(nickname);
};

export const validatePw = (pw: string): boolean => {
  const pattern = /^(?=.*[a-z])(?=.*\d)(?=.*\W).{8,20}$/;
  return pattern.test(pw);
};

export const validatePwCheck = (pw: string, pwCheck: string): boolean => {
  return pw === pwCheck;
};

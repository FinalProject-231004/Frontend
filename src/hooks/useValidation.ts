export const validateId = (id: string): boolean => {
  const pattern = /^[a-z][a-z\d]{3,14}$/;
  return pattern.test(id);
};

export const validateNickName = (nickname: string): boolean => {
  const pattern = /^(?=.*[a-z\uAC00-\uD7A3\d]).{2,5}$/;
  return pattern.test(nickname);
};

export const validatePw = (pw: string): boolean => {
  const pattern = /^(?=.*[a-z\d!@#$%^&*()_+\-=[\]{}|;:"<>,.?/~`])(?!.*\s).{8,20}$/;
  return pattern.test(pw);
};

export const validatePwCheck = (pw: string, pwCheck: string): boolean => {
  return pw === pwCheck;
};

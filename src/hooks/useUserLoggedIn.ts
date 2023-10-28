export const useUserLoggedIn = () => {
  return localStorage.getItem('Authorization') !== null;
};

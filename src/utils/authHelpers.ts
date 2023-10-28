export const logOut = () =>{
  localStorage.removeItem('Authorization');
  localStorage.removeItem('Refresh');
  localStorage.removeItem('authorization');
  localStorage.removeItem('refresh');
}
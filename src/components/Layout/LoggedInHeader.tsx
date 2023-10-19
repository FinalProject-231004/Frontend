import LoggedInNotification from './LoggedInNotification';
import LoggedInProfileMenu from './LoggedInProfileMenu'; 

function LoggedInHeader() {
  return (
    <div className="flex items-center"> 
      <div className='mr-[20px]'>
        <LoggedInNotification />
      </div>
      <LoggedInProfileMenu /> 
    </div>
  );
}

export default LoggedInHeader;


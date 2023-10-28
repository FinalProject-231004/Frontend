import {
  LoggedInNotification,
  LoggedInProfileMenu,
} from '@/components';

function LoggedInHeader() {
  return (
    <div className="flex items-center">
      <div className="mr-[25px]">
        <LoggedInNotification />
      </div>
      <LoggedInProfileMenu />
    </div>
  );
}

export default LoggedInHeader;

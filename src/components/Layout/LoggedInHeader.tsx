import {
  // LoggedInNotification,
  LoggedInProfileMenu,
} from '@/components';
import Sse from './Sse';

function LoggedInHeader() {
  return (
    <div className="flex items-center">
      <div className="mr-[25px]">
        {/* <LoggedInNotification /> */}
        <Sse />
      </div>
      <LoggedInProfileMenu />
    </div>
  );
}

export default LoggedInHeader;

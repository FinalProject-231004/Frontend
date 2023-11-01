import {
  LoggedInProfileMenu,
  Sse,
} from '@/components';

function LoggedInHeader() {
  return (
    <div className="flex items-center">
      <div className="mr-[25px]">
        <Sse />
      </div>
      <LoggedInProfileMenu />
    </div>
  );
}

export default LoggedInHeader;

import {
  LoggedInNotification,
  LoggedInProfileMenu,
  SearchBar,
} from '@/components';

function LoggedInHeader() {
  return (
    <div className="flex items-center">
      <div className="mr-[25px]">
        <SearchBar />
      </div>
      <div className="mr-[25px]">
        <LoggedInNotification />
      </div>
      <LoggedInProfileMenu />
    </div>
  );
}

export default LoggedInHeader;

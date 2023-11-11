import { LoggedInProfileMenu, Sse } from '@/components';

function LoggedInHeader() {
  return (
    <div className="flex items-center gap-8">
      <Sse />
      <LoggedInProfileMenu />
    </div>
  );
}

export default LoggedInHeader;

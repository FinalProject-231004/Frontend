import { Header } from '@/components'; // 공통 헤더 컴포넌트
// import Footer from './Footer'; // 공통 푸터 컴포넌트
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

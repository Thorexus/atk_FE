import React from 'react';
import { useLocation } from 'react-router-dom';
import { PUBLIC_ROUTE } from '../constants/route-path';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div
      className={
        location.pathname.includes(PUBLIC_ROUTE.LOGIN)
          ? 'bg-primary-100'
          : 'bg-primary-50'
      }>
      <div className="mx-auto flex h-screen w-full max-w-[640px] flex-col p-4 font-sukhumvit">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;

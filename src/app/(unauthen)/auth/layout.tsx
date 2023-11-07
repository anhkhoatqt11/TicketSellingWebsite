import React from 'react';
import AuthCarousel from './AuthCarousel';

async function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex-row flex overflow-hidden">
        <AuthCarousel />
      <div className="h-screen w-screen lg:w-1/2 overflow-auto">{children}</div>
    </div>
  );
}

export default layout;

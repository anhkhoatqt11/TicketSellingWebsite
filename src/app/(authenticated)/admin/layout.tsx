import React from "react";
import { getSession } from '@/lib/auth';
import Header from "./(components)/Header";


async function layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <div className="h-full w-full">
      <Header/>
      <div>{children}</div>
    </div>
  );
} 

export default layout;

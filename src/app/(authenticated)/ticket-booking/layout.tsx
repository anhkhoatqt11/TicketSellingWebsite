import React from "react";
import { Header } from "@/components/header";
import { getSession } from '@/lib/auth';
import { Footer } from "@/components/footer";


async function layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <div className="h-full w-full">
      <Header session={session}/>
      <div>{children}</div>
      <Footer/>
    </div>
  );
} 

export default layout;

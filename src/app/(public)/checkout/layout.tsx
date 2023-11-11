import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      <div>{children}</div>
    </div>
  );
} 

export default layout;

import { getSession } from "@/lib/auth";
import React, { useState } from "react";
import UserProfileLayout from "../components/UserProfileLayout";

const page = async () => {
  const session = await getSession();
  const userId = session?.user?.id;

  return (
    <div>
      <UserProfileLayout id={userId} />
    </div>
  );
};

export default page;

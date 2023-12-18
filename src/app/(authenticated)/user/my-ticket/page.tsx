import { getSession } from "@/lib/auth";
import React from "react";
import TicketLayout from "../components/TicketLayout";

const page = async () => {
  const session = await getSession();
  const userId = session?.user?.id;

  return (
    <div>
      <TicketLayout id={userId} />
    </div>
  );
};

export default page;

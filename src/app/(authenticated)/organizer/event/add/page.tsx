import { getSession } from "@/lib/auth";
import { AddNewEvent } from "./AddNewEvent";

export default async function page() {
  const session = await getSession();
  return (
    <div className="m-4">
      <AddNewEvent session={session} />
    </div>
  );
}
